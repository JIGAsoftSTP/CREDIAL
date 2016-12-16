<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Description of Imagem
 *
 * @author AhmedJorge
 */
class Imagem {
    const TMP_NAME = "tmp_name";
    const NAME = "name";
    const ERROR = "error";
    const SIZE = "size";
    private $size;
    private $file;
    private $name;
    private $tmp;
    private $erro;
    private $extensao;
    private $newFileName;
    private $caminnoCompletoNewFile;
    private $caminnoCompletoNewFileView;
//    private $repositorio = "../resources/img/uploader/";
    private $repositorio = "../resources/img/loadimg/";
    private $repositorioView = "./resources/img/loadimg/";
    
    function __construct($file)
    {
        if ($file != null) {
            $this->file = $file;
            $this->name = $this->file[Imagem::NAME];
            $this->tmp = $this->file[Imagem::TMP_NAME];
        }
        if($this->tmp)
        {
            $this->extensao = strchr($this->name, '.');
            if(strtoupper($this->extensao) == strtoupper(".PNG") 
            || strtoupper($this->extensao) == strtoupper(".GIF")
            || strtoupper($this->extensao) == strtoupper(".JPEG")
            || strtoupper($this->extensao) == strtoupper(".JPG"))
            {
                $this->deleteAllFileInDirectory();
//                session_start();
                $this->newFileName = md5(Session::getUserLogado()->getId())."-".md5(time().date("d-m-y h:M:s")).$this->extensao;
                $this->caminnoCompletoNewFile =  $this->repositorio.$this->newFileName;
                $this->caminnoCompletoNewFileView = $this->repositorioView.$this->newFileName;
                move_uploaded_file($this->tmp, $this->caminnoCompletoNewFile);
            }
            else { echo(json_encode(array("img"=>"./resources/img/user.png"))); }
        }
        else {  echo(json_encode(array("img"=>"./resources/img/user.png"))); }
    }
    
    function getSize() {
        return $this->size;
    }

    function getFile() {
        return $this->file;
    }

    function getName() {
        return $this->name;
    }

    function getTmp() {
        return $this->tmp;
    }

    function getErro() {
        return $this->erro;
    }

    function getRepositorio() {
        return $this->repositorio;
    }

    function setSize($size) {
        $this->size = $size;
    }

    function setFile($file) {
        $this->file = $file;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setTmp($tmp) {
        $this->tmp = $tmp;
    }

    function setErro($erro) {
        $this->erro = $erro;
    }

    function setRepositorio($repositorio) {
        $this->repositorio = $repositorio;
    }
    function getExtensao() {
        return $this->extensao;
    }

    function setExtensao($extensao) {
        $this->extensao = $extensao;
    }
    function getNewFileName() {
        return $this->newFileName;
    }

    function getCaminnoCompletoNewFile() {
        return $this->caminnoCompletoNewFile;
    }

    function setNewFileName($newFileName) {
        $this->newFileName = $newFileName;
    }

    function setCaminnoCompletoNewFile($caminnoCompletoNewFile) {
        $this->caminnoCompletoNewFile = $caminnoCompletoNewFile;
    }
    function getCaminnoCompletoNewFileView() {
        return $this->caminnoCompletoNewFileView;
    }

    function getRepositorioView() {
        return $this->repositorioView;
    }

    function setCaminnoCompletoNewFileView($caminnoCompletoNewFileView) {
        $this->caminnoCompletoNewFileView = $caminnoCompletoNewFileView;
    }

    function setRepositorioView($repositorioView) {
        $this->repositorioView = $repositorioView;
    }

    public function deleteAllFileInDirectory(){
//        echo "fkf";
        foreach (scandir($this->getRepositorio()) as $file)
        {
//            echo $file;
            if(is_file($this->getRepositorio()."/".$file) && !strpos($file."",md5(Session::getUserLogado()->getId())) ){
                unlink($this->getRepositorio()."/".$file);
            }
        }
    }
}
 
