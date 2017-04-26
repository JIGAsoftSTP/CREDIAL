<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/26/16
 * Time: 9:27 PM
 */
include "../conexao/CallPgSQL.php";
include "../modelo/User.php";
include "Session.php";
//session_start();

    if($_POST["intensao"] == "loadOuther"){ loadDadosForRegCliente(); }
    if($_POST["intensao"] == "listarCliente"){ listCliente(); }
    if($_POST["intensao"] == "regCliente"){ regCliente(); }
    if($_POST["intensao"] == "loadStatusClient"){ loadStatusClient(); }
    if($_POST["intensao"] == "loadCreditoClient"){ loadCreditoClient(); }
    if($_POST["intensao"] == "efectuarPagamento"){ efectuarPagamento(); }
    if($_POST["intensao"] == "editeSelectedClient"){ changeClienteDataNasc(); }
    if($_POST["intensao"] == "regPavementFull"){ regPavementFull(); }
    if($_POST["intensao"] == "regPayFullNow"){ regPayFullNow(); }
    if($_POST["intensao"] == "loadPrestacaoCreditoClient"){ loadPrestacao(); }

    function listCliente(){
        $call = new CallPgSQL();
        $call->functionTable("filter.client", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia());
//            ->finilize("order by","desc","\"QUANTIDADE DE CREDITO\"");
        $call->execute();
        $resut = array();
        $arrayList = str_split("*ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        while ( $valor = $call->getValors()){
            $letra = $valor["NAME"];
            $letra = str_split(strtoupper(str_replace(" ", "", $letra)));
            $letra = $letra[0];
            $cont = is_numeric(array_search($letra, $arrayList))
                ?
                array_key_exists(array_search($letra, $arrayList), $resut)
                    ? count($resut[array_search($letra, $arrayList)])
                    : 0
                : 0;
//            echo $cont." ".$letra."\n";
            $resut[array_search($letra,$arrayList)][$cont] = $valor;
        }
        $j = json_encode(array("data" => $resut));
        die($j);
    }

    function loadDadosForRegCliente(){
        $call = new CallPgSQL();
        $sexo = $call->loadDados("ver_gender", "\"DESC\"", "\"ID\"");
        $stateCivil = $call->loadDados("ver_estadocivil", "\"DESC\"", "\"ID\"");
        $prof = $call->loadDados("ver_profissao", "\"DESC\"", "\"ID\"");
        $locali = $call->loadDados("ver_localidade", "\"DESC\"", "\"ID\"");
        $localTabr = $call->loadDados("ver_localtrabalho", "\"DESC\"", "\"ID\"");
        $j = json_encode(array("sexos"=>$sexo,"prof"=>$prof,"stateCivil"=>$stateCivil,"lacali"=>$locali,"localTrabr"=>$localTabr));
        die($j);
    }

    function regCliente(){
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_client", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nif"])
            ->addString($_POST["nome"])
            ->addString($_POST["sobNome"])
            ->addNumeric($_POST["sexo"])
            ->addDate( $_POST["dataNasc"]);
        $call->execute();
        $return = $call->getValors();
        if($return["RESULT"]=="true"){
            regDossier();
        }
        else{ $j = json_encode(array("result"=>false,"msg"=>$return["MESSAGE"])); die($j); }
    }

    function regDossier(){
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_tracedossier","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nif"])
            ->addString($_POST["capa"])
            ->addString($_POST["mes"])
            ->addString($_POST["ano"])
            ->addString($_POST["letra"])
            ->addString("S");//não sei porque do 'S' ou 'O'
        $call->execute();
        $return = $call->getValors();
        if($return["RESULT"]=="true"){
            regHistoricoClient();
        }
        else{ $j = json_encode(array("result"=>false,"msg"=>$return["MESSAGE"])); die($j); }
    }

    function regHistoricoClient(){
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_historicoclient","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST['nif'])
            ->addNumeric($_POST['stateCivil'])
            ->addNumeric($_POST["localidade"])
            ->addNumeric($_POST["profissao"])
            ->addNumeric($_POST['localTraba'])
            ->addString($_POST["morada"])
            ->addString($_POST["telefone"])
            ->addString($_POST["telemovel"])
            ->addString($_POST["servico"])
            ->addString($_POST["mail"]);
        $call->execute();
        $return = $call->getValors();
        if($return["RESULT"]=="true"){
            regSalarioCliente();
        }
        else{ $j = json_encode(array("result"=>false,"msg"=>$return["MESSAGE"])); die($j); }
    }

    function regSalarioCliente(){
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_salario","*")
            ->addString( Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nif"])
            ->addDouble($_POST["salario"]);
        $call->execute();
        $return = $call->getValors();
        if($return["RESULT"]!="true"){ $j = json_encode(array("result"=>false,"msg"=>$return["MESSAGE"])); die($j); }
        else { $j = json_encode(array("result"=>true)); die($j); }

    }

    function loadStatusClient() {
        if(isset($_POST["fill"]))
            die(json_encode(array("resultRealDataCliente" => loadDataCliente())));

        $call = new CallPgSQL();
        $call->functionTable("funct_load_status_cliente","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nifCliente"]);
        $call->execute();

        die(json_encode(array("resultClient" => $call->getValors(), "resultRealDataCliente" => loadDataCliente())));
    }

    function loadCreditoClient(){

        $pesquisa = ($_POST["pesquisa"] === "" ) ? null : json_encode(array("search" => $_POST["pesquisa"]));
        $callC = new CallPgSQL();
        $callC->functionTable("funct_load_credito_client","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nifCliente"])
            ->addJson($pesquisa);
        $callC->execute();
        
        $listCredito = array();
        while ($values = $callC->getValors() ) { $listCredito[] = $values; }
        die(json_encode(array("lista_credito" => $listCredito)));
    }

    function loadPrestacao(){
        $callP = new CallPgSQL();
        $callP->functionTable("funct_load_prestacao_credito","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["credito_id"]);
        $callP->execute();
        $listPestacao = array();
        while ($valuesP = $callP->getValors()) $listPestacao[] = $valuesP;
        die(json_encode(array("lista_prestacao" => $listPestacao)));
    }

    function loadDataCliente(){
        $call = new CallPgSQL();
        $call->functionTable("funct_load_client_data", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nifCliente"]);
        $call->execute();
        $result = $call->getValors();
        return $result;
    }

    function efectuarPagamento(){
        $call = new CallPgSQL();
        $call->functionTable("funct_efetuar_pagamento","*")
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric($_POST["pagamento"]['id'])
            ->addString($_POST["pagamento"]["doc"])
            ->addNumeric($_POST["pagamento"]["idBank"])
            ->addString($_POST["pagamento"]["type"])
            ->addDouble($_POST["pagamento"]["value"])
            ->addDate($_POST["pagamento"]["data"]);
        $call->execute();
        $return = $call->getValors();
        if($return["result"] == "f"){
            $j = json_encode(array("result"=>false,"msg"=>$return["message"])); die($j);
        }
        else {
            $j = json_encode(array("result"=>true, $return)); die($j);
        }
    }

function changeClienteDataNasc(){
    $call = new CallPgSQL();
    $call->functionTable("funct_change_client_data","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addString($_POST['nif'])
        ->addDate($_POST['dataNasc']);
    $call->execute();
    $return = $call->getValors();
    regDossier();
}

function regPavementFull(){
    $call = new CallPgSQL();
    $call->functionTable("funct_load_simulacao_recalculate","*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addNumeric($_POST["payFull"]["idCred"])
        ->addDate($_POST["payFull"]["data"])
        ->addDouble($_POST["payFull"]["desconto"])
        ->addDouble($_POST["payFull"]["corecao"])
        ->addChar($_POST["payFull"]["opcao"]);
    $call->execute();
    $result = $call->getValors();
    if($result["result"] != "f") die(json_encode(array("result" => true, "return" => $result)));
    else die(json_encode(array("result" => false, "msg" => $result["message"])));
}


function regPayFullNow(){
      $call = new CallPgSQL();
      $call->functionTable("funct_pay_credito_now","*")
          ->addString(Session::getUserLogado()->getId())
          ->addNumeric(Session::getUserLogado()->getIdAgencia())
          ->addNumeric($_POST["payFull"]["idCred"])
          ->addString((($_POST["payFull"]["doc"] == "null") ? null : $_POST["payFull"]["doc"]))
          ->addNumeric((($_POST["payFull"]["bank"] == "null") ? null : $_POST["payFull"]["bank"]))
          ->addString($_POST["payFull"]["type"])
          ->addDate($_POST["payFull"]["data"])
          ->addDouble($_POST["payFull"]["desconto"])
          ->addDouble($_POST["payFull"]["corecao"])
          ->addChar($_POST["payFull"]["opcao"]);
      $call->execute();
    $result = $call->getValors();
    if($result["result"] != "f") die(json_encode(array("result" => true)));
    else die(json_encode(array("result" => false, "msg" => $result["message"])));
}