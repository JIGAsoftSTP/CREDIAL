<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/30/16
 * Time: 10:58 AM
 */

include "Session.php";
include "../conexao/CallPgSQL.php";
include "../modelo/User.php";

if($_POST['intensao']=="load-data"){  loadDadosForDoSimulation(); }
if($_POST['intensao']=="start-simulation"){ loadStartSimulation(); }
if($_POST['intensao']=="load-cheque"){ loadChequeBanco(); }
if($_POST['intensao']=="import-simulation"){ importSimulation(); }

function loadDadosForDoSimulation(){
    $call = new CallPgSQL();
    $banks = $call->loadDados("ver_conta","\"ID\"","\"DESCRICAO\"");
    $fontepagamentos = $call->loadDados("ver_fontepagamento","\"ID\"","\"DESC\"");
    $garantias = $call->loadDados("ver_garantia","\"ID\"","\"DESC\"");
    $tipodocumentos = $call->loadDados("ver_tipodocumento","\"ID\"","\"DESC\"");
    $tipopagamentos = $call->loadDados("ver_tipopagamento","\"ID\"","\"DESC\"");
    $tipocredito = $call->loadDados("ver_tipocredito","\"ID\"","\"DESC\"");

    $j = json_encode(array( "banks" => $banks,
                            "tipocreditos" => $tipocredito,
                            "garantias" => $garantias,
                            "fontepagamentos" => $fontepagamentos,
                            "tipodocumentos" => $tipodocumentos,
                            "tipopagamentos" => $tipopagamentos)
                          ); die($j);
}

function loadStartSimulation(){
    $call = new CallPgSQL();
    $call->functionTable("funct_load_simulacao","*")
        ->addNumeric($_POST['dia'])
        ->addDouble($_POST["value"])
        ->addNumeric($_POST["tipoCredtio"])
        ->addDouble($_POST['desconto'])
        ->addDouble($_POST['correcao'])
        ->addChar($_POST['opcao']);
    $call->execute();

    $valores = $call->getValors();
//
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_load_banco_simulacao","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addDouble($_POST["value"]);
    $call->execute();
    $banks = array();
    while ($valor = $call->getValors()) {
        $banks[count($banks)] = $valor;
    }
    $j = json_encode(array("result" => (($valores["RESULT"] == "true") ? true : false), "return" => $valores, "banks" => $banks)); die($j);
}

function loadChequeBanco(){
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_retirar_cheque", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addNumeric($_POST['idbank'])
        ->addDouble($_POST['value']);
    $call->execute();
    $result = $call->getValors();
    $j = json_encode(array("result" => $result["RESULT"] == true, "return" => $result)); die($j);
}

function importSimulation(){
//    session_start();
    $call = new CallPgSQL();
    $call->functionTable("funct_reg_credito_import_simulacao","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString( $_POST["simulation"]['nifClient'])
        ->addDouble($_POST["simulation"]["valorCredito"])
        ->addDouble($_POST["simulation"]["totalPagar"])
        ->addNumeric($_POST["simulation"]["numeroPrestacao"])
        ->addDate($_POST["simulation"]["dataInicio"])
        ->addDate($_POST["simulation"]["dataFinalizar"])
        ->addNumeric($_POST["simulation"]["idTaxa"])
        ->addString($_POST["simulation"]["numeroCheque"])
        ->addNumeric($_POST["simulation"]["objectoFontePagamento"])
        ->addNumeric($_POST["simulation"]["idCheque"])
        ->addDouble($_POST["simulation"]["valorDesconto"])
        ->addNumeric($_POST["simulation"]["objectoTipoCredito"])
        ->addDouble($_POST["simulation"]["taeg"]);
    $call->execute();
    $result = $call->getValors();

    if($result["RESULT"] != "true"){
        die(json_encode(array("result" => false, "return" => $result, "func"=>"funct_reg_credito_import_simulacao") ));
    }

    regPagamento($result['ID CREDITO']);
}

function regPagamento($idCredito){
    $i = 0;
    $call = new CallPgSQL();
    foreach ($_POST["simulation"]["dataTableAmortizacao"] as $datas) {
        $call->functionTable("funct_reg_pagamento","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($datas["nunDoc"])
            ->addDate($datas["data"])
            ->addNumeric($datas["idTipoPagam"])
            ->addNumeric($idCredito)
            ->addNumeric(++$i)
            ->addDate($datas["data"])/*dara Saque*/
            ->addDouble(0)/*Taxa double precision*/
            ->addDouble($datas["reebolso"])/*reembolso double precision*/
            ->addDouble(0)/*desconto double precision*/
            ->addDouble($datas["reebolso"])/*"valorReal" double precision*/
            ->addString(null)/*conta*/
            ->addNumeric($datas["idBanco"])/*idBanco*/;
        $call->execute();
        $result = $call->getValors();

        if ($result["result"] != true ) {
            die(json_encode(array("result" => false, "return" => $result, "func"=>"funct_reg_pagamento")));
        }
    }
    regGarantia($idCredito);
}

function regGarantia($idCredito){
    $call = new CallPgSQL();
    foreach ($_POST["simulation"]["listGara"] as $ga) {
        $call->functionTable("funct_reg_garrantiacredito","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($idCredito)
            ->addNumeric($ga["id"])
            ->addString($ga["value"])
            ->addBool(false);
        $call->execute();
        $result = $call->getValors();
        if($result["RESULT"] != "true"){
            die(json_encode(array("result" => false, "return" => $result, "func"=>"funct_reg_garantia")));
        }
    }
    regDocumento($idCredito);
}

function regDocumento($idCredito){
    $call = new CallPgSQL();
    foreach ($_POST["simulation"]["listDocu"] as $do) {
        $call->functionTable("funct_reg_documentoentregue","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($idCredito)
            ->addNumeric($do["id"])
            ->addString($do["value"])
            ->addBool(false);
        $call->execute();
        $result = $call->getValors();
        if($result["RESULT"] != "true"){
            die(json_encode(array("result" => false, "return" => $result,  "func"=>"funct_reg_documento_erntregue")));
        }
    }
    finalizeRegCredito($idCredito);
}

function finalizeRegCredito($idCredito){
    $call = new CallPgSQL();
    $call->functionTable("funct_confirm_regcredito","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addNumeric($idCredito)
        ->addNumeric($_POST["simulation"]["idForRegBank"])
        ->addNumeric(count($_POST["simulation"]["listDocu"]))
        ->addNumeric(count($_POST["simulation"]["listGara"]));
    $call->execute();

    $result = $call->getValors();
    if($result["RESULT"] == true)
        die(json_encode(array("result" => true, "return" => $result,$idCredito, "func"=>"funct_finalizar_credito_true")));
    else
        die(json_encode(array("result" => false, "return" => $result,$idCredito , "func"=>"funct_finalizar_credito_false")));
}