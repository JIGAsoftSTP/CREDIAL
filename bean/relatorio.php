<?php
include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
include "Session.php";
include_once "../modelo/User.php";


switch ($_POST["intention"]) {

    case "load report object":
        loadObjectValues();
        break;
    case "load report filters":
        reportSearchFilter();
        break;
    case "report":
        report();
        break;
}

function report()
{
    if ($_POST["reportName"] == "rep.cliente") relatorioCreditoSomatorio();
    else if ($_POST["reportName"] == "rep.cresHomo") relatorioCrescimentoHomologo();
    else if ($_POST["reportName"] == "rep.credConc") relatorioCreditoContagem();
    else if ($_POST["reportName"] == "rep.capiTAEG") relatorioDivida_taeg();
    else if ($_POST["reportName"] == "rep.diviProd") relatorioDividaProduto();
    else if ($_POST["reportName"] == "rep.cobranca") relatorioCobrancas();
    else if ($_POST["reportName"] == "rep.cheques") {
        if ($_POST["chequeFiltro"] == 1) relatorioChequeEntrados();
        else relatorioCheque_PorCobrar_Cobrados_Todos();
    } else if ($_POST["reportName"] == "rep.cabaz") relatorioCabaz();
    else if ($_POST["reportName"] == "rep.antecipado") relatorioCobrancas();

}

function reportSearchFilter()
{
    $reportName = $_POST["reportName"];

    if ($reportName == "rep.cliente") $reportName = "funct_rep_client_credito_somatorio";
    else if ($reportName == "rep.cresHomo") $reportName = "funct_rep_client_crescimento_homologo";
    else if ($reportName == "rep.credConc") $reportName = "funct_rep_client_credito_contagem";
    else if ($reportName == "rep.cobranca") $reportName = "funct_rep_cobranca";
    else if ($reportName == "rep.capiTAEG") $reportName = "funct_rep_divida_capital_taeg";
    else if ($reportName == "rep.diviProd") $reportName = "funct_rep_dividas_produtos";
    else if ($reportName == "rep.gara") $reportName = "funct_rep_credits_filter";
    else $reportName = "funct_rep_cheques_distribuidos";

    $call = new CallPgSQL();
    $call->functionTable("report.funct_load_filter", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addString($reportName);
    $call->execute();
    $entityValues = array();

    while ($row = $call->getValors()) {
        $row["contents"] = json_decode($row["contents"]);
        $entityValues[count($entityValues)] = $row;
    }
    die(json_encode(array("reportFilter" => $entityValues)));
}

function loadObjectValues()
{
    $call = new CallPgSQL();
    $call->selects($_POST["object"], "*");
    $call->execute();
    $values = array();
    while ($row = $call->getValors()) {
        $values[count($values)] = $row;
    }
    die(json_encode(array("objeto" => $values)));
}

function relatorioDividaProduto()
{
    $json = json_encode($_POST["jsonValue"]);
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_dividas_produtos", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson($json);
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioDivida_taeg()
{
    $json = json_encode($_POST["jsonValue"]);
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_divida_capital_taeg", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson($json);
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCreditoSomatorio()
{
    $json = json_encode($_POST["jsonValue"]);
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_client_credito", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson($json);
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCrescimentoHomologo()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_client_crescimento_homologo", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCreditoContagem()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_credito_concedido", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCobrancas()
{

    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_cobranca", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCabaz()
{

    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_client_cabaz", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioPagamentoAntecipado()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_cobranca", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioChequeEntrados()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_cheques_distribuidos", "*")
        ->addInt(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}

function relatorioCheque_PorCobrar_Cobrados_Todos()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_cheques_cobranca_state", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addDate($_POST["ReportFiler"]["dataInicio"])
        ->addDate($_POST["ReportFiler"]["dataFim"])
        ->addJson(json_encode($_POST["jsonValue"]));
    $call->execute();
    $arrayValues = array();
    while ($result = $call->getValors()) {
        $arrayValues[count($arrayValues)] = $result;
    }
    die(json_encode(array("result" => $arrayValues)));
}



