<?php
    include "../conexao/CallPgSQL.php";
    include "../modelo/Imagem.php";
    include "Session.php";
    include_once "../modelo/User.php";

    session_start();


    switch ($_POST["intention"])
    {
        case "anular cheque":
            anularCheque();
            break;
        case "confirmar restauro cheque":
            restaurarCheque();
            break;
        case "restaurar cheque":
            checkRestoreEffect();
            break;
        case "load Insurance":
            loadInsurance();
            break;
        case "tax data":
            loadTax();
            break;
        case "agency adm":
            loadAgencyAdm();
            break;
        case "contas":
            contas();
            break;
        case "regBank":
            registrarBanco();
            break;
        case "add bank account":
            registarContaBanco();
            break;
        case "regInsurance":
            registrarSeguro();
            break;
        case "add tax":
            registarTaxa();
            break;
        case "add movimentation":
            makeBanktransfer();
            break;
        case "make debit or credit":
            makeDebitCredit();
            break;
        case "add agency":
            registrarAgencia();
            break;
        case "add Insurance":
            registrarSeguro();
            break;
        case "registrar cheque":
            registrarCheque();
            break;
        case "load user agency":
            loadUserAgency();
            break;
        case "bank moviment":
            loadBankMoviment();
            break;
        case "bank data":
            loadBankData();
            break;
        case "search tax":
            searchTax();
            break;
        case "load cheque data":
            loadChequeData();
            break;
        case "load cheque":
            loadCheckBanks();
            break;
        case "localidades":
            carregarLocalidades();
            break;
        case "load-account-data-update":
            loadAcountDataUpdate();
            break;
        case "update-bank-account":
            updateBankAccount();
            break;
    }





    function loadUserAgency()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_load_user_by_agency","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["agency"]);
        $call->execute();
        $result = array();
        while ($values = $call->getValors()) {
            if ($values["PHOTO"] == null)
          $values["PHOTO"] = "../../resources/img/user.png";
//                  $values["PHOTO"] = "./resources/img/user.png";
            else
            {
                $img = md5($values["ID"]) /*. ".png"*/;
                file_put_contents("../resources/img/userImg/" . $img, pg_unescape_bytea($values["PHOTO"]));
                $values["PHOTO"] = "../../resources/img/userImg/" . $img;
            }
            $result[count($result)] = $values;
        }
        die(json_encode(array("result" =>$result)));

    }
    function registarTaxa()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_taxa","*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["taxData"]["tipoCredito"])
            ->addNumeric($_POST["taxData"]["dias"])
            ->addDouble($_POST["taxData"]["valorTaxa"]);
        $call->execute();

        $result = $call->getValors();
         die(json_encode(array("resultado" => $result)));

    }

    function registrarBanco()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_banco", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["Banco"]["sigla"])
            ->addString($_POST["Banco"]["nome"])
            ->addString(null);
        $call->execute();

        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("resultado" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("resultado" => $result)));
        }

    }

    function registarContaBanco()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_conta", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["bank"]["nome"])
            ->addString($_POST["bank"]["codigoConta"])
            ->addString($_POST["bank"]["codigoAgencia"])
            ->addString($_POST["bank"]["descricao"])
            ->addDouble($_POST["bank"]["saldoMinimo"]);
        $call->execute();
        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("resultado" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("resultado" => $result)));
        }
    }
    function registrarSeguro()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_seguro", "*")
            ->addNumeric(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addDouble($_POST["value"]);
        $call->execute();

        $j = json_encode(array("result" =>$call->getValors()));
        die($j);
    }

    function registrarCheque()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_chequempresa", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["Cheque"]["conta"])
            ->addNumeric($_POST["Cheque"]["agencia"])
            ->addString($_POST["Cheque"]["sequenciaInicial"])
            ->addString($_POST["Cheque"]["sequenciaFinal"])
            ->addNumeric($_POST["Cheque"]["totalCheque"]);
        $call->execute();

        $result = $call->getValors();
        die(json_encode(array("result" => $result)));

    }

    function contas()
    {
        $contas = array();
        $bancos = array();

        $call = new CallPgSQL();
        $call->selects("ver_conta", "*");
        $call->execute();

        while($row = $call->getValors())
        {
            $contas[count($contas)] = $row;
        }

        $call->selects("ver_bank", "*");
        $call->execute();

        while($row = $call->getValors())
        {
            $bancos[count($bancos)] = $row;
        }
        die(json_encode(array("contas" =>$contas, "bancos" =>$bancos)));

    }
    function carregarLocalidades()
    {
        $call = new CallPgSQL();
        $call->selects("ver_localidade", "*");
        $call->execute();
        $result = array();
        while($row = $call->getValors())
        {
            $result[count($result)] = $row;
        }
        die(json_encode(array("localidades" =>$result)));
    }

    function loadAgencyAdm()
    {
        $call = new CallPgSQL();
        $call->selects("ver_agencia_administracao", "*");
        $call->execute();
        $values = array();
        while($row = $call->getValors())
        {
            $values[count($values)] = $row;
        }
        die(json_encode(array("result" =>$values)));
    }
    function registrarAgencia()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_agencia", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["Agency"]["localidade"])
            ->addString($_POST["Agency"]["nome"]);
        $call->execute();

        $j = json_encode(array("result" =>$call->getValors()));
        die($j);
    }

    function loadTax()
    {
        $call = new CallPgSQL();
        $tipoCreditos = $call->loadDados("ver_tipocredito","\"ID\"", "\"DESC\"");
        $call->functionTable("funct_load_taxa", "*")
            ->addNumeric(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
             ->addNumeric(1353);
        $call->execute();

        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        die(json_encode(array("result" =>$arrayValues, "tipoCreditos" =>$tipoCreditos)));
    }

    function searchTax()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_load_taxa", "*")
            ->addNumeric(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["typeCredit"]);
        $call->execute();
        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        die(json_encode(array("result" =>$arrayValues)));

    }

