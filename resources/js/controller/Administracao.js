/**
 * Created by helcio on 10/28/16.
 */

$(function () {

    listTaxs();
    carregarSiglas();
    loadInsurance();
    loadAgencyAdm();
    $("#btAddInsurance").click(function () {
        regInsurance();
    });
    $("#btBankActions").click(function () {

       if($(".bank .add-new-admin h2").html() === 'Adicionar Banco')
            regBank();
        else if($(".bank .add-new-admin h2").html() ==='Adicionar Movimentações')
           bankTransfer();
        else
            makeCreditDebit();
    });

    $("#btAddTax").click(function () {
        addtax();
    });

    $("#addAgency").click(function () {
       addAgency();
    });

    $("#tipoCreditoSearch").change(function () {
        listTaxs();
    });

    $("#addCheck").click(function () {
        regCheque();
    })
});


var taxs = [];
var agencies = [];
var banks = [];


function listTaxs() {
    $.ajax({
       url:"./bean/AdministracaoBean.php",
        type:"POST",
        dataType:"json",
        data:{"intention": "taxs", "typeCredit": $("#tipoCreditoSearch").val()},
        success:function (e) {
            taxs = e.result;
            loadTax();
        }
    });
}

function loadAgencyAdm() {
    $.ajax({
        url:"./bean/AdministracaoBean.php",
        type:"POST",
        dataType:"json",
        data:{"intention": "agency adm"},
        success:function (e) {
              agencies = e.result;
            for(var index=0;index<e.result.length;index++)
            {

                $(".list-agency").append('<section><h3><b>'+e.result[index]["NOME AGENCIA"]+'</b></h3><p>Localizada em <span></span>'+e.result[index]["LOCALIDADE"]+'</p>' +
                    '<nav>' +
                    '  <span class="funcs" onclick=loadUserAgency('+index+')><b>'+e.result[index]["TOTAL DE TRABALHADORES"]+'</b><br>funcionários</span><span><b>'+e.result[index]["TOTAL CLIENTES REGISTRADOS"]+'</b><br>clientes</span>' +
                    '</nav>' +
                    '</section>');
            }

        }
    });
}
function addtax() {

    if($("#txtTaxa").val() !== "" && $("#taxaDias").val() !== "" && $("#taxaTipoCredito").val() !== "")
    {
        taxa.valorTaxa = unformatted($("#txtTaxa").val());
        taxa.dias = $("#taxaDias").val();
        taxa.tipoCredito = $("#taxaTipoCredito").val();
        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention": "add tax", "taxData": taxa},
            success:function (e) {
                if(e.resultado["RESULT"] === "true")
                {
                    taxs = e.data;
                    listTaxs();
                    callXpertAlert("Taxa registrado com sucesso.", "checkmark", 8000);
                    $('.add-new-admin').find('input, select, textarea').val("");
                    $('.add-new-admin').find('input, select, textarea').css("border", "");
                }
                else
                    callXpertAlert(e.resultado["MESSAGE"], "warning", 8000);
            }
        });
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

