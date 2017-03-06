/**
 * Created by Helcio on 12/20/2016.
 */

$(function () {

    regUserActivity(agencyActivityAddress, -1, "Visualizou o menu Agência", -1, LevelActivity.VISUALIZACAO);
   carregarLocalidade();
    loadAgencyAdm();
    $("#addAgency").click(function () {
        addAgency();
    });
});

var agencyUrl ="../../bean/AdministracaoBean.php";
var agencyActivityAddress ="../../bean/activity.php";
var agencyActivity = undefined;
var Agency = function(){};
Agency.prototype.nome;
Agency.prototype.localidade;
var agency = new Agency();

var agencies = [];


function addAgency()
{
    if($("#agenciaNome").val() !== '' && $("#agenciaLocalidade").val() !== '')
    {
        agencyActivity = {"Nome" : $("#agenciaNome").val(), "Localidade" : $("#agenciaLocalidade :selected").text()};

        agency.nome = $("#agenciaNome").val();
        agency.localidade = $("#agenciaLocalidade").val();

        $.ajax({
            url: agencyUrl,
            type:"POST",
            dataType:"json",
            data:{"intention" : "add agency", "Agency" : agency},
            success:function(e)
            {
                if(e.result["RESULT"] === 'true')
                {
                    regUserActivity(agencyActivityAddress, -1, "Registou uma nova Agência", JSON.stringify(agencyActivity), LevelActivity.CRIACAO);
                    callXpertAlert("Agência "+agency.nome+" adicionado com sucesso!", "checkmark", 8000);
                    $('.add-new-admin').find('input, select, textarea').val("");
                    $('.add-new-admin').find('input, select, textarea').css("border", "");
                    loadAgencyAdm();
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

function loadAgencyAdm() {
    $.ajax({
        url:agencyUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "agency adm"},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();
        },
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

function carregarLocalidade()
{
    $.ajax({
        url:agencyUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "localidades"},
        success:function (e) {

            loadComoBoxIDandValue($("#agenciaLocalidade"), e.localidades ,"ID", "DESC");
        }
    });
}

function loadUserAgency(indice) {

    $.ajax({
        url:agencyUrl,
        type:"POST",
        dataType:"json",
        data:{"intention": "load user agency", "agency": agencies[indice]["ID"]},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();
        },
        success:function (e) {
            $("#agencyNameWorker h3").html(agencies[indice]["NOME AGENCIA"]);
            $(".agencyFunc li").empty();
            for(var i=0;i<e.result.length;i++)
            {
                if(e.result[i]["NAME"] === e.result[i]["SURNAME"])
                    $(".agencyFunc").append('<li><img src='+e.result[i]["PHOTO"]+' alt="" width="200">'+e.result[i]["NAME"]+'</li>');
                else
                    $(".agencyFunc").append('<li><img src='+e.result[i]["PHOTO"]+' alt="" width="200">'+e.result[i]["NAME"]+" "+e.result[i]["SURNAME"]+'</li>');
            }
            $(".list-funcs").addClass("show");

        }

    });
}

