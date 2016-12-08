<?php

/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 10/14/16
 * Time: 12:58 PM
 */
class Select
{
    private $name;
    private $selected;
    private $call;


    /**
     * Select constructor.
     * @param $name
     * @param $selected
     */
    public function __construct($name, $selected,CallPgSQL $call)
    {
        $this->name = $name;
        $this->selected = $selected;

        $call->sql ="SELECT ".$selected." FROM ".$name;
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
    public function finilize($operation, $action = "",...$param)
    {
        $this->call->sql .= " ".$operation." ".$this->arrayToString($param)." ".$action;
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
}