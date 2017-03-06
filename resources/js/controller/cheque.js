/**
 * Created by Helcio on 12/20/2016.
 */

$(function () {
    carregarCheques();
    loadChequeData();

    $("#addCheck").click(function () {
        regCheque();
    })

    $("#bt-restaurar-cheque").click(function(){
        restaurarCheque();
    });
    $("#conf-anularCheque").click(function () {
       anularCheque();
    });

    $("#bt-conf-restaurar-cheque").click(function () {

        if(listaChequesRestaurar.length === 2){
            $.ajax({
                url: chequeUrl,
                type:"POST",
                dataType:"json",
                async: false,
                data:{"intention" : "confirmar restauro cheque",
                    "idChequeAnular" : listaChequesRestaurar[0]["ID"],
                    "idChequeRestaurar" : listaChequesRestaurar[1]["ID"]},
                success:function (e) {
                    if(e.result["result"] === "true"){
                        callXpertAlert("Registo de Cheque restaurado com sucesso!", "checkmark", 8000);
                        $(".mp-reset-cheq").fadeOut();
                        carregarCheques();
                        regUserActivity(chequeActivityAdress, -1, "Restaurou um Cheque", -1, LevelActivity.ATUALIZACAO);
                    }
                    else
                        callXpertAlert(e.result["message"], "warning", 8000);
                }
            });
        }
        else{
            $.ajax({
                url: chequeUrl,
                type:"POST",
                dataType:"json",
                async: false,
                data:{"intention" : "confirmar restauro cheque",
                    "idChequeAnular" : listaChequesRestaurar[0]["ID"],
                    "idChequeRestaurar" : "0"},
                success:function (e) {
                    if(e.result["result"] === "true"){
                        callXpertAlert("Registo de Cheque restaurado com sucesso!", "checkmark", 8000);
                        $(".mp-reset-cheq").fadeOut();
                        carregarCheques();
                    }
                    else
                        callXpertAlert(e.result["message"], "warning", 8000);
                }
            });
        }

    });
});

var chequeUrl = "../../bean/AdministracaoBean.php";

var listaCheques = [];
var indiceChequeAnular = undefined;
var listaChequesRestaurar = [];
var chequeActivityAdress = "../../bean/activity.php";
var chequeActivity = undefined;

var Cheque = function(){};
Cheque.prototype.conta = undefined;
Cheque.prototype.agencia = undefined;
Cheque.prototype.sequenciaInicial = undefined;
Cheque.prototype.sequenciaFinal = undefined;
Cheque.prototype.totalCheque = undefined;

function setChequeActivity() {

    chequeActivity = {"Agência" : $("#chequeAgencia :selected").text(), "Conta" : $("#chequeContas :selected").text(),
    "Sequência Inicial" :$("#sequenciaFimCheque").val(), "Sequência Final": $("#sequenciaFimCheque").val(),
    "Total de Cheques" : $("#totalFolhas").val()};
}

function regCheque()
{
    if($("#chequeContas").val() !=='' &&
        ($("#sequenciaInicioCheque").val() !== '' &&
        $("#sequenciaFimCheque").val() !=='' &&
        $("#totalFolhas").val() !==''))
    {
        var cheque = new Cheque();
        cheque.agencia = $("#chequeAgencia").val();
        cheque.conta = $("#chequeContas").val();
        cheque.sequenciaInicial = $("#sequenciaInicioCheque").val();
        cheque.sequenciaFinal =  $("#sequenciaFimCheque").val();
        cheque.totalCheque =  $("#totalFolhas").val();

         setChequeActivity();

        $.ajax({
            url: chequeUrl,
            type:"POST",
            dataType:"json",
            data:{"intention": "registrar cheque", "Cheque" : cheque},
            success:function (e) {
                if(e.result["result"] ==='true')
                {
                    callXpertAlert("Cheque registado com sucesso!", "checkmark", 8000);
                    $('.add-new-admin').find('input, select').val("");
                    $('.add-new-admin').find('input, select').css("border", "");
                    carregarCheques();
                    regUserActivity(chequeActivityAdress, -1, "Registou um novo Cheque", JSON.stringify(chequeActivity), LevelActivity.CRIACAO);
                }
                else
                    callXpertAlert(e.result["message"], "warning", 8000);
            }
        });
    }
}

function loadChequeData() {

    $.ajax({
        url: chequeUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "load cheque data"},
        success:function (e) {
            loadComoBoxIDandValue($("#chequeContas"), e.contas ,"ID", "CONTA");
            loadComoBoxIDandValue($("#chequeAgencia"), e.agencias ,"ID", "NOME");
        }
    });

    regUserActivity(chequeActivityAdress, -1, "Visualizou o menu Cheque", -1, LevelActivity.VISUALIZACAO);
}

