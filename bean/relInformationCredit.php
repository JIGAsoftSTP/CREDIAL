<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 25-02-2017
 * Time: 16:27
 */
include "../conexao/CallPgSQL.php";
include "../modelo/User.php";
include "Session.php";

if($_POST["intensao"] == "loadListCredits"){ loadCredit(); }
if($_POST["intensao"] == "loadListInformationCredit"){ loadInformationByCredit(); }
if($_POST["intensao"] == "loadListCreditsAlunado"){ loadListCreditsAlunado(); }
if($_POST["intensao"] == "relatorioNotificacaoPagamentoCredito"){ relatorioNotificacaoPagamentoCredito(); }

function loadCredit(){

    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_credits_filter","*")
        ->addString(Session::getUserLogado()->getId())
        ->addJsonb(($_POST["filter"] == "" ? null : json_encode($_POST["filter"])));
    $call->execute();
    $credits = array();
    while ($value = $call->getValors()){
        $credits[count($credits)] = $value;
    }
    die(json_encode(array("credits" => $credits)));
}

function loadInformationByCredit(){
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_credits_garrantia","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric($_POST["id"])
        ->addJsonb(null);
    $call->execute();
    $information = array();
    while ($value = $call->getValors()){
        $value["type"] = "Garrantia";
        $information[count($information)] = $value;
    }

    $call->functionTable("report.funct_rep_credits_documents","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric($_POST["id"])
        ->addJsonb(null);
    $call->execute();
    while ($value = $call->getValors()){
        $value["type"] = "Documento";
        $information[count($information)] = $value;
    }
    die(json_encode(array("information" => $information)));
}

function loadListCreditsAlunado(){
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_credito_anulado","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addJson(($_POST["filter"] == "" ? null : json_encode($_POST["filter"])));
    $call->execute();
    $credits = array();
    while ($value = $call->getValors()){
        $credits[count($credits)] = $value;
    }
    die(json_encode(array("credits" => $credits)));
}

function relatorioNotificacaoPagamentoCredito(){
    $json = file_get_contents("../resources/json/save-log-mail-send.json");
    $datas = json_decode($json, JSON_OBJECT_AS_ARRAY);
    $credits = [];
    for ($i = count($datas) - 1; $i > 0; $i--) {
        $data = $datas[$i];
        $nova_data=date('Y-m-d', strtotime($data["data"]));

        $de = date('Y-m-d', strtotime($_POST['filter']['date-inicio']));
        $ate = date('Y-m-d', strtotime($_POST['filter']['date-fim']));

        if(($nova_data >= $de) && ($nova_data <= $ate)) {
            foreach ($data["clients"] as $client) {
                $client["data-send"] = $data["data"];
                $credits[] = $client;
            }
        }
    }
    die(json_encode(array("credits" => $credits, $datas)));
}