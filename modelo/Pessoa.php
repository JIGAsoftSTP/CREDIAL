<?php

/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/25/16
 * Time: 12:09 AM
 */
class Pessoa
{
    private $nome;
    private $apelido;
    private $documento;
    private $sexo;
    private $morada;

    /**
     * Pessoa constructor.
     */
    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * @return mixed
     */
    public function getApelido()
    {
        return $this->apelido;
    }

    /**
     * @return mixed
     */
    public function getDocumento()
    {
        return $this->documento;
    }

    /**
     * @return mixed
     */
    public function getSexo()
    {
        return $this->sexo;
    }

    /**
     * @return mixed
     */
    public function getMorada()
    {
        return $this->morada;
    }

    /**
     * @param mixed $nome
     */
    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    /**
     * @param mixed $apelido
     */
    public function setApelido($apelido)
    {
        $this->apelido = $apelido;
    }

    /**
     * @param mixed $documento
     */
    public function setDocumento($documento)
    {
        $this->documento = $documento;
    }

    /**
     * @param mixed $sexo
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    /**
     * @param mixed $morada
     */
    public function setMorada($morada)
    {
        $this->morada = $morada;
    }

}