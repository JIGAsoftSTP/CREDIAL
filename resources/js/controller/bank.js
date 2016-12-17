/**
 * Created by Helcio on 12/17/2016.
 */
$(function(){
    loadBankData();
});

var bankAddress = "../../bean/AdministracaoBean.php";


var Movimentation = function () {};
Movimentation.prototype.bankFrom;
Movimentation.prototype.bankTo;
Movimentation.prototype.value;
Movimentation.prototype.desc;

var Banco = function(){};
Banco.prototype.sigla;
Banco.prototype.nome;

var DebitCredit = function(){};
DebitCredit.prototype.numDoc;
DebitCredit.prototype.value;
DebitCredit.prototype.bank;
DebitCredit.prototype.typeOperation;


function loadBankData()
{
    $.ajax({
       url : bankAddress,
        type:"POST",
        dataType:"json",
        data:{"intention" : "bank data"},
        success:function (param) {
            loadComoBoxIDandValue($(".listBanks"), param.banks ,"ID", "NAME");
        }
    });
}
function carregarSiglas()
{
    $.ajax
    ({
        url: bankAddress,
        type:"POST",
        dataType:"json",
        data:{"intention": "siglas"},
        success:function (e)
        {
            banks = e.siglas;
            $(".siglas").append('<li class="active">'+e.siglas[0]["SIGLA"]+'</li>');
            loadBankMoviment(0);
            for(var i = 1;i<e.siglas.length;i++)
            {
                $(".siglas").append('<li onclick=loadBankMoviment('+i+')>'+e.siglas[i]["SIGLA"]+'</li>');
            }
        }
    });
}

function loadBankMoviment(position)
{

    $.ajax
    ({
        url: bankAddress,
        type:"POST",
        dataType:"json",
        data:{"intention": "bank moviment", "bank" : banks[position]["ID"] },
        success:function (e)
        {
            $("#bankMovimentName").html(banks[position]["NAME"]);
            $("#tablebankmoviments").empty();

            for(var i=0;i<e.result.length;i++)
            {   var table = document.getElementById("tableBankMoviments");
                var row = table.insertRow(table.childElementCount);
                var moviments = e.result[i];
                row.id = i;

                row.onclick = function () {
                    (this).addClass('selected') .siblings().removeClass('selected');
                };

                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);
                var column2 = row.insertCell(2);
                var column3 = row.insertCell(3);

                column0.innerHTML = moviments["DATA"];
                column1.innerHTML = moviments["DEBITO"];
                column2.innerHTML = moviments["CREDITO"];
                column3.innerHTML = moviments["LIBELE"];
            }
            tableEstructure($("#table-bank"));
        }
    });
}

function bankTransfer() {

    if($("#bankMovimentFrom").val() !=='' &&
        $("#bankMovimentTo").val() !== '' &&
        $("#movimentValue").val() !=='' && $("#movimentDesc").val() !=='')
    {
        movimentation.bankFrom = $("#bankMovimentFrom").val();
        movimentation.bankTo = $("#bankMovimentTo").val();
        movimentation.value = unformatted($("#movimentValue").val());
        movimentation.desc = $("#movimentDesc").val();

        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention" : "add movimentation", "Movimentation":movimentation},
            success:function (e) {
                console.log(e.result["RESULT"]);
                if(e.result["RESULT"] ==='true')
                {
                    $('.add-new-admin').find('input, select, textarea').val("");
                    $('.add-new-admin').find('input, select, textarea').css("border", "");
                    callXpertAlert("Movimentação bancária efetuada com sucesso.", "chemark", 8000);
                }
                else
                    callXpertAlert(e.result["MESSAGE"], 'warning', 8000);
            }
        });
    }
}

function makeCreditDebit() {

    if(debitCreditCheckFields() === true)
    {
        debitCredit.numDoc = $("#debitCreditDoc").val();
        debitCredit.value = unformatted($("#debitCreditValue").val());
        debitCredit.bank = $("#debitCreditBank").val();
        debitCredit.typeOperation = $(".bar .text").html();

        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention" : "make debit or credit", "DebitCredit" :debitCredit},
            success:function(e)
            {
                if(e.result["RESULT"] ==='true')
                {
                    callXpertAlert("Operação efetuada com sucesso.", "checkmark", 8000);
                    $('.debitCreditField').val("");
                    $('.debitCreditField').css("border", "");
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

function regCheque()
{
    if($("#chequeBanco").val() !=='' &&
        ($("#chequeAgencia").val() !=='' &&
        ($("#sequenciaInicioCheque").val() !== '' &&
        $("#sequenciaFimCheque").val() !=='' &&
        $("#totalFolhas").val() !=='')))
    {
        cheque.banco = $("#chequeBanco").val();
        cheque.agencia = $("#chequeAgencia").val();
        cheque.sequenciaInicial = $("#sequenciaInicioCheque").val();
        cheque.sequenciaFinal =  $("#sequenciaFimCheque").val();
        cheque.totalCheque =  $("#totalFolhas").val();

        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention": "registrar cheque", "Cheque": cheque},
            success:function (e) {
                if(e.result["RESULT"] ==='true')
                {
                    callXpertAlert("Cheque adicionado com sucesso.", "checkmark", 8000);
                    $('.add-new-admin').find('input, select').val("");
                    $('.add-new-admin').find('input, select').css("border", "");
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

function debitCreditCheckFields()
{

    if($("#debitCreditDoc").val() ==='')
    {
        $("#debitCreditDoc").addClass('empty');
        return false;
    }
    else
    {
        $("#debitCreditDoc").removeClass('empty');
        if($("#debitCreditValue").val() === '')
        {
            $("#debitCreditValue").addClass('empty');
            return false;
        }
        else {
            $("#debitCreditValue").removeClass('empty');
            if($("#debitCreditBank").val() === '')
            {
                $("#debitCreditBank").addClass('empty');
                return false;
            }
            else
            {
                $("#debitCreditBank").removeClass('empty');
                return true;
            }
        }
    }
}


function regBank()
{
    if(bankCheckFields() === true)
    {
        banco.nome = $("#bancoNome").val();
        banco.sigla = $("#bancoSigla").val();
        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            data:{"intention":"regBank","Banco": banco},
            dataType:"json",
            success:function(e)
            {
                if(e.resultado["RESULT"] === "true")
                {
                    callXpertAlert('Banco registrado com sucesso.', 'checkmark', 8000);
                    $('.add-new-bank').find('input').val("");
                    $('.add-new-bank').find('input').css("border", "");
                }
                else
                    callXpertAlert(e.resultado["MESSAGE"], 'warning', 8000);
            }
        });
    }
}
