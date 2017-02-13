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
//        $class->connect("192.168.137.1", "credial", "1234", "credial", "5432");
       $class->connect("localhost", "credial", "1234", "credial", "5432");
//       $class->connect("10.42.0.1", "credial", "1234", "credial", "5432");
   //     $class->connect("192.168.137.207", "credial", "1234", "credial", "5432");
 //        $class->connect("192.168.137.145", "credial", "1234", "credial", "5432");
//        $class->connect("192.168.2.196", "credial", "1234", "credial", "5432");
//        $class->connect("192.168.1.150", "credial", "1234", "credial", "5432");
    }
}
