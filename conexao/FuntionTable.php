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

    /**
     * @param $type string
     * @param $value array
     * @return $this FuntionTable
     */
    private function addParamArray($type ,$tv, $value){
        $t = count($value);
        for ($i = 0; $i < $t; $i++) {
            $q = count($this->call->listParam);
            $this->call->listParam[$q] = $value[$i];
            $q = count($this->call->listParam);

            if($i == 0 && ($i+1 == $t) ) {
                if ($q == 1) {
                    $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1). "'{ \"$" . $q."\"}'".$type.")";
                } else {
                    $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1).", '{ \"$" . $q."\"}'".$type.")";
                }
            }
            elseif($i == 0){
                if ($q == 1) {
                    $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1). "'{ \"$" . $q."\"";
                } else {
                    $this->call->sql = substr($this->call->sql, 0, strlen($this->call->sql) - 1).", '{ \"$" . $q."\"";
                }
            }
            elseif ($i > 0 && ($i+1 == $t) ){
                    $this->call->sql .= ",\"$" . $q ."\"}'".$type.")";
            }
            elseif ($i > 0){
                    $this->call->sql .= ",\"$" . $q."\"";
            }
        }
        echo $this->call->sql."\n".json_encode($this->call->listParam);
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

    function addJson($value){
//        $this->addParam(TYPE::JSON, "'".$value."''");
        $this->addParam(TYPE::JSON, $value);
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

    function addIntArray($value){
        $this->addParam(TYPE::INTEGER_ARRAY,$this->arrayToArrayPG($value));
        return $this;
    }

    function addStringArray($value){
        $this->addParam(TYPE::VARCHAR_ARRAY,$this->arrayToArrayPG($value));
        return $this;
    }

    function addDoubleArray($value){
        $this->addParam(TYPE::DOUBLE,$this->arrayToArrayPG($value));
        return $this;
    }

    function addTextArray($value){
        $this->addParam(TYPE::TEXT,$this->arrayToArrayPG($value));
        return $this;
    }

//    function addDateArray($value, $format = "dd-MM-yyyy")
//    {
//        $q = count($this->call->listParam);
//        $this->call->listParam[$q] = $value;
//        $q = count($this->call->listParam);
//        $this->call->listParam[$q] = $format;
//        $q = count($this->call->listParam);
//        if(count($this->call->listParam) == 2)
//        {
//            $this->call->sql.="(to_Date($".($q-1).", $".($q)."))";
//        }else{
//            $this->call->sql= substr($this->call->sql,0,strlen($this->call->sql)-1).", to_Date($".($q-1).", $".($q)."))";
//        }
//        return $this;
//    }

    function addTimeStampArray($value){
        $this->addParam(TYPE::TIMESTAMP_ARRAY,$this->arrayToArrayPG($value));
        return $this;
    }

    function  addNumericArray($value){
        $this->addParam(TYPE::NUMERIC_ARRAY,$this->arrayToArrayPG($value));
        return $this;
    }

    function addCharArray($value){
        $this->addParam(TYPE::CHARACTER_ARRAY,$this->arrayToArrayPG($value));
        return $this;
    }

    function addOtherArray($value){
        $this->addParam("",$this->arrayToArrayPG($value));
        return $this;
    }

//    function addFileArray($file){
//        $value = file_get_contents($file);
//        $filebd = pg_escape_bytea($this->call->getCon(),$value);
//        $this->addParam(TYPE::BYTEA_ARRAY,$filebd);
//        return $this;
//    }

//    function addBoolArray($value){
//        $aux = ($value)? 'true' : 'false';
//        $this->addParam(TYPE::BOOLEAN_ARRAY, $aux);
//        return $this;
//    }

    /**
     * @param $value array
     * @return string
     */
    private function arrayToArrayPG($value){
        $t = count($value);
        $menus = "";
        for ($i =0; $i < $t; $i++ )
        {
            if($i == 0 && ($i+1 == $t) )
                $menus .= "{".$value[$i]."}";
            elseif($i == 0)
                $menus .= "{".$value[$i];
            elseif ($i > 0 && ($i+1 == $t) )
                $menus .= ",".$value[$i]."}";
            elseif ($i > 0)
                $menus .= ",".$value[$i];
        }
        if($menus == ""){ $menus = "{}"; }
        return $menus;
    }

}