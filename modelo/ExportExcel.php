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
    /**
     * @var array
     */
    private $listSome;

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
     * @param array $listSome
     * @return $this
     */
    public function setListSome(array $listSome)
    {
        $this->listSome = $listSome;
        return $this;
    }

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
     * @param array $data
     */
    public function export(array  $data )
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
            ->setDescription($this->name ."\n".$enterprise->mail)
            ->setKeywords($this->name);

        $excel->setActiveSheetIndex(0);
        $excel->getActiveSheet()->setTitle($this->name);

        $excel->getActiveSheet()->getColumnDimension("A")->setAutoSize(true);

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

        $excel->getActiveSheet()->setCellValue("A1",$enterprise->name);
        $excel->getActiveSheet()->setCellValue("A2",$enterprise->nif);
        $excel->getActiveSheet()->setCellValue("A3",$enterprise->telefone);
        $excel->getActiveSheet()->setCellValue("A4",$enterprise->mail);

        $this->row = 6;

        $this->getAllTitle();

        for($if=0; $if < count($this->listKey); $if++){
            $key = $this->getLetraColuna($if) . $this->row;
            $value = $this->listKey[$if];
            $excel->getActiveSheet()->getStyle($key)->getFont()->setBold(true);
            $excel->getActiveSheet()->setCellValue($key, $value);
        }

        $this->row++;

        foreach ($this->data as  $lineReport){
            for($if=0; $if < count($this->listKey); $if++){

                $letra = $this->getLetraColuna($if);
                $key = $letra . $this->row;
                $value = (array_key_exists($this->listKey[$if],$lineReport)) ? $lineReport[$this->listKey[$if]] : "";
                $excel->getActiveSheet()->setCellValue($key, $value);
                $excel->getActiveSheet()->getColumnDimension($letra)->setAutoSize(true);
            }
            $this->row++;
        }


        $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');

        $date = date("d-m-y-his");
        $fileName = "./resources/report/Excel/".$date." - ".Session::getUserLogado()->getId()." - ".$this->name.".xlsx";
        $objWriter->save(".".$fileName);
        die(json_encode(array("fileName" => $fileName)));
    }

    /**
     * @param int $i
     * @return string
     */
    private function getLetraColuna(int $i){
        /**
         * @var array $listLetra
         */
        $listLetra = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        return $listLetra[$i];
    }

    private function getAllTitle(){
        $this->listKey = array_keys($this->data[0]);
    }
}