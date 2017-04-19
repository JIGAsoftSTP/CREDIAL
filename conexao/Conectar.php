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

       $class->connect("siie.st", "credial", "1234", "credial", "5432");



   //     $class->connect("192.168.137.207", "credial", "1234", "credial", "5432");
 //        $class->connect("192.168.137.145", "credial", "1234", "credial", "5432");
//        $class->connect("192.168.2.196", "credial", "1234", "credial", "5432");
//        $class->connect("siievirtual3-pc", "credial", "1234", "credial", "5432");
    }
}
