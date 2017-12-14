<?php

/**
 * Description of Conectar
 *
 * @author Helio
 */
use CallPgSQL as PgSQL;
class Conectar{
    static function connetToBd(PgSQL $class){
       $class->connect("192.0.3.114", "credial", "1234", "credial", "5432");
    }
}
