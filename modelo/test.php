<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/25/16
 * Time: 7:57 AM
 */

include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
//include "../conexao/_CallPgSQL.php";
//include "../bean/PrintTable.php";
//
//CallPgSQL::simplesSelect("public.user", "*");
//echo "<table border='1'>";
//PrintTable::loadBDTable(array("user_pwd"=>"PASS","user_name","user_age_id"),true );
//echo "</table>";


//function tes(...$f){
//    foreach ($f as $s => $d){
//        echo $s." ".$d."\n";
//    }
//}

//$file = simplexml_load_file("hhfhf");
//$file->

//CallPgSQL::functionTable("fhfhf","ffhhf",array("fhfhhf","fjf"),array("id;="=>"555"));
//echo CallPgSQL::getSql();
//echo json_encode(CallPgSQL::getValors());

//echo  CallPgSQL::dateYYYYMMdd("12-02-2015");

 $d = new CallPgSQL();
//$d->functionTable("dhdhhd","*")
//            ->addDate("25-02-2016")
//            ->addDate("25-02-2016")
//            ->addDate("25-02-2016");
////
//echo $d->sql;

//$d->selects("\"user\"","*")
////    ->addCodition("user_id","109934151","=");
//    ->addCodition("user_id","109000027","=");
////    ->addCodition("user_id","109000015","=");
//$d->execute();
//file_put_contents("./ing",pg_unescape_bytea($d->getValors()["user_photo"]));

//while ($vales = $d->getValors())
//echo json_encode($vales)."\n";

//tes(00,0001,0002,000,5550,00044);
//function tes(...$f){
//    $i=0;
//    foreach ($f as $s => $d){
//        echo $s." ".$d."    ----".++$i."----\n";
//    }
//}

//$user = new Imagem(null);
//$user->deleteAllFileInDirectory();

$call = new CallPgSQL();
$call->selects("ver_agencia","*")
    ->finilize("order by","ascd","\"ID\"", "\"NOME\"");
$call->execute();
