/**
 * Created by Helcio on 12/17/2016.
 */
$(function(){

    regUserActivity(bankActivityAddress, -1, "Visualizou o menu Banco", -1, LevelActivity.VISUALIZACAO);
    carregarContas();

    $("#btBankActions").click(function () {
        if($(".xpert-form .head h2").html() === 'Banco')
             regBank();
        else if($(".xpert-form .head h2").html() ==='Transferências')
            bankTransfer();
        else if($(".xpert-form .head h2").html() ==='Conta Banco')
            regBankAccount();
        else
            makeCreditDebit();
    });
});

var bankAddress = "../../bean/AdministracaoBean.php";
var bankActivityAddress = "../../bean/activity.php";

var listBanks = [];
var listMoviments = [];
var value;
var Movimentation = function () {};
Movimentation.prototype.bankFrom;
Movimentation.prototype.bankTo;
Movimentation.prototype.value;
Movimentation.prototype.desc;

var Banco = function(){};
Banco.prototype.sigla = undefined;
Banco.prototype.nome = undefined;
Banco.prototype.codigoAgencia = undefined;
Banco.prototype.codigoConta = undefined;
Banco.prototype.descricao = undefined;
Banco.prototype.saldoMinimo = undefined;

var DebitCredit = function(){};
DebitCredit.prototype.numDoc = undefined;
DebitCredit.prototype.value = undefined;
DebitCredit.prototype.bank = undefined;
DebitCredit.prototype.typeOperation = undefined;


function loadBankData()
{
    $.ajax({
       url : bankAddress,
        type:"POST",
        dataType:"json",
        data:{"intention" : "bank data"},
        success:function (param) {
            loadComoBoxIDandValue($(".listBanks"), param.banks ,"ID", "NAME");
            listBanks =  param.banks;
        }
    });
}
function carregarContas()
{
    $.ajax
    ({
        url: bankAddress,
        type:"POST",
        dataType:"json",
        data:{"intention": "contas"},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();
        },
        success:function (e)
        {
             listBanks = e.contas;
            loadComoBoxIDandValue($(".listBanks"), e.contas ,"ID", "NOME BANCO");
            loadComoBoxIDandValue($("#bk-conta-nome"), e.bancos ,"ID", "NAME");
            $(".contas").append('<ul class="siglas"><li class="active">'+e.contas[0]["DESCRICAO"]+'</li></ul>');
            loadBankMoviment(0);
            for(var i = 1;i<e.contas.length;i++)
            {
                $(".contas").append('<ul class="siglas"><li onclick=loadBankMoviment('+i+')>'+e.contas[i]["DESCRICAO"]+'</li></ul>');
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
        data:{"intention": "bank moviment", "bank" : listBanks[position]["ID"]},
        success:function (e)
        {
            listMoviments = [];
            listMoviments = e.result;
            $("#bankMovimentName").html(listBanks[position]["NAME"]);
            $("#tableBankMoviments").empty();
            $(".good").html(listBanks[position]["SALDO"]);


            if(Number(listBanks[position]["banco_saldo"])<Number(listBanks[position]["banco_saldominimo"])){
                $(".sald").removeClass("good");
                $(".sald").addClass("bad");
            }
            else{
                $(".sald").removeClass("bad");
                $(".sald").addClass("good");
            }

            for(var i=0;i<listMoviments.length;i++)
            {   var table = document.getElementById("tableBankMoviments");
                var row = table.insertRow(table.childElementCount);
                var moviments = e.result[i];
                row.id = i;

                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);
                var column2 = row.insertCell(2);
                var column3 = row.insertCell(3);

                column0.innerHTML = moviments["DATA"];
                column1.innerHTML = moviments["DEBITO"];
                column2.innerHTML = moviments["CREDITO"];
                column3.innerHTML = moviments["LIBELE"];
            }
            tableEstructure($(".x-table"));
        }
    });
}

function bankTransfer() {

    if($("#bankMovimentFrom").val() === "")
            $("#bankMovimentFrom").addClass("empty");
    else{
        $("#bankMovimentFrom").removeClass("empty");
        if($("#bankMovimentTo").val() === "")
            $("#bankMovimentTo").addClass("empty");
        else{
            $("#bankMovimentTo").removeClass("empty");
            if($("#movimentValue").val() === "")
                $("#movimentValue").addClass("empty");
            else{
                $("#movimentValue").removeClass("empty");
                if($("#movimentDesc").val() === "")
                    $("#movimentDesc").addClass("empty");
                else{
                    $("#movimentDesc").removeClass("empty");

                    var movimentation = new Movimentation();

                    movimentation.bankFrom = $("#bankMovimentFrom").val();
                    movimentation.bankTo = $("#bankMovimentTo").val();
                    movimentation.value = unformatted($("#movimentValue").val());
                    movimentation.desc = $("#movimentDesc").val();

                    $.ajax({
                        url: bankAddress,
                        type:"POST",
                        dataType:"json",
                        async: false,
                        data:{"intention" : "add movimentation", "Movimentation":movimentation},
                        success:function (e) {
                            console.log(e.result["RESULT"]);
                            if(e.result["RESULT"] ==='true')
                            {
                                carregarContas();
                                regUserActivity(bankActivityAddress, -1,"Efetuou Transferência Bancária do banco "+
                                    $("#bankMovimentFrom :selected").text()+" para o banco "+$("#bankMovimentTo :selected").text(),
                                    JSON.stringify(movimentation), LevelActivity.CRIACAO);

                                $('.add-mov').find('input, select').val("");
                                $('.add-mov').find('input, select').css("border", "");
                                $("#movimentDesc").val("");
                                $("#movimentDesc").css("border", "");
                                callXpertAlert("Transferência efetuada com sucesso!", "checkmark", 8000);
                            }
                            else
                                callXpertAlert(e.result["MESSAGE"], 'warning', 8000);
                        }
                    });

                }
            }
        }
    }
}

