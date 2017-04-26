<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 12/27/16
 * Time: 11:24 PM
 */
include "../conexao/CallPgSQL.php";

if($_POST["intensao"] == "refresh"){ refreshData(); }

function refreshData(){
    $bd = new  CallPgSQL();
    $res =  json_decode($_POST["re"]);
    foreach ($res->list as $re) {
        $dataType = $re->dataType;
        $bd->functionTable("filter.refresh_materialized_views","*")
            ->addString($dataType);
        $bd->execute();
    }
    $j = json_encode(array("result"=>true)); die($j);
}