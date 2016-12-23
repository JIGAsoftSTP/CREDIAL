<?php
    include "../conexao/CallPgSQL.php";
    include "../modelo/Imagem.php";
    include "Session.php";
    include_once "../modelo/User.php";

    session_start();


    switch ($_POST["intention"]){
        case "load object type":
            loadObjectType();
            break;
        case "load object values":
            loadObjectValues();
            break;
        case "load agency":
            listaAgencias();
            break;
    }

    function loadObjectType()
    {
        $call = new CallPgSQL();
        $retorno = $call->loadDados("ver_typeobjecto", "\"ID\"", "\"NAME\"");
        die(json_encode(array("objeto" =>$retorno)));
    }

function loadObjectValues()
{
    $call = new CallPgSQL();
    $call->functionTable("funct_load_object", "*")
        ->addNumeric($_POST["id"]);
    $call->execute();
    $retorno = array();

    while ($values = $call->getValors() )
    {
        $retorno[count($retorno)] = array("idCredito" => $values["ID"], "DESCRICAO" => $values["DESCRICAO"]);
    }
    die(json_encode(array("objeto" =>$retorno)));
}

function listaAgencias()
{
    $call = new CallPgSQL();
    $agencias = $call->loadDados("ver_agencia","\"ID\"", "\"NOME\"");
    die(json_encode(array("agencies" =>$agencias)));
}

