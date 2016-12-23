<?php
include "../conexao/CallPgSQL.php";
include "../modelo/User.php";
include "Session.php";


    if($_POST["intensao"] == "search client"){
        if($_POST["search"] == "Nº documento") searchClientByNumDoc();
        else if($_POST["search"] == "NIF") searchClientByNif();
        if($_POST["search"] == "Garantia") searchClientByWarranty();
        else searchClientByAll();
    }

    function searchClientByNumDoc()
    {
        $call = new CallPgSQL();
        $call->functionTable("filter.funct_filter_client_by_document_payment", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["valueSearch"]);
        $call->execute();
        $arrayValues = array();

        while($row = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $row;
        }
        die(json_encode(array("data" => $arrayValues)));
    }

    function searchClientByWarranty()
    {
        $call = new CallPgSQL();
        $call->functionTable("filter.funct_filter_client_by_credito_garantias", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["valueSearch"]);
        $call->execute();
        $arrayValues = array();

        while($row = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $row;
        }
        die(json_encode(array("data" => $arrayValues)));
    }

    function searchClientByNif()
    {
        $call = new CallPgSQL();
        $call->functionTable("filter.funct_filter_client_by_nif", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["valueSearch"]);
        $call->execute();
        $arrayValues = array();

        while($row = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $row;
        }
        die(json_encode(array("data" => $arrayValues)));
    }

    function searchClientByAll()
    {
        $call = new CallPgSQL();
        $call->functionTable("filter.funct_filter_client", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addInt(Session::getUserLogado()->getIdAgencia())
            ->addString($_POST["valueSearch"]);
        $call->execute();
        $arrayValues = array();

        while($row = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $row;
        }
        die(json_encode(array("data" => $arrayValues)));

    }



