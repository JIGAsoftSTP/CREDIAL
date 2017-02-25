<?php
include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
include "../modelo/Activity.php";
include "Session.php";
include_once "../modelo/User.php";

    if($_POST["intention"] == "reg_activity") regActivity();
   else if($_POST["intention"] == "loadActivities") loadActivities();
   else if($_POST["intention"] == "loadUsers") loadUsers();

    function regActivity()
    {
        $call = new CallPgSQL();
        $call->functionTable("funct_reg_activity","*")
            ->addNumeric(Session::getUserLogado()->getIdLogin())
            ->addNumeric(($_POST["contentKey"] == -1 ? null : $_POST["contentKey"]))
            ->addString($_POST["operation"])
            ->addJson(($_POST["jsonContent"] == -1 ? null : json_encode($_POST["jsonContent"])))
            ->addInt($_POST["level"]);
        $call->execute();

        $result = $call->getValors();
        die(json_encode(array("result activity registration" => $result)));
    }

    function loadActivities()
    {
        $activity = new Activity();

        if($_POST["dataInicio"] !="" &&
            $_POST["dataFim"] != "")
        {
            $activity->setDatainicio($_POST["dataInicio"]);
            $activity->setDatafim($_POST["dataFim"]);
            $activity->setLoadmod("date");
        }
        $call = new CallPgSQL();
        $call->functionTable("report.funct_rep_activity", "*")
            ->addString($_POST["user"])
            ->addJson(($_POST["filter"] == -1 ? null : json_encode($activity)));
        $call->execute();
        $arrayValues = array();
        while($result = $call->getValors())
        {
            $arrayValues[count($arrayValues)] = $result;
        }
        die(json_encode(array("result" =>$arrayValues)));
    }

    function loadUsers()
    {
        $call = new CallPgSQL();
        $call->selects("ver_simple_user", "*");
        $call->execute();
        $values = array();
        while($row = $call->getValors())
        {
            $values[count($values)] = $row;
        }
        die(json_encode(array("result" =>$values)));
    }






