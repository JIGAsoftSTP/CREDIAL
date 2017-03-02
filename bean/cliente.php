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
    if($_POST["intensao"] == "reloadPestacaoCreditdo"){ reloadPestacaoCreditdo(); }
    if($_POST["intensao"] == "editeSelectedClient"){ changeClienteDataNasc(); }
    if($_POST["intensao"] == "regPavementFull"){ regPavementFull(); }
    if($_POST["intensao"] == "regPayFullNow"){ regPayFullNow(); }

    function listCliente(){
        $call = new CallPgSQL();
        $call->selects("ver_client_simple", "*");
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
        die(json_encode(array("resultClient" => $call->getValors(),
                            "resultCredito" => loadCreditoClient(),
                            "resultRealDataCliente" => loadDataCliente())));
    }

    function loadCreditoClient(){
        $callC = new CallPgSQL();
        $callC->functionTable("funct_load_credito_client","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["nifCliente"]);
        $callC->execute();
        $listCredito = array();
        while ($values = $callC->getValors() )
        {
            $listCredito[count($listCredito)] = array(
                "credito" => $values,
                "prestacao" => loadPrestacao($values["ID"])
            );
        }
        return $listCredito;
    }

    function loadPrestacao($idCredito){
        $callP = new CallPgSQL();
        $callP->functionTable("funct_load_prestacao_credito","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($idCredito);
        $callP->execute();
        $listPestacao = array();
        while ($valuesP = $callP->getValors())
            $listPestacao[count($listPestacao)] = $valuesP;
        return $listPestacao;
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

function reloadPestacaoCreditdo(){
    die(json_encode(array("prestacao" => loadPrestacao($_POST['idCred']))));
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
    if($result["result"] == true) die(json_encode(array("result" => true, "return" => $result)));
    else die(json_encode(array("result" => false, "return" => $result)));
}


function regPayFullNow(){
      $call = new CallPgSQL();
      $call->functionTable("funct_pay_credito_now","*")
          ->addString(Session::getUserLogado()->getId())
          ->addString(Session::getUserLogado()->getIdAgencia())
          ->addString($_POST["payFull"]["idCred"])
          ->addString($_POST["payFull"]["doc"])
          ->addNumeric($_POST["payFull"]["bank"])
          ->addString($_POST["payFull"]["type"])
          ->addDate($_POST["payFull"]["data"])
          ->addDouble($_POST["payFull"]["desconto"])
          ->addDouble($_POST["payFull"]["corecao"])
          ->addChar($_POST["payFull"]["opcao"]);
      $call->execute();
    $result = $call->getValors();
    if($result["result"] == true) die(json_encode(array("result" => true)));
    else die(json_encode(array("result" => false, "return" => $result)));
}


//var UserState = {"ATIVO": "1", "INATIVO": "0", "PRE_ATIVO": "2" };
//Object.freeze(UserState);
//
//if(!Date.prototype.getDatePt){
//    Date.prototype.getDatePt = function () {
//        return (((this.getDate()+"").length == 1) ? "0"+this.getDate() : this.getDate() )
//            +"-"+((((this.getMonth()+1)+"").length == 1) ? "0"+(this.getMonth()+1) : (this.getMonth()+1))
//            +"-"+this.getUTCFullYear();
//    }
//}
//
//function getStringDate() {
//    return new Date().getDatePt();
//}


//<section class="modalPage mp-liquidar-full" id="cred-pay-form-full" >
//        <div class="modalFrame">
//            <div class="modalContainer">
//                <div class="content">
//                    <p class="type-font">
//                        <i class="icon-checkbox-unchecked" id="full-pay-dife-che">
//                            <span>Fonte de pagamento diferente</span>
//                        </i>
//                    </p>
//                    <div class="flex-form xpert-form" >
//                        <input type="text" placeholder="Data" id="full-pay-data" class="input-total date-liquida is-datepicker changeValuePayFull" >
//                    </div>
//                    <div class="dffrent flex-form xpert-form">
//                    	<input type="text" id="full-pay-numDoc" placeholder="Nº Documento" class="input-total" >
//						<select id="full-pay-bank" class="input-total" title="Banco" >
//							<option value="0">(Banco)</option>
//						</select>
//                        <input type="text" id="full-pay-desco" value="0" placeholder="Desconto (10%-20%)" title="Desconto (10%-20%)" class="input-2 double percent1020 changeValuePayFull">
//                        <input type="text" id="full-pay-corr" value="0" placeholder="Correção" title="Correção" class="input-2 double formatNumber changeValuePayFull">
//                        <span id="full-pay-op"><span class="xpert-toggle-2" ><span class="active">A</span><span>B</span></span></span>
//                    </div>
//                    <div class="secDiv xpert-form" >
//                        <section class="sec-same">
//                            <nav>
//                                <label>Inicial</label>
//                                <label id="full-pay-start">12522555</label>
//                            </nav>
//                            <nav>
//                                <label>Pago</label>
//                                <label id="full-pay-pago">12522555</label>
//                            </nav>
//                            <nav>
//                                <label>Recalculado</label>
//                                <label id="full-pay-recal">12522555</label>
//                            </nav>
//                            <nav>
//                                <label>Diferença</label>
//                                <label id="full-pay-dife">12522555</label>
//                            </nav>
//                        </section>
//                    </div>
//                </div>
//                <div class="bt-yes-no-cancel">
//                    <button id="full-pay-bt">OK</button>
//                    <button class="bt-no-option">Cancelar</button>
//                </div>
//                <div class="modal-header">
//                    <b>Efetuar pagamento antecipado</b>
//                    <span class="mp-close"></span>
//                </div>
//            </div>
//        </div>
//    </section>