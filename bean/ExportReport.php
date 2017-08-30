<?php
/**
 * Created by PhpStorm.
 * User: siie
 * Date: 3/31/17
 * Time: 5:12 PM
 */
include "../modelo/ExportExcel.php";
include "../modelo/ExportPDF.php";
include "./utilizador.php";
if ($_POST["intensao"] == "exportExcel") {
    exportExcel();
}if ($_POST["intensao"] == "exportPDF") {
    exportPDF();
}

function exportExcel()
{
    $data = json_decode($_POST["report"], JSON_OBJECT_AS_ARRAY);
    $export = new ExportExcel();
    if ($data["type"] == "rep.cliente") {
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("QUANTIDADE CREDITO", "VALOR")
            ->setListRename("QUANTIDADE CREDITO", "QUANTIDADE")
            ->setListParam(ExportExcel::HIDE, "SURNAME")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cresHomo"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "CLIENT NAME", "CLIENT SURNAME")
            ->setListParamSome("QUANTIDADE ANO", "QUANTIDADE PASSADO", "DIFERENCA")
            ->setListRename("QUANTIDADE ANO", "ANO ATUAL")
            ->setListRename("QUANTIDADE PASSADO", "ANO PASSADO")
            ->setListRename("DIFERENCA", "QUANTIDADE")
            ->setListParam(ExportExcel::HIDE, "CLIENT SURNAME")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.credConc"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("TOTAL PAGAR MONTANTE DIVIDA", "TAEG", "VALOR CREDITO")
            ->setListRename("NUM CREDITO DOSSCIER", "Nº DOSSIER")
            ->setListRename("DATA", "DATA REGISTO")
            ->setListRename("VALOR CREDITO", "VALOR CREDITO")
            ->setListRename("TOTAL PAGAR MONTANTE DIVIDA", "MONTANTE DIVIDA")
            ->setListRename("DATA INICIO", "DATA INICIO")
            ->setListRename("DATA FINALIZAR", "DATA FIM")
            ->setListParam(ExportExcel::HIDE, "ESTADO", "SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cobranca"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("VALOR REEMBOLSO")
            ->setListRename("NUM DOCUMENTO REAL", "Nº DOC. REAl")
            ->setListRename("NUM DOCUMENTO PREVISTO", "Nº DOC PREVISTO")
            ->setListRename("DATA DOCUMENTO REAL", "DATA REAL")
            ->setListRename("DATA DOCUMENTO PREVISTO", "DATA PREVISTA")
            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.capiTAEG"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
//            NIF	NAME	SURNAME	CREDITO STATE	CREDITO VALUE	CREDITO NUM DOSSCIER	CREDITO TOTAL PAGAR MONTANTE DIVIDA	CREDITO TAEG	CREDITO INICIO	CREDITO FINALIZAR
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("CREDITO VALUE", "CREDITO TAEG", "CREDITO TOTAL PAGAR MONTANTE DIVIDA")
            ->setListRename("CREDITO NUM DOSSCIER", "Nº DOSSIER")
            ->setListRename("CREDITO VALUE", "VALOR CREDITO")
            ->setListRename("CREDITO TOTAL PAGAR MONTANTE DIVIDA", "MONTANTE DIVIDA")
            ->setListRename("CREDITO TAEG", "CREDITO TAEG")
            ->setListRename("CREDITO INICIO", "DATA INICIO")
            ->setListRename("CREDITO FINALIZAR", "DATA FIM")
            ->setListParam(ExportExcel::HIDE,"SURNAME" )
            ->setName("Capital - TAEG")
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.diviProd"){///
//        ID	NIF	NAME	SURNAME	CREDITO VALUE SOLICITADO	CREDITO TOTAL PAGAR MONTANTE	CREDITO VALUE PAGO
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("CREDITO VALUE PAGO", "CREDITO TOTAL PAGAR MONTANTE", "CREDITO VALUE SOLICITADO")
            ->setListRename("CREDITO VALUE SOLICITADO", "VALOR CREDITO")
            ->setListRename("CREDITO TOTAL PAGAR MONTANTE", "MONTANTE EM DIVIDA")
            ->setListRename("CREDITO VALUE PAGO", "CREDITO VALOR PAGO")
            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cheques"){///
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
//            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
//            ->setListParamSome("VALOR REEMBOLSO")
//            ->setListRename("NUM DOCUMENTO REAL", "Nº DOC. REAl")
//            ->setListRename("NUM DOCUMENTO PREVISTO", "Nº DOC PREVISTO")
//            ->setListRename("DATA DOCUMENTO REAL", "DATA REAL")
//            ->setListRename("DATA DOCUMENTO PREVISTO", "DATA PREVISTA")
//            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cred_anulado"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("USER", "useranulaname", "useranulasurname")
            ->setJoinParam("CLIENTE", "clientname", "clientsurname")
            ->setListParamSome("creditovalor", "creditoprestacaoe")
            ->setListRename("clientnif","CLIENTE NIF" )
            ->setListRename("creditovalor","VALOR CREDITO")
            ->setListRename("creditoprestacaoe","Nº PRESTAÇAO")
            ->setListRename( "anulaobs","JUSTIFICAÇAO")
            ->setListRename("anuladatanulacao","DT ANULAÇAO")
            ->setHideOther(true)
            ->setListParam(ExportExcel::SHOW, "useranulaname", "clientname", "anuladatanulacao", "anulaobs", "creditoprestacaoe", "clientnif", "creditovalor")
            ->setName($data["name"])
            ->export($data["data"]);
    }
}

function exportPDF() {
    $data = json_decode($_POST["report"], JSON_OBJECT_AS_ARRAY);
    $export = new ExportPDF();
    if ($data["type"] == "rep.cliente") {
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("QUANTIDADE CREDITO", "VALOR")
            ->setListRename("QUANTIDADE CREDITO", "QUANTIDADE")
            ->setListParam(ExportExcel::HIDE, "SURNAME")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cresHomo"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "CLIENT NAME", "CLIENT SURNAME")
            ->setListParamSome("QUANTIDADE ANO", "QUANTIDADE PASSADO", "DIFERENCA")
            ->setListRename("QUANTIDADE ANO", "ANO ATUAL")
            ->setListRename("QUANTIDADE PASSADO", "ANO PASSADO")
            ->setListRename("DIFERENCA", "QUANTIDADE")
            ->setListParam(ExportExcel::HIDE, "CLIENT SURNAME")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.credConc"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("TOTAL PAGAR MONTANTE DIVIDA", "TAEG", "VALOR CREDITO")
            ->setListRename("NUM CREDITO DOSSCIER", "Nº DOSSIER")
            ->setListRename("DATA", "DATA REGISTO")
            ->setListRename("VALOR CREDITO", "VALOR CREDITO")
            ->setListRename("TOTAL PAGAR MONTANTE DIVIDA", "MONTANTE DIVIDA")
            ->setListRename("DATA INICIO", "DATA INICIO")
            ->setListRename("DATA FINALIZAR", "DATA FIM")
            ->setListParam(ExportExcel::HIDE, "ESTADO", "SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cobranca"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("VALOR REEMBOLSO")
            ->setListRename("NUM DOCUMENTO REAL", "Nº DOC. REAl")
            ->setListRename("NUM DOCUMENTO PREVISTO", "Nº DOC PREVISTO")
            ->setListRename("DATA DOCUMENTO REAL", "DATA REAL")
            ->setListRename("DATA DOCUMENTO PREVISTO", "DATA PREVISTA")
            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.capiTAEG"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
//            NIF	NAME	SURNAME	CREDITO STATE	CREDITO VALUE	CREDITO NUM DOSSCIER	CREDITO TOTAL PAGAR MONTANTE DIVIDA	CREDITO TAEG	CREDITO INICIO	CREDITO FINALIZAR
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("CREDITO VALUE", "CREDITO TAEG", "CREDITO TOTAL PAGAR MONTANTE DIVIDA")
            ->setListRename("CREDITO NUM DOSSCIER", "Nº DOSSIER")
            ->setListRename("CREDITO VALUE", "VALOR CREDITO")
            ->setListRename("CREDITO TOTAL PAGAR MONTANTE DIVIDA", "MONTANTE DIVIDA")
            ->setListRename("CREDITO TAEG", "CREDITO TAEG")
            ->setListRename("CREDITO INICIO", "DATA INICIO")
            ->setListRename("CREDITO FINALIZAR", "DATA FIM")
            ->setListParam(ExportExcel::HIDE,"SURNAME" )
            ->setName("Capital - TAEG")
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.diviProd"){///
//        ID	NIF	NAME	SURNAME	CREDITO VALUE SOLICITADO	CREDITO TOTAL PAGAR MONTANTE	CREDITO VALUE PAGO
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
            ->setListParamSome("CREDITO VALUE PAGO", "CREDITO TOTAL PAGAR MONTANTE", "CREDITO VALUE SOLICITADO")
            ->setListRename("CREDITO VALUE SOLICITADO", "VALOR CREDITO")
            ->setListRename("CREDITO TOTAL PAGAR MONTANTE", "MONTANTE EM DIVIDA")
            ->setListRename("CREDITO VALUE PAGO", "CREDITO VALOR PAGO")
            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cheques"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
//            ->setJoinParam("CLIENTE", "NAME", "SURNAME")
//            ->setListParamSome("VALOR REEMBOLSO")
//            ->setListRename("NUM DOCUMENTO REAL", "Nº DOC. REAl")
//            ->setListRename("NUM DOCUMENTO PREVISTO", "Nº DOC PREVISTO")
//            ->setListRename("DATA DOCUMENTO REAL", "DATA REAL")
//            ->setListRename("DATA DOCUMENTO PREVISTO", "DATA PREVISTA")
//            ->setListParam(ExportExcel::HIDE,"SURNAME", "ID" )
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cred_anulado") {
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("USER", "useranulaname", "useranulasurname")
            ->setJoinParam("CLIENTE", "clientname", "clientsurname")
            ->setListParamSome("creditovalor", "creditoprestacaoe")
            ->setListRename("clientnif", "CLIENTE NIF")
            ->setListRename("creditovalor", "VALOR CREDITO")
            ->setListRename("creditoprestacaoe", "Nº PRESTAÇAO")
            ->setListRename("anulaobs", "JUSTIFICAÇAO")
            ->setListRename("anuladatanulacao", "DT ANULAÇAO")
            ->setHideOther(true)
            ->setListParam(ExportExcel::SHOW, "useranulaname", "clientname", "anuladatanulacao", "anulaobs", "creditoprestacaoe", "clientnif", "creditovalor")
            ->setName($data["name"])
            ->export($data["data"]);
    }
}