function bankCheckFields() {

    if($("#bancoSigla").val() ==='') {
        $('#bancoSigla').addClass('empty');
        return false;
    }
    else
    {
        $("#bancoSigla").removeClass('empty');
        if($("#bancoNome").val() === '')
        {
            $('#bancoNome').addClass('empty');
            return false;
        }
        else
        {
            $("#bancoNome").removeClass('empty');
            return true;
        }
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

var Movimentation = function () {};
Movimentation.prototype.bankFrom;
Movimentation.prototype.bankTo;
Movimentation.prototype.value;
Movimentation.prototype.desc;
var movimentation = new Movimentation();

var Taxa = function () {};
Taxa.prototype.valorTaxa = "";
Taxa.prototype.dias = "";
Taxa.prototype.tipoCredito = "";
var taxa = new Taxa();


var Banco = function(){};
Banco.prototype.sigla;
Banco.prototype.nome;
var banco = new Banco();


function loadInsurance() {
    $.ajax({
       url:"./bean/AdministracaoBean.php",
        type:"POST",
        dataType:"json",
        data:{"intention": "load Insurance"},
        success:function (e) {
            $("#tableInsurances").empty();

            for(var i=0;i<e.result.length;i++)
            {   var table = document.getElementById("tableInsurances");
                var row = table.insertRow(table.childElementCount);
                var insurance = e.result[i];
                row.id = i;

                row.onclick = function () {
                    (this).addClass('selected') .siblings().removeClass('selected');
                };

                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);

                column0.innerHTML = insurance["VALOR"];
                column1.innerHTML =insurance["ESTADO"];
            }
            tableEstructure($("#table-seguro"));
        }
    });
}
function loadTax()
{
    $("#tableTax").empty();
   for(var i =0;i<taxs.length;i++)
   {
        var table = document.getElementById("tableTax");
        var row = table.insertRow(table.childElementCount);
         var tax = taxs[i];
         row.id = i;

       row.onclick = function () {
           (this).addClass('selected') .siblings().removeClass('selected');
       };

       var column1= row.insertCell(0);
       var column2 = row.insertCell(1);
       var column3 = row.insertCell(2);
       var column4 = row.insertCell(3);
       var column5 = row.insertCell(4);
       var column6 = row.insertCell(5);

       column1.innerHTML = tax["VALOR"];
       column2.innerHTML = tax["PERIODO"];
       column3.innerHTML = tax["TIPO CREDITO"];
       column4.innerHTML = tax["DATA INICIO"];
       column5.innerHTML = tax["DATA FIM"];
       column6.innerHTML = tax["ESTADO"];
   }

    tableEstructure($("#table-taxa"));
}

var DebitCredit = function(){};
DebitCredit.prototype.numDoc;
DebitCredit.prototype.value;
DebitCredit.prototype.bank;
DebitCredit.prototype.typeOperation;
var debitCredit = new DebitCredit();

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

var Agency = function(){};
Agency.prototype.nome;
Agency.prototype.localidade;
var agency = new Agency();

function addAgency()
{
    if($("#agenciaNome").val() !== '' && $("#agenciaLocalidade").val() !== '')
    {
        agency.nome = $("#agenciaNome").val();
        agency.localidade = $("#agenciaLocalidade").val();

        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention" : "add agency", "Agency" : agency},
            success:function(e)
            {
                if(e.result["RESULT"] === 'true')
                {
                    callXpertAlert("Agência "+agency.nome+" adicionado com sucesso.", "checkmark", 8000);
                    $('.add-new-admin').find('input, select, textarea').val("");
                    $('.add-new-admin').find('input, select, textarea').css("border", "");
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

function regInsurance() {
    if($("#txtInsurance").val() !== '')
    {
        $.ajax({
            url:"./bean/AdministracaoBean.php",
            type:"POST",
            dataType:"json",
            data:{"intention": "add Insurance", "value": unformatted($("#txtInsurance").val())},
            success:function (e) {
                if(e.result["RESULT"] === 'true')
                {
                    loadInsurance();
                    callXpertAlert("Seguro adicionado com sucesso.", "checkmark", 8000);
                    $('.add-new-admin').find('input').val("");
                    $('.add-new-admin').find('input').css("border", "");
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

var Cheque = function(){};
Cheque.prototype.banco;
Cheque.prototype.agencia;
Cheque.prototype.sequenciaInicial;
Cheque.prototype.sequenciaFinal;
Cheque.prototype.totalCheque;
var cheque = new Cheque();


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

function loadUserAgency(indice) {

    $.ajax({
        url:"./bean/AdministracaoBean.php",
        type:"POST",
        dataType:"json",
        data:{"intention": "load user agency", "agency": agencies[indice]["ID"]},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut(); },
        success:function (e) {
            $("#agencyNameWorker h3").html(agencies[indice]["NOME AGENCIA"]);
            $(".agencyFunc li").empty();
            for(var i=0;i<e.result.length;i++)
            {
                $(".agencyFunc").append('<li><img src='+e.result[i]["PHOTO"]+' alt="" width="200">'+e.result[i]["NAME"]+" "+e.result[i]["SURNAME"]+'</li>');
            }

        }
    });
}

function loadBankData()
{
    $.ajax({
       url : ""
    });
}