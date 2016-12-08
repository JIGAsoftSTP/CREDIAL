<?php
include_once "TYPE.php";
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 10/14/16
 * Time: 7:50 PM
 */
class FuntionTable
{
    private $name;
    private $selected;
    private $call;

    /**
     * FuntionTable constructor.
     * @param $name
     * @param $selected
     * @param $call
     */
    public function __construct($name, $selected,CallPgSQL $call)
    {
        $this->name = $name;
        $this->selected = $selected;

        $call->sql ="SELECT ".$selected." FROM ".$name."()";
        $this->call = $call;
    }

    /**
     * @param $param
     * @param $value
     * @param $condition
     * @param null $join
     * @return $this
     */
    public function addCodition($param, $value, $condition, $join =null){
        $q = count($this->call->listCondition);
        $this->call->listCondition[$q] = $value;
        $q = count($this->call->listCondition);
        $this->call->sql .= (($join == null) ? " where " : " " .$join." " ). $param." ".$condition." $".$q;
        return $this;
    }

    /***
     * @param $operation
     * @param string $action
     * @param array ...$param
     */
    public function finilize($operation, $action = "",...$param){
        $this->call->sql .= $operation." ".$this->arrayToString($param)." ".$action;
    }

    /***
     * @param array $value
     * @return string
     */
    private function arrayToString(array $value){
        $str = "";
        foreach ($value as $val){
            $str .= (($str == "") ? $val : ", ".$val );
        }
        return $str;
    }

    private function addParam($type ,$value){
        $q = count($this->call->listParam);
        $this->call->listParam[$q] = $value;
        $q = count($this->call->listParam);
        if ($q == 1) {
            $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1) . "$" . $q . $type . ")";
        } else {
            $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1) . ", $" . $q . $type . ")";
        }
        return $this;
    }

    function addInt($value){
        $this->addParam(TYPE::INTEGER,$value);
        return $this;
    }

    function addString($value){
        $this->addParam(TYPE::VARCHAR,$value);
        return $this;
    }

    function addDouble($value){
        $this->addParam(TYPE::DOUBLE,$value);
        return $this;
    }

    function addText($value){
        $this->addParam(TYPE::TEXT,$value);
        return $this;
    }

    function addDate($value, $format = "dd-MM-yyyy")
    {
        $q = count($this->call->listParam);
        $this->call->listParam[$q] = $value;
        $q = count($this->call->listParam);
        $this->call->listParam[$q] = $format;
        $q = count($this->call->listParam);
        if(count($this->call->listParam) == 2)
        {
            $this->call->sql.="(to_Date($".($q-1).", $".($q)."))";
        }else{
            $this->call->sql= substr($this->call->sql,0,strlen($this->call->sql)-1).", to_Date($".($q-1).", $".($q)."))";
        }
        return $this;
    }

    function addTimeStamp($value){
        $this->addParam(TYPE::TIMESTAMP,$value);
        return $this;
    }

    function  addNumeric($value){
        $this->addParam(TYPE::NUMERIC,$value);
        return $this;
    }

    function addChar($value){
        $this->addParam(TYPE::CHARACTER,$value);
        return $this;
    }

    function addOther($value){
        $this->addParam("",$value);
        return $this;
    }

    function addFile($file){
        $value = file_get_contents($file);
        $filebd = pg_escape_bytea($this->call->getCon(),$value);
        $this->addParam(TYPE::BYTEA,$filebd);
        return $this;
    }

    function addBool($value){
        $aux = ($value)? 'true' : 'false';
        $this->addParam(TYPE::BOOLEAN, $aux);
        return $this;
    }

}