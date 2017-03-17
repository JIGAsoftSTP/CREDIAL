<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 10/27/16
 * Time: 11:19 PM
 */
include "../modelo/Imagem.php";
if($_POST['intensao']!="login" && $_POST['intensao']!="getImageUser") {
    include "../modelo/User.php";
    include "../conexao/CallPgSQL.php";
    include "Session.php";
}

if($_POST["intensao"] ==  "loadImagem" ) {carregarImagem();}
if($_POST["intensao"] ==  "regUser" ) {regUser();}
if($_POST["intensao"] ==  "loadDataUser" ) {loadDataUser();}
if($_POST["intensao"] ==  "disibleUSER" ) {disableUser();}
if($_POST["intensao"] ==  "loadMENU-USER-log" ) { loadMenuUserlogado(); }
if($_POST["intensao"] ==  "loadMENU-Perfil" ) { loadMenuPerfil(); }
if($_POST["intensao"] ==  "alter-user" ) { alteruser(); }
if($_POST["intensao"] ==  "loadImage-Perfil" ) { getPhotoUser(); }

function carregarImagem()
{
    if (isset($_FILES['img'])) {
        $img = new Imagem($_FILES['img']);
        die(json_encode(array("img"=>$img->getCaminnoCompletoNewFileView())));
    } else {
        die(json_encode(array("img" => "./resources/img/user.png")));
    }
}

function regUser(){
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_reg_user","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST["nif"])
        ->addNumeric($_POST['typeperfil'])
        ->addString($_POST["username"])
        ->addString($_POST["usersurname"])
        ->addString(null)
        ->addDate(null)
        ->addFile($_POST["photofile"])
        ->addFileReside($_POST["photofile"], 250)
        ->addFileReside($_POST["photofile"], 125);
    $call->execute();
    $result = $call->getValors();
    if($result["RESULT"] != "true")
        die (json_encode(array("result" => false, "return" => $result)));

    regtLocalTabalha();
//    for ($i=0; $i < count($_POST["menu"]); $i++) {
//        echo $_POST["menu"][$i]."<br/>";
//    }

}

function regtLocalTabalha($at =  false)
{
    $call = new CallPgSQL();
    $call->functionTable("funct_reg_trabalhagencia","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST["nif"])
        ->addNumeric($_POST['idAgencia'])
        ->addOther(null);
    $call->execute();
    $result = $call->getValors();

    if($result["RESULT"] != "true")
        die (json_encode(array("result" => false, "return" => $result, "message" => "MESSAGE")));

    if(!$at) addMenuToUser();

}

function addMenuToUser()
{
    for ($i=0; $i < count($_POST["menu"]); $i++) {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_menuser_grant", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nif"])
            ->addNumeric($_POST["menu"][$i])
            ->addOther(null);
        $call->execute();
        $result = $call->getValors();
        if($result["RESULT"] != "true")
            die (json_encode(array("result" => false, "return" => $result)));
    }

    die (json_encode(array("result" => true)));
}

