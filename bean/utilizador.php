<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 10/27/16
 * Time: 11:19 PM
 */
include "../modelo/Imagem.php";
include "../modelo/User.php";
include "../conexao/CallPgSQL.php";
include "Session.php";
if($_POST["intensao"] ==  "loadImagem" ) {carregarImagem();}
if($_POST["intensao"] ==  "regUser" ) {regUser();}
if($_POST["intensao"] ==  "loadDataUser" ) {loadDataUser();}
if($_POST["intensao"] ==  "disibleUSER" ) {disableUser();}
if($_POST["intensao"] ==  "loadMENU-USER-log" ) { loadMenuUserlogado(); }
if($_POST["intensao"] ==  "loadMENU-Perfil" ) { loadMenuPerfil(); }
if($_POST["intensao"] ==  "alter-user" ) { alteruser(); }

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
        ->addFile($_POST["photofile"]);
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
    $result = array();
    while ($values = $call->getValors()) {
        if ($values["PHOTO"] != null) {
            $img = md5($values["NIF"]) /*. ".png"*/;
            file_put_contents("../resources/img/userImg/" . $img, pg_unescape_bytea($values["PHOTO"]));
            $values["PHOTO"] = "./resources/img/userImg/" . $img;
        }
        else{
            $values["PHOTO"] = "./resources/img/user.png";
        }
        $values["MENU"] = loadMenuUser($values["NIF"]);
        $result[count($result)] = $values;
    }
    $agencias = $call->loadDados("ver_agencia", "\"ID\"", "\"NOME\"");

    $typesUser = $call->loadDados("ver_type_user", "\"ID\"","\"NAME\"");

    die (json_encode(array("return" => $result, "listMenu" => getListMenu(), "agencias" => $agencias, "typesUser" => $typesUser)));
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
        ->finilize("order by","asc","\"LEVEL\"");
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
        ->finilize("order by","ASC","\"LEVEL\"");
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
        ->addNumeric($_POST['USER']['idNivel']);
    $call->execute();

    $result = $call->getValors();
    if($result["RESULT"] != "true")
        die (json_encode(array("result" => false, "message" => $result["MESSAGE"])));
}

function alterUser(){
    if($_POST["change"]['names'] || $_POST["change"]['nivel'] ) { changeUserData(); };
    if($_POST["change"]['agencia']) {
        $_POST["nif"] = $_POST['USER']["nif"];
        $_POST['idAgencia'] = $_POST['USER']["idAgencia"];
        regtLocalTabalha(true);
    }
    if($_POST["change"]['menu']) { changeMenuUser(); }
    die (json_encode(array("result" => true)));
}
