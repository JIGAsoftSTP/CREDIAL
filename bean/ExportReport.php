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
    session_start();
    $data = json_decode($_POST["report"], JSON_OBJECT_AS_ARRAY);
    $data["data"] = $_SESSION["report"];
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
    else if($data["type"] == "rep.cabaz"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "dos_name", "dos_surname")
            ->setListParamSome(
                "num_contrato",
                "total_taeg_contato_pago",
                "total_taeg",
                "total_capital_pago",
                "total_capital_inicial",
                "num_contrato_vencido_nao_pago",
                "num_contrato_pago_tardio",
                "num_contrato_nao_pago",
                "num_contrato_pago")
            ->setListRename("dos_nif","CLIENTE NIF" )
            ->setListRename("dos_name","CLIENTE")
            ->setListRename("num_contrato","CONTRATOS")
            ->setListRename("num_contrato_pago","CONTRATO PAGO")
            ->setListRename("num_contrato_nao_pago","CONTRATO NÃO PAGO")
            ->setListRename("num_contrato_vencido_nao_pago","CONTRATO NÃO VENCIDO")
            ->setListRename("num_contrato_pago_tardio","CONTRATO PAGO TARDIO")
            ->setListRename("total_capital_inicial","CAPITAL INICIAL")
            ->setListRename("total_capital_pago","CAPITAL PAGO")
            ->setListRename("total_taeg","TEAG")
            ->setListRename("hisdos_mail","EMAIL")
            ->setListRename("hisdos_telefone","TELEMOVEL")
            ->setListRename("hisdos_telfixo","TELEFONE")
            ->setListRename("hisdos_telservico","TELEFONE SERVIÇO")
            ->setListParam(ExportExcel::HIDE, "more", "dos_surname", "dos_numdos")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.antecipado"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "clientname", "clientsurname")
            ->setListParamSome("creditovalor", "creditoprestacaoe")
            ->setListRename("clientnif","CLIENTE NIF" )
            ->setListRename("creditocheque","CHEQUE")
            ->setListRename("tipocreditodesc","T. CREDITO")
            ->setListRename("creditonumero","Nº CREDITO")
            ->setListRename( "creditovalorpedido","VALOR PEDIDO")
            ->setListRename("creditoreebolsoinicial","REEBOLSO INICIAL")
            ->setListRename("creditoreebolsoanticipado","REEBOLSO ANTICIPADO")
            ->setListRename("creditotaeginicial","TEAG INICIAL")
            ->setListRename("creditotaeganticiapado","TEAG ANTICIPADO")
            ->setListRename("creditodatafim","D. FIM C.")
            ->setListRename("creditodatafimanticipado","D. FIM C. ANTICIPADO")
            ->setListRename("creditodatafinalizarinicial","D. FIM C. INICIAL")
            ->setListParam(ExportPDF::HIDE, "tipocreditoid", "more", "creditoid" , "clientsurname")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.notifcredito"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "clientname", "clientsurname")
            /*->setListParamSome("creditovalor", "creditoprestacaoe")
            ->setListRename("clientnif","CLIENTE NIF" )
            ->setListRename("creditocheque","CHEQUE")
            ->setListRename("tipocreditodesc","T. CREDITO")
            ->setListRename("creditonumero","Nº CREDITO")
            ->setListRename( "creditovalorpedido","VALOR PEDIDO")
            ->setListRename("creditoreebolsoinicial","REEBOLSO INICIAL")
            ->setListRename("creditoreebolsoanticipado","REEBOLSO ANTICIPADO")
            ->setListRename("creditotaeginicial","TEAG INICIAL")
            ->setListRename("creditotaeganticiapado","TEAG ANTICIPADO")
            ->setListRename("creditodatafim","D. FIM C.")
            ->setListRename("creditodatafimanticipado","D. FIM C. ANTICIPADO")
            ->setListRename("creditodatafinalizarinicial","D. FIM C. INICIAL")*/
            ->setListParam(ExportPDF::HIDE, "tipocreditoid", "more", "creditoid" , "clientsurname")
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
            ->setListParam(ExportPDF::HIDE, "SURNAME")
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
            ->setListParam(ExportPDF::HIDE, "CLIENT SURNAME")
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
            ->setListParam(ExportPDF::HIDE, "ESTADO", "SURNAME", "ID" )
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
            ->setListParam(ExportPDF::HIDE,"SURNAME", "ID" )
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
            ->setListParam(ExportPDF::HIDE,"SURNAME" )
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
            ->setListParam(ExportPDF::HIDE,"SURNAME", "ID" )
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
            ->setListParam(ExportPDF::SHOW, "useranulaname", "clientname", "anuladatanulacao", "anulaobs", "creditoprestacaoe", "clientnif", "creditovalor")
            ->setName($data["name"])
            ->export($data["data"]);
    }
    else if($data["type"] == "rep.cabaz"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "dos_name", "dos_surname")
            ->setListParamSome(
                "num_contrato",
                "total_taeg_contato_pago",
                "total_taeg",
                "total_capital_pago",
                "total_capital_inicial",
                "num_contrato_vencido_nao_pago",
                "num_contrato_pago_tardio",
                "num_contrato_nao_pago",
                "num_contrato_pago")
            ->setListRename("dos_nif","CLIENTE NIF" )
            ->setListRename("dos_name","CLIENTE")
            ->setListRename("num_contrato","CONTRATOS")
            ->setListRename("num_contrato_pago","CONTRATO PAGO")
            ->setListRename("num_contrato_nao_pago","CONTRATO NÃO PAGO")
            ->setListRename("num_contrato_vencido_nao_pago","CONTRATO NÃO VENCIDO")
            ->setListRename("num_contrato_pago_tardio","CONTRATO PAGO TARDIO")
            ->setListRename("total_capital_inicial","CAPITAL INICIAL")
            ->setListRename("total_capital_pago","CAPITAL PAGO")
            ->setListRename("total_taeg","TEAG")
            ->setListRename("hisdos_mail","EMAIL")
            ->setListRename("hisdos_telefone","TELEMOVEL")
            ->setListRename("hisdos_telfixo","TELEFONE")
            ->setListRename("hisdos_telservico","TELEFONE SERVIÇO")
            ->setListParam(ExportPDF::HIDE, "more", "dos_surname", "dos_numdos")
            ->setName($data["name"])
            ->export($data["data"]);
    }else if($data["type"] == "rep.antecipado"){
        $export->setUser(Session::getUserLogado()->getNome() . " " . Session::getUserLogado()->getApelido())
            ->setJoinParam("CLIENTE", "clientname", "clientsurname")
            ->setListParamSome("creditovalor", "creditoprestacaoe")
            ->setListRename("clientnif","CLIENTE NIF" )
            ->setListRename("creditocheque","CHEQUE")
            ->setListRename("tipocreditodesc","T. CREDITO")
            ->setListRename("creditonumero","Nº CREDITO")
            ->setListRename( "creditovalorpedido","VALOR PEDIDO")
            ->setListRename("creditoreebolsoinicial","REEBOLSO INICIAL")
            ->setListRename("creditoreebolsoanticipado","REEBOLSO ANTICIPADO")
            ->setListRename("creditotaeginicial","TEAG INICIAL")
            ->setListRename("creditotaeganticiapado","TEAG ANTICIPADO")
            ->setListRename("creditodatafim","D. FIM C.")
            ->setListRename("creditodatafimanticipado","D. FIM C. ANTICIPADO")
            ->setListRename("creditodatafinalizarinicial","D. FIM C. INICIAL")
            ->setListParam(ExportPDF::HIDE, "tipocreditoid", "more", "creditoid" , "clientsurname")
            ->setName($data["name"])
            ->export($data["data"]);
    }
}