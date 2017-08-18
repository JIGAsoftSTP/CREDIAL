<?php

/**
 * Created by PhpStorm.
 * User: siie
 * Date: 3/31/17
 * Time: 5:24 PM
 */
include "../resources/fw/PHPExcel/PHPExcel.php";

class ExportExcel
{
    const SHOW = "SHOW", HIDE = "HIDE";

    /**
     * @var string
     */
    private $name;

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
     * @var int
     */
    private $row = 1;

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

    /**
     * @param array $data
     */
    public function export(array $data)
    {
        $this->data = $data;
        $enterpriseLocal = "../resources/json/enterprise.json";
        $enterprise = file_get_contents($enterpriseLocal);
        $enterprise = json_decode($enterprise);

        /** @var $enterprise Enterprise */

        $excel = new PHPExcel();
        $excel->getProperties()->setCreator("JIGAsoft")
            ->setLastModifiedBy($enterprise->name)
            ->setTitle($this->name)
            ->setSubject($this->name)
            ->setDescription($this->name . "\n" . $enterprise->mail)
            ->setKeywords($this->name);

        $excel->setActiveSheetIndex(0);
        $excel->getActiveSheet()->setTitle($this->name);

        $excel->getActiveSheet()->getColumnDimension("A")->setAutoSize(true);
        $excel->getActiveSheet()->getRowDimension(1)->setRowHeight(35);

        $excel->getActiveSheet()->getStyle('A1')->getFont()->setBold(true)->setSize(30);
        $excel->getActiveSheet()->getStyle('A2')->getFont()->setBold(true)->setSize(13);
        $excel->getActiveSheet()->getStyle('A3')->getFont()->setBold(true)->setSize(15);
        $excel->getActiveSheet()->getStyle('A4')->getFont()->setBold(true)->setSize(15);

        $excel->getActiveSheet()->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
        $excel->getActiveSheet()->getStyle('A2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
        $excel->getActiveSheet()->getStyle('A3')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
        $excel->getActiveSheet()->getStyle('A4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

        $excel->getActiveSheet()->mergeCells("A1:E1");
        $excel->getActiveSheet()->mergeCells("A2:E2");
        $excel->getActiveSheet()->mergeCells("A3:E3");
        $excel->getActiveSheet()->mergeCells("A4:E4");

        $arrayBorder = array('borders' => [
            "allborders" =>  [
                'style' => PHPExcel_Style_Border::BORDER_THIN,
                'color' => array('rgb' => 'FFFFFF')
            ],
            "outline" =>  ['style' => PHPExcel_Style_Border::BORDER_MEDIUMDASHED]
        ]);
        $excel->getActiveSheet()->getStyle("A1:E4")->applyFromArray($arrayBorder);

        $excel->getActiveSheet()->setCellValue("A1", $enterprise->name);
        $excel->getActiveSheet()->setCellValue("A2", "NIF ".$enterprise->nif);
        $excel->getActiveSheet()->setCellValue("A3", "Tef".$enterprise->telefone);
        $excel->getActiveSheet()->setCellValue("A4", "Email ".$enterprise->mail);

        $this->row = 6;

        $this->getAllTitle();


        /***
         * Add list Title
         */
        $add = 0;
        for ($if = 0; $if < count($this->listKey); $if++) {
            if ($this->showOrHideParam($this->listKey[$if]) == ExportExcel::SHOW) {
                $key = $this->getLetraColuna($add) . $this->row;
                $value = $this->listKey[$if];
                $excel->getActiveSheet()->getStyle($key)->getFont()->setBold(true);
                $excel->getActiveSheet()->setCellValue($key, $this->paramHasRename($this->getJoinTitle($value)));
                $excel->getActiveSheet()
                    ->getStyle($key)
                    ->getAlignment()
                    ->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
                $arrayBorder = array('borders' => array("allborders" => array('style' => PHPExcel_Style_Border::BORDER_MEDIUM)));
                $excel->getActiveSheet()->getStyle($key)->applyFromArray($arrayBorder);
                $excel->getActiveSheet()->getRowDimension($this->row)->setRowHeight(25);
                $add++;
            }
        }

        $this->row++;
        $add = 0;
        foreach ($this->data as $lineReport) {
            for ($if = 0; $if < count($this->listKey); $if++) {
                if ($this->showOrHideParam($this->listKey[$if]) == ExportExcel::SHOW) {
                    $letra = $this->getLetraColuna($add);
                    $key = $letra . $this->row;
                    $value = $this->joinParam($this->listKey[$if], $lineReport);
                    $excel->getActiveSheet()->setCellValue($key, $value);
                    $excel->getActiveSheet()->getColumnDimension($letra)->setAutoSize(true);
                    $arrayBorder = array('borders' => array("allborders" => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
                    $excel->getActiveSheet()->getStyle($key)->applyFromArray($arrayBorder);
                    $excel->getActiveSheet()->getRowDimension($this->row)->setRowHeight(20);
                    $add++;
                }
                $this->someParam($this->listKey[$if], $lineReport);
            }
            $add = 0;
            $this->row++;
        }

        $add =0;
        foreach ($this->listValueSome as $keySome => $total){
            if ($this->showOrHideParam($keySome) == ExportExcel::SHOW) {
                $letra = $this->getLetraColuna($add);
                $key = $letra . $this->row;
                $excel->getActiveSheet()->setCellValue($key, $total);
                $excel->getActiveSheet()->getColumnDimension($letra)->setAutoSize(true);
                $excel->getActiveSheet()->getStyle($key)->getFont()->setBold(true);
                $excel->getActiveSheet()->getStyle($key)->getFont()->getColor()->setRGB("e78f08");
                $arrayBorder = array('borders' => array("allborders" => array('style' => PHPExcel_Style_Border::BORDER_MEDIUM)));
                $excel->getActiveSheet()->getStyle($key)->applyFromArray($arrayBorder);
                $excel->getActiveSheet()->getRowDimension($this->row)->setRowHeight(20);
                $add++;
            }
        }


        $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');

        $date = date("d-m-y-his");
        $fileName = "./resources/report/Excel/" . $date . " - " . Session::getUserLogado()->getId() . " - " . $this->name . ".xlsx";
        $objWriter->save("." . $fileName);
        die(json_encode(array("fileName" => $fileName)));
    }

    /**
     * @param int $i
     * @return string
     */
    private function getLetraColuna(int $i)
    {
        /**
         * @var array $listLetra
         */
        $listLetra = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        return $listLetra[$i];
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
        return ExportExcel::SHOW;
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

}