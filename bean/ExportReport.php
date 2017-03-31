<?php
/**
 * Created by PhpStorm.
 * User: siie
 * Date: 3/31/17
 * Time: 5:12 PM
 */
include "../modelo/ExportExcel.php";
include "./utilizador.php";
if($_POST["intensao"] == "exportExcel"){
    exportExcel();
}

function exportExcel(){
    $data = $_POST["report"];
    $export = new ExportExcel();
    $export->setUser(Session::getUserLogado()->getNome()." ".Session::getUserLogado()->getApelido())
        ->setName($data["name"])
        ->export($data["data"]);
}