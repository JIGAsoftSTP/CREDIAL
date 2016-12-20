/**
 * Created by Helcio on 12/20/2016.
 */

$(function () {

    loadChequeData();
    $("#addCheck").click(function () {
        regCheque();
    })
});

var chequeUrl = "../../bean/AdministracaoBean.php";

var listaCheques = [];
var Cheque = function(){};
Cheque.prototype.conta = undefined;
Cheque.prototype.agencia = undefined;
Cheque.prototype.sequenciaInicial = undefined;
Cheque.prototype.sequenciaFinal = undefined;
Cheque.prototype.totalCheque = undefined;


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

        $.ajax({
            url: chequeUrl,
            type:"POST",
            dataType:"json",
            data:{"intention": "registrar cheque", "Cheque" : cheque},
            success:function (e) {
                if(e.result["RESULT"] ==='true')
                {
                    callXpertAlert("Cheque registado com sucesso!", "checkmark", 8000);
                    $('.add-new-admin').find('input, select').val("");
                    $('.add-new-admin').find('input, select').css("border", "");
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
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
}

function carregarCheques() {
    $.ajax({
        url: chequeUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "load cheque"},
        success:function (e) {
            listaCheques = e.result;
            $("#chequesTabela").empty();

            for(var i=0;i<listaCheques.length;i++)
            {   var table = document.getElementById("chequesTabela");
                var row = table.insertRow(table.childElementCount);
                var cheque = e.result[i];
                row.id = i;

                row.onclick = function () {
                    (this).addClass('selected') .siblings().removeClass('selected');
                };

                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);
                var column2 = row.insertCell(2);
                var column3 = row.insertCell(3);
                var column4 = row.insertCell(4);
                var column5 = row.insertCell(5);

                column0.innerHTML = cheque["DATA"];
                column1.innerHTML = cheque["BANCO"];
                column2.innerHTML = cheque["AGENCIA"];
                column3.innerHTML = cheque["INICIO"];
                column4.innerHTML = cheque["FIM"];
                column5.innerHTML = cheque["FIM"];
            }
            tableEstructure($("#table-bank"));
        }
    });
}