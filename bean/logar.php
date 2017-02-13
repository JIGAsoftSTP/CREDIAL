<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/25/16
 * Time: 6:08 PM
 */
include_once "../conexao/CallPgSQL.php";
include "../modelo/User.php";
include_once "Session.php";

if($_POST['intensao']=="login"){ logar();}
if($_POST['intensao']=="redinirSenha"){ redinirSenha();}
if($_POST['intensao']=="logOut"){ logOut(); }
if($_POST['intensao']=="changePwd"){ changePwd(); }
if($_POST['intensao']=="getImageUser"){ loadImgUser(); }
if($_POST['intensao']=="getDataUser"){ getDataUser(); }
if($_POST['intensao']=="sendfeeback"){ sendfeeback(); }

function logar(){
    $call = new CallPgSQL();
    $call->functionTable("funct_login","*")
        ->addString($_POST["user"])
        ->addString($_POST["pwd"]);
    $call->execute();

    $values = $call->getValors();
    if ($values["RESULT"] == "true") {
        $img = "";
        if($values["PHOTO"] != null) {
            $img = md5($values["ID"]) /*. ".png"*/;
            file_put_contents("../resources/img/userImg/" . $img, pg_unescape_bytea($values["PHOTO"]));
        }

        include "utilizador.php";

        $user = new User();
        $user->setNome($values["NAME"])
            ->setApelido($values["SURNAME"])
            ->setId($values["ID"])
            ->setIdLogin($values["ID LOGIN"])
            ->setIdPerfil($values["ID PERFIL"])
            ->setIdAgencia($values["ID AGENCIA"])
            ->setAgencia($values["AGENCIA"])
            ->setEstado($values["STATE"])
            ->setEstadoNome($values["STATE NAME"])
            ->setPerfil($values["PERFIL"])
            ->setMenu(loadMenuUser($values["ID"]))
            ->setSenha($_POST['pwd'])
            ->setFoto($values["PHOTO"])
            ->setFotoLogo((($values["PHOTO"] == null) ? "./resources/img/user.png" :"./resources/img/userImg/".$img));

        Session::newSession(Session::USER,$user);

        $pNome = explode(" ",$user->getNome());
        $j = json_encode(array("result"=>true,
                                "state"=>(int)Session::getUserLogado()->getEstado(),
                                "nome"=>$pNome[0],
                                "pageUser" => (count(Session::getUserLogado()->getMenu()) > 0
                                    ? Session::getUserLogado()->getMenu()[0]
                                    : null
                                )
                              )); die($j);
    }
    else{ $j = json_encode(array("result"=>(boolean)$values, $values)); die($j); }

}

function redinirSenha(){
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_activate_user","*")
        ->addString(Session::getUserLogado()->getId())
        ->addString($_POST['pwd']);
    $call->execute();

    $values = $call->getValors();
    if($values["RESULT"] == "true") {
        Session::getUserLogado()->setEstado(1);
        $j = json_encode(array("result" => true,
                                "msg"=>md5(Session::getUserLogado()->getId()),
                                "state" => (int)Session::getUserLogado()->getEstado(),
                                "pageUser" => (count(Session::getUserLogado()->getMenu()) > 0
                                    ? Session::getUserLogado()->getMenu()[0]
                                    : null
                                )
        ));
        die($j);
    }else{
        $j = json_encode(array("result" => false,
                                "msg"=>$values["MESSAGE"],
                                "state" => (int)Session::getUserLogado()->getEstado()
                              )); die($j);
    }
}

function logOut(){
    Session::terminarSessao();
    $j = json_encode(array("result"=>true));
    die($j);
}

function changePwd(){
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_change_pwd","*")
        ->addString(Session::getUserLogado()->getId())
        ->addString($_POST['pwdOld'])
        ->addString($_POST['pwdNew']);
    $call->execute();

    $values = $call->getValors();
    if($values["RESULT"] == "true") {
        $j = json_encode(array("result" => true)); die($j);
    }else{
        $j = json_encode(array("result" => false,
                                "msg"=>$values["MESSAGE"])
                              ); die($j);
    }
}

function loadImgUser(){
    $call = new CallPgSQL();
    $call->selects("\"user\"","user_photo")
        ->addCodition("user_id",$_POST["user_id"],"=");
    $call->execute();
    if($call->getNumRow() == 1) {
        $rs = $call->getValors();
        if($rs["user_photo"] != null ){
            $img = md5($_POST["user_id"]) /*. ".png"*/;
            file_put_contents("../resources/img/userImg/" . $img, pg_unescape_bytea($rs["user_photo"]));
            die(json_encode(array("img" => "./resources/img/userImg/" . $img)));
        }
        die(json_encode(array("img" => "./resources/img/user.png")));
    }
    else{ echo json_encode(array("img"=>"./resources/img/user.png")); }
}

function getDataUser(){
//    session_start();
    if (Session::getUserLogado()->getId())
    {
        $nome =  Session::getUserLogado()->getNome();
        $apelido = Session::getUserLogado()->getApelido();
        die(
            json_encode(
                array(
                    "result" => true,
                    "user_name_complete" =>  $nome." ". (($nome == $apelido) ? "" : $apelido),
                    "user_logo" => Session::getUserLogado()->getFotoLogo(),
                    "user_agency" => Session::getUserLogado()->getAgencia(),
                    "user_perfil" => Session::getUserLogado()->getPerfil(),
                    "user_nif" => Session::getUserLogado()->getId()
                )
            )
        );
    }
    else
        die(json_encode(array("result" => false)));

}

function sendfeeback(){
    include "../modelo/SendEmail.php";
    $var = "Mensagem enviada de Credial SA por".Session::getUserLogado()->getNome()." ".Session::getUserLogado()->getAgencia()
        ."<br><br>".$_POST["feed"]["text"]
        ."<br><br>".$_POST["feed"]["mail"]
        ."<br>Credial SA";
    $se = new SendEmail();
    $enviado = $se->Assunto("Credial ".($_POST["feed"]["type"] == "another") ? $_POST["feed"]["other"] : $_POST["feed"]["type"])
        ->Texto($var)
        ->Destino("jigasoft_stp@hotmail.com")
        ->sendEmail();
    die (json_encode(array("result" => ($enviado == true))));
}