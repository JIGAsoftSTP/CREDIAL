<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include "Conectar.php";
include "Select.php";
include "FuntionTable.php";
use Conectar as  Conexao;
/**
 * Description of CallPgSQL
 *
 * @author AhmedJorge
 */
class CallPgSQL {
    public $sql;
    private $rs;
    public $con;
    private  $queryName;
    public $listCondition = array();
    public $listParam = array();


    function __construct() {
        header('Content-type: text/html; charset=UTF-8');
        $this->sql = "";
        $this->con = new Conexao();
    }

    /**
     * (PHP 4, PHP 5)<br/>
     * @return String contêm os valores do requisição feita para a <b>BD</b>
     * @example <b>1º</b> CallPgSQL::getSql() Exemplo "select * from nameTable"
     *  @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    function getSql() {
        return $this->sql;
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @return QUERY contêm os valores do requisição feita para a <b>BD</b>
     * @example <b>1º</b> CallPgSQL::getRs()
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
     function getRs() {
        return $this->rs;
    }

    /**
     * (PHP 4, PHP 5)<br/>
     * @return INTEGER retorna o numero de linha da selecão
     * @example <b>1º</b> CallPgSQL::getNumRow()
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    function getNumRow() {
        return pg_num_rows($this->rs);
    }
      
    /**
     * (PHP 4, PHP 5)<br/>
     * @return Conectar retorna conexao
     * @example <b>1º</b> CallPgSQL::getCon()
     * @author JIGAsoft <jigasoft_stp@hotmail.com>
     */
     function getCon() {
        return $this->con;
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @return array retorna um array
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    function getValors() {
        return pg_fetch_array($this->rs,NULL,PGSQL_ASSOC);
    }

    
    /**
     * (PHP 4, PHP 5)<br/>
     * @param $tableNameOrView - o nome da Table or Veiw a ser usada
     * @param $selectValor - parametos da View or Table a ser Visualisado
     * @param $condicion - condicão a aplicar a Table or View
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     * @return Select
     */
    public function selects($table,$selected)
    {
        Conexao::connetToBd($this);
        $this->listCondition = array();
        $this->listParam = array();
        $this->sql = "";
        $sel = new Select($table,$selected,$this);
        return $sel;
    }

    /***
     * @param $table
     * @param $selected
     * @return FuntionTable
     */
    function functionTable($table, $selected)
    {
        Conexao::connetToBd($this);
        $this->listCondition = array();
        $this->listParam = array();
        $this->sql = "";
        $ft = new FuntionTable($table,$selected,$this);
        return $ft;
    }

    public function execute()
    {
        $this->queryName = md5(time().date("d-m-y h:M:s").microtime());
        pg_prepare($this->getCon(), $this->queryName, $this->sql);
        $arrayParam = array_merge($this->listParam,$this->listCondition);
//        echo "sql:: ".$this->sql.json_encode($arrayParam);
        $this->rs = pg_execute($this->getCon(), $this->queryName, $arrayParam);
    }

    function connect($hostName, $userName, $password, $bdName, $port  = 5432)
    {
        $this->con = pg_connect("host=$hostName port=$port dbname=$bdName user=$userName password=$password ");
    }
    
    public function closeConexao(){ pg_close($this->con);  }

    function loadDados($view, $id, $desc)
    {
        $this->selects($view, $id . "," . $desc);
        $this->execute();
        $obg = array();
        while ($valor = $this->getValors()) {
            $obg[count($obg)] = $valor;
        }
        return $obg;
    }

}
