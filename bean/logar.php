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
if($_POST['intensao']=="has_session"){ has_session(); }

function logar(){
    $call = new CallPgSQL();
    $call->functionTable("funct_login","*")
        ->addString($_POST["user"])
        ->addString($_POST["pwd"]);
    $call->execute();

    $values = $call->getValors();
    if ($values["RESULT"] == "true") {

        include "utilizador.php";
        $_POST['USER']["nif"] = $_POST["user"];

        /**
         * @var $img object
         */
        $img = getPhotoUser(true);

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
            ->setFotoLogo($img->img)
            ->setFotoLogoSmall($img->imgSmall)
            ->setFotoLogoTiny($img->imgTiny);

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
    include "utilizador.php";
    $_POST['USER']["nif"] = $_POST["user_id"];
    getPhotoUser();
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
                    "user_logoSmall" => Session::getUserLogado()->getFotoLogoSmall(),
                    "user_logoTiny" => Session::getUserLogado()->getFotoLogoTiny(),
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

function has_session(){
    $user = Session::getUserLogado()->getId();
    die (json_encode(array("hassession" => isset($user))));
}