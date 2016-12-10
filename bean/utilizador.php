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
    session_start();
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

function regtLocalTabalha()
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
        die (json_encode(array("result" => false, "return" => $result)));

    addMenuToUser();

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
            $result[count($result)] = $values;
        }
        else{
            $values["PHOTO"] = "./resources/img/user.png";
            $result[count($result)] = $values;
        }
    }
    die (json_encode(array("return" => $result)));
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