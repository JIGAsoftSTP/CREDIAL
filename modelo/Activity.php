<?php

/**
 * Created by PhpStorm.
 * User: Helcio
 * Date: 2/24/2017
 * Time: 11:16 PM
 */
class Activity
{
    private $datainicio;
    private $datafim;
    private $loadmod;


    public function getLoadmod()
    {
        return $this->loadmod;
    }

    /**
     * @param mixed $loadmod
     */
    public function setLoadmod($loadmod)
    {
        $this->loadmod = $loadmod;
    }

    /**
     * @return mixed
     */
    public function getDatainicio()
    {
        return $this->datainicio;
    }

    /**
     * @param mixed $datainicio
     */
    public function setDatainicio($datainicio)
    {
        $this->datainicio = $datainicio;
    }

    /**
     * @return mixed
     */
    public function getDatafim()
    {
        return $this->datafim;
    }

    /**
     * @param mixed $datafim
     */
    public function setDatafim($datafim)
    {
        $this->datafim = $datafim;
    }





}