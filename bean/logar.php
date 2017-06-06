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
if($_POST['intensao']=="has_session"){ has_session(); }
if($_POST['intensao']=="send_notification_to_client"){ send_notification_to_client(); }

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
                                ),
                                "send-mail" => (count(Session::getUserLogado()->getMenu()) > 0
                                    ? send_message_to_clients()
                                    : false
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
    require '../resources/fw/PHPMailer/class.phpmailer.php';
    require '../resources/fw/PHPMailer/PHPMailerAutoload.php';
    include "../modelo/SendEmail.php";
    $var = "Mensagem enviada de Credial SA por " . Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getAgencia()
        . "<br><br>" . $_POST["feed"]["text"]
        . "<br><br>" . $_POST["feed"]["mail"]
        . "<br>Credial SA";

    $se = new SendEmail();
    $se->getMail()->setFrom($_POST["feed"]["mail"], "Credial →".Session::getUserLogado()->getNome()." ".Session::getUserLogado()->getApelido());
    $se->getMail()->addAddress("jigasoft_stp@hotmail.com", "JIGAsoft HD");     // Add a recipient

    //$se->getMail()->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$se->getMail()->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
    $se->getMail()->isHTML(true);                             // Set email format to HTML

    $se->getMail()->Subject = ("Credial " . (($_POST["feed"]["type"] == "another") ? $_POST["feed"]["other"] : $_POST["feed"]["type"]));
    $se->getMail()->Body    = $var;

    $enviado = $se->getMail()->send();

    die (json_encode(array("result" => ($enviado == true))));
}

function has_session(){
    $user = Session::getUserLogado()->getId();
    die (json_encode(array("hassession" => isset($user))));
}

function send_notification_to_client(){

    function send_mail_to_client($client){
        /**
         * para add codigo to send mail to client with
         */
        $client->has_bean_send = true;
    }

    $log = file_get_contents("../resources/json/log-mail-send.json");
    $log_save = file_get_contents("../resources/json/save-log-mail-send.json");
    $j_log = json_decode($log);
    $j_log_save = json_decode($log_save);
    $has_send_all = true;

    foreach ($j_log->clients as $client ) {
        if (!$client->has_bean_send) {
            send_mail_to_client($client);
        }
    }

    if($has_send_all) {
        $i = count($j_log_save);
        $j_log->send = true;
        $j_log_save[$i] = $j_log;
        file_put_contents("../resources/json/save-log-mail-send.json", json_encode($j_log_save, JSON_UNESCAPED_UNICODE));
    }

    file_put_contents("../resources/json/log-mail-send.json", json_encode($j_log, JSON_UNESCAPED_UNICODE));
    die (json_encode(array("result" => $has_send_all)));
}
function send_message_to_clients(){
    /**
     * @return array
     */
    function get_client_to_send_mail(){
        $call = new CallPgSQL();
        $call->functionTable("report.funct_load_client_divida_now","*")
            ->addJsonb(null);
        $call->execute();
        $client = array();
        while ($row = $call->getValors()){
            $row["has_bean_send"] = false;
            $client[] = $row;
        }

        return $client;
    }

    function getHora($inicial){
        $datatime1 = new DateTime($inicial);
        $datatime2 = new DateTime(date("Y-m-d H:i:s"));

//        $data1  = $datatime1->format('d-m-Y H:i:s');
//        $data2  = $datatime2->format('d-m-Y H:i:s');

        $diff = $datatime1->diff($datatime2);
        $horas = $diff->h + ($diff->days * 24);

        return $horas;
    }

    $log = file_get_contents("../resources/json/log-mail-send.json");
    $j_log = json_decode($log);

    $has_equal = false;

    if (substr($j_log->data."", 0, 10) == date("Y-m-d")){ $has_equal = true; }

    if(!$has_equal){
        $j_log = array("data" => date("Y-m-d H:i:s"), "send" => false, "clients" => get_client_to_send_mail(), "user" => Session::getUserLogado()->getId());
        $j_log = json_encode($j_log, JSON_UNESCAPED_UNICODE);
        $j_log = json_decode($j_log);
    }

    file_put_contents("../resources/json/log-mail-send.json", json_encode($j_log, JSON_UNESCAPED_UNICODE));

    if (($j_log->user."" == Session::getUserLogado()->getId() && !$j_log->send ) || (getHora($j_log->data) >= 3 && !$j_log->send)){
        return true;
    }
    return false;
}