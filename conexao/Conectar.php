<?php

/**
 * Description of Conectar
 *
 * @author Helio
 */
use CallPgSQL as PgSQL;
class Conectar 
{
  
    static function connetToBd(PgSQL $class)
    {
        $class->connect("localhost", "credial", "1234", "credial", "5432");
//        $class->connect("192.168.1.149", "credial", "1234", "credial", "5432");
    }
}
