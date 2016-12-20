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