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