function carregarCheques() {

    $.ajax({
        url: chequeUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "load cheque"},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();
        },
        success:function (e) {
            listaCheques = e.result;
            $("#chequesTabela").empty();

            for(var i=0;i<listaCheques.length;i++)
            {   var table = document.getElementById("chequesTabela");
                var row = table.insertRow(table.childElementCount);
                var cheque = e.result[i];
                row.id = i;

                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);
                var column2 = row.insertCell(2);
                var column3 = row.insertCell(3);
                var column4 = row.insertCell(4);
                var column5 = row.insertCell(5);

                column0.innerHTML = '<i class="icon-cancel-circle" onclick=anularChequeIndice('+row.id+')></i>';
                column1.innerHTML = cheque["BANCO"];
                column2.innerHTML = cheque["AGENCIA"];
                column3.innerHTML = cheque["INICIO"];
                column4.innerHTML = cheque["FIM"];
                column5.innerHTML = cheque["TOTAL"];
            }
            tableEstructure($("#table-cheq"));
        }
    });
}

function restaurarCheque()
{
    $("#section-cheque-anular").empty();
    $("#section-cheque-restaurar").empty();
    $.ajax({
        url: chequeUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "restaurar cheque"},
        success:function (e) {
            if(e.result.length === 0){
                callXpertAlert("Não há cheque para restaurar!", "notification", 8000);
            }
            else{
                listaChequesRestaurar = e.result;

                if(listaChequesRestaurar.length === 2){
                    $("#section-cheque-anular").append("" +
                        "<h1>Registo a anular</h1>"+
                        "<nav><b>Banco</b><span>"+listaChequesRestaurar[0]["BANCO"]+"</span></nav>"+
                        "<nav><b>Agência</b><span>"+listaChequesRestaurar[0]["AGENCIA"]+"</span></nav>"+
                        "<nav><b>Seq. Inicio</b><span></span>"+listaChequesRestaurar[0]["INICIO"]+"</nav>"+
                        "<nav><b>Seq. Fim </b> <span>"+listaChequesRestaurar[0]["FIM"]+"</span></nav>");

                    $("#section-cheque-restaurar").append("" +
                        "<h1>Registo a restaurar</h1>"+
                        "<nav><b>Banco</b><span>"+listaChequesRestaurar[1]["BANCO"]+"</span></nav>"+
                        "<nav><b>Agência</b><span>"+listaChequesRestaurar[1]["AGENCIA"]+"</span></nav>"+
                        "<nav><b>Seq. Inicio</b><span></span>"+listaChequesRestaurar[1]["INICIO"]+"</nav>"+
                        "<nav><b>Seq. Fim </b> <span>"+listaChequesRestaurar[1]["FIM"]+"</span></nav>");
                }
                else{
                    $("#section-cheque-anular").append("" +
                        "<h1>Registo a anular</h1>"+
                        "<nav><b>Banco</b><span>"+listaChequesRestaurar[0]["BANCO"]+"</span></nav>"+
                        "<nav><b>Agência</b><span>"+listaChequesRestaurar[0]["AGENCIA"]+"</span></nav>"+
                        "<nav><b>Seq. Inicio</b><span></span>"+listaChequesRestaurar[0]["INICIO"]+"</nav>"+
                        "<nav><b>Seq. Fim </b> <span>"+listaChequesRestaurar[0]["FIM"]+"</span></nav>");
                }

                $(".mp-reset-cheq").fadeIn(300);
            }
        }
    });
}

function anularChequeIndice(id)
{
    indiceChequeAnular = id;
    $(".mp-cancel-cheq").fadeIn();
}

function anularCheque() {

    var anularChequeAtividade = {"Sequência Inicial": listaCheques[indiceChequeAnular]["INICIO"],
        "Sequência Final":  listaCheques[indiceChequeAnular]["FIM"],
    "Total de Cheques": listaCheques[indiceChequeAnular]["TOTAL"]};

    $.ajax({
        url: chequeUrl,
        type:"POST",
        dataType:"json",
        async: false,
        data:{"intention" : "anular cheque",
            "idCheque" : listaCheques[indiceChequeAnular]["ID"]},
        success:function (e) {
            if(e.result["result"] === "true"){
                $(".mp-cancel-cheq").fadeOut();
                callXpertAlert("Cheque anulado com sucesso!", "checkmark", 8000);
                carregarCheques();
                regUserActivity(chequeActivityAdress, -1, "Anulou um Cheque", JSON.stringify(anularChequeAtividade), LevelActivity.DESATIVACAO);

            }
            else
                callXpertAlert(e.result["message"], "warning", 8000);
        }
    });
}