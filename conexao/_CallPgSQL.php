<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include "Conectar.php";
use Conectar as  Conexao;
/**
 * Description of _CallPgSQL
 *
 * @author AhmedJorge
 */
class _CallPgSQL {
    private static $sql;
    private static $rs;
    private static $numRow;
    private static $valors;
    public static $con;
    const FUNC =1;
    const PRC =2;
    const SELE =3;
    private static $queryType;
    private static $queryName;
    private static $i = 1;


    function __construct() {
        header('Content-type: text/html; charset=UTF-8');
        _CallPgSQL::$con = new Conexao();
    }

    /**
     * (PHP 4, PHP 5)<br/>
     * @return String contêm os valores do requisição feita para a <b>BD</b>
     * @example <b>1º</b> _CallPgSQL::getSql() Exemplo "select * from nameTable"
     *  @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function getSql() {
        return _CallPgSQL::$sql;
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @return QUERY contêm os valores do requisição feita para a <b>BD</b>
     * @example <b>1º</b> _CallPgSQL::getRs()
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function getRs() {
        return _CallPgSQL::$rs;
    }

    /**
     * (PHP 4, PHP 5)<br/>
     * @return INTEGER retorna o numero de linha da selecão
     * @example <b>1º</b> _CallPgSQL::getNumRow()
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function getNumRow() {
        return pg_num_rows(_CallPgSQL::$rs);
    }
      
    /**
     * (PHP 4, PHP 5)<br/>
     * @return Connection retorna conexao
     * @example <b>1º</b> _CallPgSQL::getCon()
     * @author JIGAsoft <jigasoft_stp@hotmail.com>
     */
    static function getCon() {
        return _CallPgSQL::$con;
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @return array retorna um array
     * @example <b>1º</b> _CallPgSQL::getValors()[0]
     * @example <b>1º</b> _CallPgSQL::getValors()["NAME"]
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function getValors() {
        return pg_fetch_array(_CallPgSQL::$rs,NULL,PGSQL_ASSOC);
    }

    /**
     * (PHP 4, PHP 5)<br/>
     * @param $procedureName - o nome da funcão a ser usada
     * @param $listParam - array com os valores a ser enviados
     * @example <b>1º</b> _CallPgSQL::simplesProcedure("nameProcedure",NULL);
     * @example <b>2º</b> _CallPgSQL::simplesProcedure("nameProcedure",array());
     * @example <b>3º</b> _CallPgSQL::simplesProcedure("nameProcedure",array($param1,$param2,$param3,$param4));
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     * @deprecated
     */
    private static function simplesProcedure($procedureName, array $listParam = array()) {
        _CallPgSQL::$queryType = Query::PRC;
        _CallPgSQL::procedureOrFuncion($procedureName, $listParam, "call");
        _CallPgSQL::executeQurey($listParam, array());
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @param $funcionName - o nome da funcão a ser usada
     * @param $listParam - array com os valores a ser enviados
     * @example <b>1º</b> _CallPgSQL::simplesFuncion("nameFuncion",NULL);
     * @example <b>2º</b> _CallPgSQL::simplesFuncion("nameFuncion",array());
     * @example <b>3º</b> _CallPgSQL::simplesFuncion("nameFuncion",array($param1,$param2,$param3,$param4));
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    public static function simplesFuncion($funcionName, array $listParam = array()) {
        _CallPgSQL::procedureOrFuncion($funcionName, $listParam, "select");
        _CallPgSQL::executeQurey($listParam, array());
    }
    
    /**
     * (PHP 4, PHP 5)<br/>
     * @param $tableNameOrView - o nome da Table or Veiw a ser usada
     * @param $selectValor - parametos da View or Table a ser Visualisado
     * @param $condicion - condicão a aplicar a Table or View
     * @example <b>1º</b> _CallPgSQL::simplesSelect("nameViewOrTable","*");
     * @example <b>2º</b> _CallPgSQL::simplesSelect("nameViewOrTable","$param1,$param2,$param3",array("$param4;>","40"));
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function simplesSelect($tableNameOrView,$selectValor,array $condicion = array())
    {
        _CallPgSQL::$queryType = _CallPgSQL::SELE;
        if ($condicion == array()) {
            _CallPgSQL::$sql = "select " . $selectValor . " from " . $tableNameOrView;
        } else {
            _CallPgSQL::$sql = "SELECT " . $selectValor . " FROM " .$tableNameOrView." WHERE ". _CallPgSQL::addCondicion($condicion);
        }
        _CallPgSQL::executeQurey(array(), $condicion);
    }
    /**
     * (PHP 4, PHP 5)<br/>
     * @param $tableNameOrView - o nome da Table or Veiw a ser usada
     * @param $selectValor - parametos da View or Table a ser Visualisado
     * @param $listParam - array com os valores a ser enviados
     * @param $condicion - condicão a aplicar a Table or View
     * @example <b>1º</b> _CallPgSQL::functionTable("nameViewOrTable","*");
     * @example <b>2º</b> _CallPgSQL::functionTable("nameViewOrTable","*",array($param1,$param2,$param3,$param4));
     * @example <b>3º</b> _CallPgSQL::functionTable("nameViewOrTable","*",array($param1,$param2,$param3,$param4),array("param1;>" => "40"));
     * @example <b>4º</b> _CallPgSQL::functionTable("nameViewOrTable","*",array($param1,$param2,$param3),array("$param1;>" => "40"));
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    static function functionTable($tableNameOrView, $selectValor, array $listParam = array(), array $condicion = array())
    {
        _CallPgSQL::$queryType = _CallPgSQL::SELE;
        if ($condicion == array()) 
        {
            _CallPgSQL::$sql = "select ". $selectValor." from " ._CallPgSQL::addParam($tableNameOrView, $listParam);
        } 
        else 
        {
            _CallPgSQL::$sql = "select ". $selectValor. " from " ._CallPgSQL::addParam($tableNameOrView, $listParam). " where ". _CallPgSQL::addCondicion($condicion);
        }
        _CallPgSQL::executeQurey($listParam,$condicion);
    }
    
    /**
     *(PHP 4, PHP 5)<br/>
     * @param $funcionName - o nome da funcão a ser usada
     * @param $listParam - array com os valores a ser enviados
     * @param $types  - funcao ou procedimento select or call
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    private static function procedureOrFuncion($funcionName, array $listParam, $types) {
        _CallPgSQL::$sql = _CallPgSQL::addParam($types . " " . $funcionName, $listParam);
    }
//
    /**
     * (PHP 4, PHP 5)<br/>
     * @example _CallPgSQL::executeQurey();
     * @author JIGAsoft STP <jigasoft_stp@hotmail.com>
     */
    private static function executeQurey(array $listParam, array $condicion)
    {
        _CallPgSQL::$queryName = md5(time().date("d-m-y h:M:s").microtime());
        Conexao::connetToBd();

        pg_prepare(_CallPgSQL::getCon(), _CallPgSQL::$queryName, _CallPgSQL::$sql);
//        _CallPgSQL::$rs = pg_query(_CallPgSQL::$sql);
        $arrayParam = array_merge($listParam,$condicion);
//        echo _CallPgSQL::$sql."\n".json_encode($arrayParam);
        _CallPgSQL::$rs = pg_execute(_CallPgSQL::getCon(), _CallPgSQL::$queryName, $arrayParam);
    }
    
    private static function addParam($sql, array $listParam = NULL)
    {
        _CallPgSQL::$i = 1;
        if ($listParam != NULL || count($listParam)!=0) 
        {
            $k = count($listParam);
            foreach ($listParam as $value) {
                if (_CallPgSQL::$i == 1 && _CallPgSQL::$i != (int) $k) {$sql .= "( $" . _CallPgSQL::$i . "";}
                elseif (_CallPgSQL::$i == 1 && _CallPgSQL::$i == (int) $k) {$sql .= "( $" . _CallPgSQL::$i . ""._CallPgSQL::terminoQuery();}
                elseif (_CallPgSQL::$i == (int) $k) {$sql .= ", $" . _CallPgSQL::$i ._CallPgSQL::terminoQuery();}
                else {$sql.= ", $" . _CallPgSQL::$i . "";}
                _CallPgSQL::$i++;
            }
        } else {$sql .="("._CallPgSQL::terminoQuery();}
        return $sql;
    }
    
    private static function terminoQuery()
    {
        return ")";
    }
    
    static function toDateSQL($Date, $format = "DD-MM-YYYY")
    {
        return $Date;
    }
    
    static function toVarchar($value)
    {
        return $value;
    }
    
//    private static function valideValue($value)
//    {
//        if(strpos($value, 'to_Date(')!==FALSE)
//            return $value;
//        elseif(is_numeric($value))
//            return $value;
//        elseif( $value==NULL )
//            return "NULL";
//        else
//        {return $value;}
//    }
    /**
     * 
     * @param type $dataInicial
     * @param type $dataFinal
     * @return type válido se a data final for superior a inicial
     */
    static function compararDatas($dataInicial, $dataFinal)
    {
   
        if(strtotime($dataFinal)>  strtotime($dataInicial))
            return "válido";
        else
            return "inválido";
    }
    
    static function Connect($hostName, $userName, $password, $bdName, $port  = 5432) 
    {
        //header('Content-type: text/html; charset=UTF-8');
        _CallPgSQL::$con = pg_connect("host=$hostName port=$port dbname=$bdName user=$userName password=$password ");
    }
    
    public static function closeConexao()
    {
        pg_close(_CallPgSQL::$con);
    }
    
    static function loadComboBox($tableView, $id, $descricao)
    {
        _CallPgSQL::simplesSelect($tableView, "*");
        echo "<option value=''>"."(Selecione)"."</option>";
        while ($linha=  _CallPgSQL::getValors())
        {
            echo "<option value='$linha[$id]'>".$linha[$descricao]."</option>";
        }
        _CallPgSQL::closeConexao();
    }
    
    /**
     * VEERIFICA-SE UM DETERMINADO VALOR JÁ EXISTE NA BASE DE DADDOS.
     * RETORNA 1 SE EXISTE E 0 CASO CONTRÁRIO
     * @param type $tableView
     * @param type $field
     * @param type $value
     * @return type
     */
    static function existValue($tableView,$field,$value)
    {
        _CallPgSQL::simplesSelect($tableView, "\"$field\"", array($field => $value));
        return _CallPgSQL::getNumRow();
    }
    
    private static function addCondicion(array $condicion)
    {
        $cond = "";
        $f = 1;
        foreach ($condicion as $key => $value) {
            $keyOrAnd = explode(";", $key);
            if($f == 1)
            { $cond .= "UPPER(\"".$keyOrAnd[0]."\"::CHARACTER VARYING) ".((isset($keyOrAnd[1])) ? $keyOrAnd[1] : "=" ).(( isset($keyOrAnd[1]) && strtoupper($keyOrAnd[1]) == "LIKE") ? " Upper(" : " ")."$"._CallPgSQL::$i.(( isset($keyOrAnd[1]) && strtoupper($keyOrAnd[1]) == "LIKE") ? ")" : ""); }
            else
            { $cond .= ((isset($keyOrAnd[1])) ? " ".$keyOrAnd[1] : " AND" )." UPPER(\"".$keyOrAnd[0]."\"::CHARACTER VARYING) ".((isset($keyOrAnd[2])) ? $keyOrAnd[2] : "=" ).(( isset($keyOrAnd[2]) && strtoupper($keyOrAnd[2]) == "LIKE") ? " Upper(" : " ")."$"._CallPgSQL::$i.(( isset($keyOrAnd[2]) && strtoupper($keyOrAnd[2]) == "LIKE") ? ")" : ""); }
            $f = 2;
            _CallPgSQL::$i++;
        }
        return $cond;
    }

    const typeFuncTable = "FuncTable";
    const typeSelect = "Select";

    public static function superShearch($veiwName, $valueShearch, array $array, $type = "Select",array $listParam = array()) {
        $listShearch = array();
        $i = 1;
        foreach ($array as $key => $value) {
            if ($i == 1) {
                $listShearch[ $key . ";like"]  = "%" . $valueShearch . "%";
            } else {
                $listShearch[ $key .";or;like"] = "%" . $valueShearch . "%";
            }
            $i = 2;
        }

        if (PrintTable::typeFuncTable == $type) {
            _CallPgSQL::functionTable ( $veiwName, "*", $listParam, $listShearch);
        } else if (PrintTable::typeSelect == $type) {
            _CallPgSQL::simplesSelect($veiwName, "*", $listShearch);
        }

//        echo _CallPgSQL::getSql();
    }

    public static function dateYYYYMMdd($dt,$format = "Y-m-d"){
        return date_create_from_format($format,date($dt));
    }

}