function makeCreditDebit() {

    if(debitCreditCheckFields() === true)
    {
        var debitCredit = new DebitCredit();
        debitCredit.numDoc = $("#debitCreditDoc").val();
        debitCredit.value = unformatted($("#debitCreditValue").val());
        debitCredit.bank = $("#debitCreditBank").val();
        debitCredit.typeOperation = $(".bar .text").html();

        $.ajax({
            url: bankAddress,
            type:"POST",
            dataType:"json",
            data:{"intention" : "make debit or credit", "DebitCredit" :debitCredit},
            success:function(e)
            {
                if(e.result["result"] ==='true')
                {
                    callXpertAlert("Operação efetuada com sucesso!", "checkmark", 8000);
                    $('.debitCreditField').val("");
                    $('.debitCreditField').css("border", "");
                    regUserActivity(bankActivityAddress, -1, "Realizou uma Operação de Débito/Crédito", JSON.stringify(debitCredit), LevelActivity.CRIACAO);
                    carregarContas();

                }
                else
                    callXpertAlert(e.result["message"], "warning", 8000);
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
    if($("#bancoNome").val() !== "" &&
        $("#bancoSigla").val() !=="" &&
        $("#bancoCodigoBancario").val() !== "" &&
        $("#bk-contaSaldoMinimo").val() !== "")
    {
        var banco = new Banco();
        banco.nome = $("#bancoNome").val();
        banco.sigla = $("#bancoSigla").val();
        banco.codigoConta = $("#bancoCodigoBancario").val();
        banco.saldoMinimo= unformatted($("#bk-contaSaldoMinimo").val());

        $.ajax({
            url: bankAddress,
            type:"POST",
            async: false,
            data:{"intention":"regBank","Banco": banco},
            dataType:"json",
            success:function(e)
            {
                if(e.resultado["result"] === "true")
                {
                    regUserActivity(bankActivityAddress, -1, "Registou um novo Banco", JSON.stringify(banco), LevelActivity.CRIACAO);
                    callXpertAlert('Banco registado com sucesso!', 'checkmark', 8000);
                    $('.add-new-bank').find('input').val("");
                    $('.add-new-bank').find('input').css("border", "");
                    carregarContas();
                }
                else
                    callXpertAlert(e.resultado["message"], 'warning', 8000);
            }
        });
    }
}

function regBankAccount()
{

    if($("#bk-conta-nome").val() === "" || $("#bk-conta-nome").val() === "0")
        $("#bk-conta-nome").addClass("empty");
    else
    {
        $("#bk-conta-nome").removeClass("empty");
        if($("#bk-conta-agencia").val() === "")
            $("#bk-conta-agencia").addClass("empty");
        else{
            $("#bk-conta-agencia").removeClass("empty");
            if($("#bk-conta-conta").val() === "")
                $("#bk-conta-conta").addClass("empty");
            else
            {
                $("#bk-conta-conta").removeClass("empty");
                if($("#bk-conta-descricao").val() === "")
                    $("#bk-conta-descricao").addClass("empty");
                else
                {
                    $("#bk-conta-descricao").removeClass("empty");

                    var banco = new Banco();
                    banco.nome = $("#bk-conta-nome").val();
                    banco.codigoAgencia = $("#bk-conta-agencia").val();
                    banco.codigoConta = $("#bk-conta-conta").val();
                    banco.descricao = $("#bk-conta-descricao").val();

                    $.ajax({
                        url: bankAddress,
                        type:"POST",
                        dataType:"json",
                        async: false,
                        data:{"intention": "add bank account", "bank" : banco},
                        success:function (e) {
                            if(e.resultado["result"] === "true")
                            {
                                callXpertAlert('Conta Banco registado com sucesso!', 'checkmark', 8000);
                                $('.add-account').find('input, select').val("");
                                $('.add-account').find('input, select').css("border", "");
                                $("#bk-conta-descricao").val("");
                                $("#bk-conta-descricao").css("border", "");
                                regUserActivity(bankActivityAddress, -1, "Registou uma nova Conta Banco", JSON.stringify(banco), LevelActivity.CRIACAO);
                                carregarContas();
                            }
                            else
                                callXpertAlert(e.resultado["message"], 'warning', 8000);
                        }
                    });
                }
            }
        }
    }

}