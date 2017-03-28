<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 15-03-2017
 * Time: 14:14
 */

include "Session.php";
include "../modelo/User.php";
include "../modelo/Imagem.php";

const enterpriseLocal = "../resources/json/enterprise.json";
const enterpriseLocalSave = "../resources/img/enterprise";
const loadEnterpriseLocalSave = "./resources/img/enterprise";

if($_POST["intensao"] ==  "loadLogoEnterprise" ) {carregarImagem();}
if($_POST["intensao"] ==  "saveDataEnterprise" ) {saveDataEnterprise();}
if($_POST["intensao"] ==  "getDataEnterprise" ) {getDataEnterprise();}


function carregarImagem()
{
    if (isset($_FILES['img'])) {
        $img = new Imagem($_FILES['img']);
        die(json_encode(array("return" => true,"img"=>$img->getCaminnoCompletoNewFileView())));
    } else {
        die(json_encode(array("return" => false, "img" => null)));
    }
}

function saveDataEnterprise(){
    $enterprise = json_encode($_POST['enter']);
    $enterpriseOBJ = json_decode($enterprise);
    file_put_contents(enterpriseLocalSave, file(".".$enterpriseOBJ->photo));
    addPermission(enterpriseLocalSave, 0777);

    $enterpriseOBJ->photo = loadEnterpriseLocalSave;
    $enterprise = json_encode($enterpriseOBJ);
    file_put_contents(enterpriseLocal, $enterprise);
    addPermission(enterpriseLocal, 0777);
    die(json_encode(array("return" => true)));
}

function getDataEnterprise(){
    die(file_get_contents(enterpriseLocal));
}

function addPermission($file, $permission){
//    $per = (int) fileperms($file);
//    if ($per != $permission){
//        chmod(enterpriseLocalSave, $permission);
//    }
}