function loadDataUser(){
    $call = new CallPgSQL();
    $call->functionTable("funct_load_users","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia());
    $call->execute();
    $userActive = array();
    $otherUser = array();
    while ($values = $call->getValors()) {
        $values = addLocalPhotoSimple($values);
        if($values["STATE"] == "Ativo")
            $userActive[count($userActive)] = $values;
        else
            $otherUser[count($otherUser)] = $values;
    }  
    $agencias = $call->loadDados("ver_agencia", "\"ID\"", "\"NOME\"");
    $typesUser = $call->loadDados("ver_type_user", "\"ID\"","\"NAME\"");

    die(json_encode(
            array("userActive" => $userActive,
                "otherUser" => $otherUser,
                "listMenu" => getListMenu(),
                "agencias" => $agencias,
                "typesUser" => $typesUser
            )
        )
    );
}

/**
 * @param $values
 * @param $type string
 * @return string
 */
function addLocalPhoto($values, $type = null)
{

    if ($values["funct_load_user_image"] != null) {
        $img = md5($_POST['USER']["nif"]);
        file_put_contents("../resources/img/userImg/" . $img.(($type == null) ? "" : "-".$type), pg_unescape_bytea($values["funct_load_user_image"]));
        $values["funct_load_user_image"] = "./resources/img/userImg/" .$img.(($type == null) ? "" : "-".$type);
        addPermission("../resources/img/userImg/".$img.(($type == null) ? "" : "-".$type), 0777);
    } else {
        $values["funct_load_user_image"] = "./resources/img/user.png";
    }
    return $values["funct_load_user_image"];
}

/**
 * @param $values
 * @return mixed
 */
function addLocalPhotoSimple($values){
    $values["PHOTO"] = "./resources/img/user.png";
    $values["MENU"] = loadMenuUser($values["NIF"]);
    return $values;
}

function disableUser(){
    $call = new CallPgSQL();
    $call->functionTable("funct_disable_user", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST["USER"]["id"])
        ->addString($_POST["USER"]["disableMode"]);
    $call->execute();
    $result = $call->getValors();
    die (json_encode(array("result" => $result["RESULT"] == "true", "return" => $result)));
}

function getListMenu(){
    $call = new CallPgSQL();
    $call->selects("ver_menu_active","*")
        ->finilize("order by","asc","\"RAIZ\"");
    $call->execute();
    $list = array();
    while ($values = $call->getValors())
        $list[count($list)] = $values;
    return  $list;
}

  function loadMenuUser($user){
    $call = new CallPgSQL();
    $call->functionTable("funct_load_menuser","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($user)
        ->finilize("order by","ASC","\"RAIZ\"");
    $call->execute();
    $list = array();
    while ($values = $call->getValors())
        $list[count($list)] = $values;
    return  $list;
}

function loadMenuPerfil(){
    $call = new CallPgSQL();
    $call->functionTable("funct_load_menuperfil","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST['perfil']);
    $call->execute();
    $menuList = array();
    while ($menu =  $call->getValors()) {
        if($menu["IN PERFIL"] == "t")
            $menuList[count($menuList)] = $menu;
    }
    die (json_encode(array("MENU" => $menuList)));
}

function loadMenuUserlogado (){
    die (json_encode(array("MENU" => loadMenuUser(Session::getUserLogado()->getId()))));
}


function changeMenuUser(){
    $call = new CallPgSQL();
    $call->functionTable("funct_change_menuser","*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['USER']["nif"])
        ->addIntArray($_POST['USER']['menu']);
    $call->execute();

    $result = $call->getValors();
    if($result["result"] != true)
        die (json_encode(array("result" => false, "message" => $result["message"])));
}


function changeUserData(){
    $call = new CallPgSQL();
    $call->functionTable("funct_change_user","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['USER']["nif"])
        ->addString($_POST['USER']['nome'])
        ->addString($_POST['USER']['apelido'])
        ->addNumeric($_POST['USER']['idNivel'])
        ->addFile($_POST['USER']['img'])
        ->addFileReside($_POST['USER']['img'], 250)
        ->addFileReside($_POST['USER']['img'], 125);
    $call->execute();

    $result = $call->getValors();
    if($result["result"] != true)
        die (json_encode(array("result" => false, "message" => $result["message"])));
}

function alterUser(){
    if($_POST["change"]['names'] || $_POST["change"]['nivel'] || $_POST["change"]["avatar"] ) { changeUserData(); };
    if($_POST["change"]['agencia']) {
        $_POST["nif"] = $_POST['USER']["nif"];
        $_POST['idAgencia'] = $_POST['USER']["idAgencia"];
        regtLocalTabalha(true);
    }
    if($_POST["change"]['menu']) { changeMenuUser(); }
    die (json_encode(array("result" => true)));
}

/**
 * @param bool $onlyJSON bool
 * @return string {img,imgSmall,imgTiny}
 */
function getPhotoUser($onlyJSON = false){
//    {IMAGE, IMAGE-TINY, IMAGE-SMALL}

    $call = new CallPgSQL();
    $call->functionTable("funct_load_user_image","*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['USER']["nif"])
        ->addString("IMAGE");
    $call->execute();
    $img = $call->getValors();

    $call = new CallPgSQL();
    $call->functionTable("funct_load_user_image","*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['USER']["nif"])
        ->addString("IMAGE-SMALL");
    $call->execute();
    $imgSmall = $call->getValors();

    $call = new CallPgSQL();
    $call->functionTable("funct_load_user_image","*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['USER']["nif"])
        ->addString("IMAGE-TINY");
    $call->execute();
    $imgTiny = $call->getValors();

    $json = json_encode(array( "img" => addLocalPhoto($img),
        "imgSmall" => addLocalPhoto($imgSmall,"Smaill"),
        "imgTiny" => addLocalPhoto($imgTiny, "Tiny")
    ));

    if($onlyJSON)  {return json_decode($json); }
    else { die($json); }
}

function addPermission($file, $permission){
    $per = (int) fileperms($file);
    if ($per != $permission){
        chmod($file, $permission);
    }
}
