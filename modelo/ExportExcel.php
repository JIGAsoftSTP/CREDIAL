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



        $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');

        $objWriter->save("../resources/report/Excel/".Session::getUserLogado()->getId()." - ".$this->name.".xlsx");
    }
}