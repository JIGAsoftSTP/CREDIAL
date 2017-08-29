<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 12/28/16
 * Time: 11:53 AM
 */
require_once "../resources/fw/dompdf/dompdf/dompdf_config.inc.php";
class ExportPDF{
    const SHOW = "SHOW", HIDE = "HIDE";

    /**
     * @var string
     */
    private $name;

    /**
     * @var bool
     */
    private $hideOther;

    /**
     * @var string
     */
    private $user;

    /**
     * @var array
     */
    private $data;

    /**
     * @var array
     */
    private $listKey;

    /**
     * @var array
     */
    private $listParam = array();

    /**
     * @var array
     */
    private $listRename = array();

    /**
     * @var array
     */
    private $listParamSome = array();

    /**
     * @var array
     */
    private $listValueSome = array();

    /**
     * @var array
     */
    private $joinParam = array();

    /**
     * @param string $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }


    /**
     * @param bool $hideOther
     * @return ExportPDF
     */
    public function setHideOther(bool $hideOther): ExportPDF
    {
        $this->hideOther = $hideOther;
        return $this;
    }

    /**
     * @param string $user
     * @return $this
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @param string $typeParam
     * @param array $listParam
     * @return $this
     */
    public function setListParam(string $typeParam, ... $listParam)
    {
        $this->listParam[$typeParam] = $listParam;
        return $this;
    }

    /**
     * @param $param string
     * @param $rename string
     * @return $this
     * @internal param array $listRename
     */
    public function setListRename($param, $rename)
    {
        $this->listRename[$param] = $rename;
        return $this;
    }

    /**
     * @param array $listParamSome
     * @return $this
     */
    public function setListParamSome(... $listParamSome)
    {
        $this->listParamSome = $listParamSome;
        return $this;
    }

    /**
     * @param string $joinName
     * @param array $joinParam
     * @return $this
     */
    public function setJoinParam(string $joinName, ... $joinParam)
    {
        $this->joinParam [] = $joinParam;
        $this->listRename["join-" . (count($this->joinParam) - 1)] = $joinName;
        return $this;
    }

    public function export(array $data){
        $dompdf = new DOMPDF();

        $document = $this->dataExport($data);
        $dompdf->load_html($document);

        $dompdf->set_paper("A4","landscape");
        $dompdf->render();

        $date = date("d-m-y-his");
        $fileName = "./resources/report/PDF/" . $date . " - " . Session::getUserLogado()->getId() . " - " . $this->name . ".pdf";
        $output = $dompdf->output();
        file_put_contents(".".$fileName, $output);
        die(json_encode(array("fileName" => $fileName)));

    }

