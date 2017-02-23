<?php
include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
include "Session.php";
include_once "../modelo/User.php";

    if($_POST["intention"] == "reg_activity") regActivity();

    function regActivity()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_activity","*")
            ->addNumeric(Session::getUserLogado()->getIdLogin())
            ->addNumeric($_POST["content key"])
            ->addString($_POST["operation"])
            ->addJson($_POST["jsonContent"])
            ->addInt($_POST["level"]);
        $call->execute();

        $result = $call->getValors();
        die(json_encode(array("result activity registration" => $result)));
    }






