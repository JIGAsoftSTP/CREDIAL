<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/27/16
 * Time: 10:20 PM
 */

    include "../conexao/CallPgSQL.php";
    include "../modelo/Imagem.php";
    include "Session.php";
    include_once "../modelo/User.php";

    session_start();

    switch ($_POST["intention"])
    {
        case "loadDataAdmin":
            carregarDadosUtilizador();
            break;
        case "loadObject":
            loadTypeObjeto();
            break;
        case "loadDataObject":
            loadObjectValues();
            break;
        case "add Entity":
            regEntity();
            break;
        case "disable object":
            disableObject();
            break;
    }

    function carregarDadosUtilizador()
    {
        $call = new CallPgSQL();
        $agencias = $call->loadDados("ver_agencia", "\"ID\"", "\"NOME\"");
        $tipoCreditos = $call->loadDados("ver_tipocredito","\"ID\"", "\"DESC\"");
        $bancos = $call->loadDados("ver_bank", "\"ID\"", "\"NAME\"");
        $localidades = $call->loadDados("ver_localidade", "\"ID\"", "\"DESC\"");
        $j = json_encode(array("agencias"=>$agencias,
                            "tipoCreditos"=>$tipoCreditos,
                            "bancos"=>$bancos,
                            "localidades"=>$localidades,
                            "listMenu" => getListMenu()));
        die($j);

    }


    function loadTypeObjeto()
    {
        $call = new CallPgSQL();
        $retorno = $call->loadDados("ver_typeobjecto", "\"ID\"", "\"NAME\"");
        $j = json_encode(array("objeto" =>$retorno));
        die($j);
    }

    function loadObjectValues()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_load_object", "*")
            ->addNumeric($_POST["object_id"]);
        $call->execute();
        $retorno = array();

        while ($values = $call->getValors() )
        {
            $retorno[count($retorno)] = array("idCredito" => $values["ID"], "DESCRICAO" => $values["DESCRICAO"]);
        }
        $j = json_encode(array("objeto" =>$retorno));
        die($j);
    }

    function regEntity()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_objecto", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["idTypeEntity"])
            ->addString($_POST["entity"]);
        $call->execute();
        $result = $call->getValors();
        $js = json_encode(array("entity" =>$result));
        die($js);
    }

    function disableObject()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_disable_object", "*")
            ->addString(Session::getUserLogado()->getId())
            ->addNumeric(Session::getUserLogado()->getIdAgencia())
            ->addNumeric($_POST["idObject"]);
        $call->execute();

        $result = $call->getValors();
        $js = json_encode(array("resultado" =>$result));
        die($js);
    }

function getListMenu(){
    $call = new CallPgSQL();
    $call->selects("ver_menu_active","*")
        ->finilize("order by","asc","\"LEVEL\"");
    $call->execute();
    $list = array();
    while ($values = $call->getValors())
        $list[count($list)] = $values;
    return  $list;
}