    private function dataExport(array $data){
        $this->data = $data;

        $enterpriseLocal = "../resources/json/enterprise.json";
        $enterprise = file_get_contents($enterpriseLocal);
        $enterprise = json_decode($enterprise);

        $this->getAllTitle();

        /** @var $enterprise Enterprise */

        return '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
           <!--<link rel="stylesheet" href="../resources/css/geralStyle.css">-->
           <!--<link rel="stylesheet" href="../resources/css/table.css">-->
           <style>.sh-rcrs{display: none}</style>
        </head>
        <body>
            <div class="geral-content">
                <h1></h1>
                <header>
                    <!--<nav class="logo-nav"><span class="logo"></span></nav>-->
                    <nav class="enterprise-det">
                        <p class="name">'.$enterprise->name.'</p>
                        <p class="email">Email: '.$enterprise->mail.' <span></span></p>
                        <p class="telfax">NIF: <span>'.$enterprise->nif.'</span></p>
                        <p class="telfax">Tel: <span>'.$enterprise->telefone.'</span></p>
                    </nav>
                </header>
                <h1 class="title-report">'.$this->name.'</h1>
                <div class="content-table">
                    <div class="x-table">
                        <table class="selectable" align="center" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr>                    
                                   '.$this->addTitle().'
                                </tr>
                            </thead>
                            <tbody>
                              '.$this->addBody(). '
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
       <!-- <script type="text/javascript" src="../resources/js/jQuery.js"></script>-->
       <!--<script type="text/javascript" src="../resources/js/table.js"></script>-->
        <style>
            .geral-content{
                padding: 0.01rem;
            }
            .geral-content nav{
                margin-bottom: 2rem;
            }
            .enterprise-det p{
                line-height: 1.7rem;
            }
            .geral-content .title-report{
                text-align: center;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            table{
                border : 1px solid #555555;
            }
            tr th{
                font-size: 14px;
                border : 1px solid;
                padding: 5px;
            }
            tr td{
                font-size: 12px;
                border : 1px solid;
                padding: 5px;
            }
            table label{
                margin: 0.5rem;
            }
            .rodape label{
               color: #e78f08;
               font-weight: bold;
            }
        </style>
        </html>';
    }

    private function getAllTitle()
    {
        $this->listKey = array_keys($this->data[0]);
    }

    /**
     * @param string $param
     * @return string
     */
    private function paramHasRename(string $param)
    {
        return (key_exists($param, $this->listRename)) ? $this->listRename[$param] : $param;
    }

    private function joinParam(string $param, array $data)
    {
        $return = "";
        foreach ($this->joinParam as $join) {
            $result = array_search($param, $join);
            if (!is_bool($result) && $result == 0)
                foreach ($join as $j) {
                    $return .= " " . $this->hasKey($j, $data);
                }
        }

        return ($return == "") ? $this->hasKey($param, $data) : $return;
    }

    private function getJoinTitle(string $param)
    {
        foreach ($this->joinParam as $key => $join) {
            $result = array_search($param, $join);
            if (!is_bool($result) && $result == 0)
                return $this->listRename["join-" . $key];
        }

        return $param;
    }

    /**
     * @param string $param
     * @param array $data
     * @return mixed|string
     */
    private function hasKey(string $param, array $data)
    {
        return (array_key_exists($param, $data))
            ? $data[$param]
            : "";
    }

    private function showOrHideParam(string $param)
    {
        foreach ($this->listParam as $pmKey => $pm) {
            foreach ($pm as $pKey => $p) {
                if ($p == $param)
                    return $pmKey;
            }
        }
        return ((!$this->hideOther) ?  ExportPDF::SHOW : ExportPDF::HIDE);
    }

    private function someParam(string $param, array $data)
    {
        foreach ($this->listParamSome as $pSome) {
            if ($param == $pSome) {
                $this->listValueSome[$param] = ($this->hasKey($param, $this->listValueSome) == "")
                    ? $this->valueToSome($param, $data)
                    : $this->listValueSome[$param] + $this->valueToSome($param, $data);
                return;
            }
        }
        $this->listValueSome[$param] = "";
    }

    /**
     * @param string $param
     * @param array $data
     * @return float
     */
    private function valueToSome(string $param, array $data): float
    {
        return ((float)($this->hasKey($param, $data) == "" ? 0 : $data[$param]));
    }


    private function addTitle(){
        $srt = "";
        for ($if = 0; $if < count($this->listKey); $if++) {
            if ($this->showOrHideParam($this->listKey[$if]) == ExportPDF::SHOW) {
                $value = $this->listKey[$if];
                $srt .=  "<th><label>".$this->paramHasRename($this->getJoinTitle($value))."</label></th>";
            }
        }
        return $srt;
    }

    /**
     * @return string
     */
    private function addBody(){
        $srt = "";
        foreach ($this->data as $lineReport) {
            $srt .= "<tr>";
            for ($if = 0; $if < count($this->listKey); $if++) {
                if ($this->showOrHideParam($this->listKey[$if]) == ExportPDF::SHOW) {
                    $value = $this->joinParam($this->listKey[$if], $lineReport);
                    $srt .=  "<td><label>".$value."</label></td>";
                }
                $this->someParam($this->listKey[$if], $lineReport);
            }
            $srt .=  "</tr>";
        }

        $srt .= $this->addRodape();
        return $srt;
    }

    private function addRodape(){
        $srt =  "<tr class=\"rodape\">";
        foreach ($this->listValueSome as $keySome => $total){
            if ($this->showOrHideParam($keySome) == ExportPDF::SHOW) {
                $srt .=  "<td><label>".$total."</label></td>";
            }
        }
        $srt .=  "</tr>";
        return $srt;
    }
}