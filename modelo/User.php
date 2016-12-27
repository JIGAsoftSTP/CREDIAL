<?php

/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 9/25/16
 * Time: 8:01 AM
 */
class User
{
    private $idAgencia;
    private $id;
    private $nome;
    private $apelido;
    private $Agencia;
    private $foto;
    private $fotoLogo;
    private $senha;
    private $senhaConfirme;
    private $menu;
    private $idPerfil;
    private $Perfil;
    private $estado;
    private $estadoNome;
    private $idLogin;
    private $redifinido;

    /**
     * User constructor.
     * @return User
     */
    public function __construct()
    {
        return $this;
    }

    /**
     * @param mixed $id
     * @return User
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @param mixed $nome
     * @return User
     */
    public function setNome($nome)
    {
        $this->nome = $nome;
        return $this;
    }

    /**
     * @param mixed $apelido
     * @return User
     */
    public function setApelido($apelido)
    {
        $this->apelido = $apelido;
        return $this;
    }

    /**
     * @param mixed $idAgencia
     * @return User
     */
    public function setIdAgencia($idAgencia)
    {
        $this->idAgencia = $idAgencia;
        return $this;
    }

    /**
     * @param mixed $Agencia
     * @return User
     */
    public function setAgencia($Agencia)
    {
        $this->Agencia = $Agencia;
        return $this;
    }

    /**
     * @param mixed $foto
     * @return User
     */
    public function setFoto($foto)
    {
        $this->foto = $foto;
        return $this;
    }

    /**
     * @param mixed $fotoLogo
     * @return User
     */
    public function setFotoLogo($fotoLogo)
    {
        $this->fotoLogo = $fotoLogo;
        return $this;
    }

    /**
     * @param mixed $senha
     * @return User
     */
    public function setSenha($senha)
    {
        $this->senha = $senha;
        return $this;
    }

    /**
     * @param mixed $senhaConfirme
     * @return User
     */
    public function setSenhaConfirme($senhaConfirme)
    {
        $this->senhaConfirme = $senhaConfirme;
        return $this;
    }

    /**
     * @param mixed $menu
     * @return User
     */
    public function setMenu($menu)
    {
        $this->menu = $menu;
        return $this;
    }

    /**
     * @param mixed $idPerfil
     * @return User
     */
    public function setIdPerfil($idPerfil)
    {
        $this->idPerfil = $idPerfil;
        return $this;
    }

    /**
     * @param mixed $Perfil
     * @return User
     */
    public function setPerfil($Perfil)
    {
        $this->Perfil = $Perfil;
        return $this;
    }

    /**
     * @param mixed $estado
     * @return User
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;
        return $this;
    }

    /**
     * @param mixed $estadoNome
     * @return User
     */
    public function setEstadoNome($estadoNome)
    {
        $this->estadoNome = $estadoNome;
        return $this;
    }

    /**
     * @param mixed $idLogin
     * @return User
     */
    public function setIdLogin($idLogin)
    {
        $this->idLogin = $idLogin;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getIdAgencia()
    {
        return $this->idAgencia;
    }

    /**
     * @return mixed
     */
    public function getAgencia()
    {
        return $this->Agencia;
    }

    /**
     * @return mixed
     */
    public function getFoto()
    {
        return $this->foto;
    }

    /**
     * @return mixed
     */
    public function getFotoLogo()
    {
        return $this->fotoLogo;
    }

    /**
     * @return mixed
     */
    public function getSenha()
    {
        return $this->senha;
    }

    /**
     * @return mixed
     */
    public function getSenhaConfirme()
    {
        return $this->senhaConfirme;
    }

    /**
     * @return array
     */
    public function getMenu()
    {
        return $this->menu;
    }

    /**
     * @return mixed
     */
    public function getIdPerfil()
    {
        return $this->idPerfil;
    }

    /**
     * @return mixed
     */
    public function getPerfil()
    {
        return $this->Perfil;
    }

    /**
     * @return mixed
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * @return mixed
     */
    public function getEstadoNome()
    {
        return $this->estadoNome;
    }

    /**
     * @return mixed
     */
    public function getIdLogin()
    {
        return $this->idLogin;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
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
    public function getRedifinido()
    {
        return $this->redifinido;
    }

    /**
     * @param mixed $redifinido
     * @return User
     */
    public function setRedifinido($redifinido)
    {
        $this->redifinido = $redifinido;
        return $this;
    }

}