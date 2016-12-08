<?php
    include "../conexao/CallPgSQL.php";
    include "../modelo/Imagem.php";
    include "Session.php";
    include_once "../modelo/User.php";

    session_start();
    switch ($_POST["intention"])
    {
        case "load Insurance":
            loadInsurance();
            break;
        case "taxs":
            loadTax();
            break;
        case "agency adm":
            loadAgencyAdm();
            break;
        case "siglas":
            siglas();
            break;
        case "regBank":
            registrarBanco();
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
                $values["PHOTO"] = "./resources/img/user.png";
            else
            {
                $img = md5($values["ID"]) /*. ".png"*/;
                file_put_contents("../resources/img/userImg/" . $img, pg_unescape_bytea($values["PHOTO"]));
                $values["PHOTO"] = "./resources/img/userImg/" . $img;
            }
            $result[count($result)] = $values;
        }
        $j = json_encode(array("result" =>$result));
        die($j);
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
         $j = json_encode(array("resultado" => $result));
        die($j);
    }

    function registrarBanco()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_banco", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["Banco"]["sigla"])
            ->addString($_POST["Banco"]["nome"]);
        $call->execute();

        $result = $call->getValors();
        $j = json_encode(array("resultado" =>$result));
        die($j);
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
            ->addNumeric($_POST["Cheque"]["banco"])
            ->addNumeric($_POST["Cheque"]["agencia"])
            ->addString($_POST["Cheque"]["sequenciaInicial"])
            ->addString($_POST["Cheque"]["sequenciaFinal"])
            ->addNumeric($_POST["Cheque"]["totalCheque"]);
        $call->execute();

        $result = $call->getValors();
        $j = json_encode(array("result" =>$result));
        die($j);
    }

    function siglas()
    {
        $call = new CallPgSQL();
        $call->selects("ver_bank", "*");
        $call->execute();
        $values = array();

        while($row = $call->getValors())
        {
            $values[count($values)] = $row;
        }
        $j = json_encode(array("siglas" =>$values));
        die($j);
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
        $j = json_encode(array("result" =>$values));
        die($j);
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
        $call->functionTable("funct_load_taxa", "*")
            ->addNumeric(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
             ->addNumeric(($_POST["typeCredit"] == "" || $_POST["typeCredit"] == null) ? 1353 : $_POST["typeCredit"]);
        $call->execute();

        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        $j = json_encode(array("result" =>$arrayValues));
        die($j);
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
        $j = json_encode(array("result" =>$arrayValues));
        die($j);
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

        $j = json_encode(array("result" =>$call->getValors()));
        die($j);
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

        $j = json_encode(array("result" =>$call->getValors()));
        die($j);
    }