function loadBankMoviment()
{
    $call = new CallPgSQL();
    $call->functionTable("funct_load_bancomovimentation", "*")
        ->addString(Session::getUserLogado()->getId())
        ->addNumeric(Session::getUserLogado()->getIdAgencia())
        ->addNumeric($_POST["bank"]);
    $call->execute();

    $arrayValues = array();
    while($result = $call->getValors())
    {
        $arrayValues[count($arrayValues)] = $result;
    }
    $j = json_encode(array("result" =>$arrayValues));
    die($j);
}


function loadInsurance()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_load_insurance", "*")
            ->addNumeric(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia());
        $call->execute();

        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        die(json_encode(array("result" =>$arrayValues)));

    }
    function makeBanktransfer()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_efetuar_transferencia", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addDouble($_POST["Movimentation"]["value"])
            ->addNumeric($_POST["Movimentation"]["bankFrom"])
            ->addNumeric($_POST["Movimentation"]["bankTo"])
            ->addString($_POST["Movimentation"]["desc"]);
        $call->execute();
        $result = $call->getValors();

        die(json_encode(array("result" => $result)));
    }

    function makeDebitCredit()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_bancomovimento", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["DebitCredit"]["bank"])
            ->addDouble(($_POST["DebitCredit"]["typeOperation"] == 'Débito' ? $_POST["DebitCredit"]["value"] : 0))
            ->addDouble(($_POST["DebitCredit"]["typeOperation"] == 'Crédito' ? $_POST["DebitCredit"]["value"] : 0))
            ->addString($_POST["DebitCredit"]["numDoc"]);
        $call->execute();
        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("result" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("result" => $result)));
        }
    }

    function loadDataBank()
    {
        $call = new CallPgSQL();
        $call->selects("ver_bank", "*");
        $call->execute();
        $result = $call->getValors();
        die(json_encode(array("banks" => $result)));
    }

    function loadBankData()
    {
        $call = new CallPgSQL();
        $bancos = $call->selects("ver_bank", "*");
        $call->execute();
        $values = array();

        while($row = $call->getValors())
        {
            $values[count($values)] = $row;
        }
        die(json_encode(array("banks" =>$bancos)));
    }
    function loadChequeData()
    {
        $call = new CallPgSQL();
        $contas = $call->loadDados("ver_conta_cheque","\"ID\"", "\"CONTA\"");
        $agencias = $call->loadDados("ver_agencia","\"ID\"", "\"NOME\"");

        die(json_encode(array("contas" =>$contas, "agencias" =>$agencias)));
    }

    function loadCheckBanks()
    {
        $call = new CallPgSQL();
        $call->selects("ver_cheques_disponiveis", "*");
        $call->execute();
        $cheques = array();
        while($row = $call->getValors())
        {
            $cheques[count($cheques)] = $row;
        }
        die(json_encode(array("result" =>$cheques)));
    }

    function restaurarCheque()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_cheque_restore", "*")
            ->addInt(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia())
            ->addInt($_POST["idChequeAnular"])
            ->addInt(($_POST["idChequeRestaurar"] == "0" ? null : $_POST["idChequeRestaurar"]));
        $call->execute();
        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("result" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("result" => $result)));
        }
    }

    function checkRestoreEffect()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_cheque_restore_effect", "*");
        $call->execute();
        $arrayValues = array();
        while($row = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $row;
        }
        die(json_encode(array("result" => $arrayValues)));
    }

    function anularCheque()
    {
        $call= new CallPgSQL();
        $call->functionTable("funct_cheques_end", "*")
        ->addInt(Session::getUserLogado()->getId())
        ->addInt(Session::getUserLogado()->getIdAgencia())
        ->addInt($_POST["idCheque"]);
        $call->execute();
        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("result" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("result" => $result)));
        }
    }

    function loadAcountDataUpdate()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_load_conta", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["id-account"]);
        $call->execute();

        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        die(json_encode(array("result" =>$arrayValues)));
    }

    function updateBankAccount()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_change_conta", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["id-account"])
            ->addNumeric($_POST["bank"]["nome"])
            ->addString($_POST["bank"]["codigoConta"])
            ->addString($_POST["bank"]["codigoAgencia"])
            ->addString($_POST["bank"]["descricao"])
            ->addDouble($_POST["bank"]["saldoMinimo"]);
        $call->execute();
        $result = $call->getValors();

        if($result["result"] == true){
            $result["result"] = "true";
            die(json_encode(array("resultado" => $result)));
        }
        else{
            $result["result"] = "false";
            die(json_encode(array("resultado" => $result)));
        }







    }