<?php
include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
include "Session.php";
include_once "../modelo/User.php";

        loadActivities();
function loadActivities()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_activity", "*")
        ->addString('109000001')
        ->addJsonb('{"dateinicio":"2008-02-14","datefim":"2017-02-27","loadmod":"date"}');
    $call->execute();
    $arrayValues = array();

    while($result = $call->getValors())
    {
//            $arrayValues[count($arrayValues)] = $result;
        print_r(json_encode(array("dd" =>$result)));
    }

//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";
//    print_r($call->getValors());
//    echo "<br><br>";


}