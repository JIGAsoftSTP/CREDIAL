/**
 * Created by ahmedjorge on 9/27/16.
 */
var idTypeEntity = 0;
var title = "";
var idEntidade = 0;

$(function () {

    dadosComboBox();
    loadObjectType();

    $("#btAddEntity").click(function()
    {
        addNewEntity();
    });
    $(".addAgency").click(function () {

    });

    $("#btRegBank").click(function()
    {
        regBank();
    });
});

var entidades = [];
function loadMenu(listMenu) {
    for (var j=0; j< listMenu.length; j++)
        $("#menuAccessUser").append('<li _id="'+listMenu[j]['ID']+'" id="'+listMenu[j]['COD']+'" level="'+listMenu[j]['LEVEL']+'" idfrw="'+((listMenu[j]['SUPER.COD']==null) ? listMenu[j]['COD'] : listMenu[j]['SUPER.COD'] )+'">' +
                        '<nav><span>'+listMenu[j]["NAME"]+'</span></nav>' +
                    '</li>');
    organizeMenu($('#menuAccessUser'));
}

function dadosComboBox()
{
    $.ajax({
        url: "./bean/user.php",
        type: "POST",
        data: {"intention": "loadDataAdmin"},
        dataType: "json",
        success: function (e) {

            loadComoBoxIDandValue($("#agenciaLocalidade"), e.localidades, "ID", "DESC");
            loadComoBoxIDandValue($(".listTipoCredito"), e.tipoCreditos, "ID", "DESC");
            loadComoBoxIDandValue($("#chequeAgencias"), e.agencias, "ID", "DESC");
            loadComoBoxIDandValue($(".listBanks"), e.bancos, "ID", "NAME");
            loadComoBoxIDandValue($(".listAgencies"), e.agencias, "ID", "NOME");
            loadMenu(e.listMenu);
        }
    });
}


function loadObjectType() {

    $.ajax({
        url: "./bean/user.php",
        type: "POST",
        data: {"intention": "loadObject"},
        dataType: "json",
        success: function (e) {
          loadComoBoxIDandValue($("#adminEntity"), e.objeto ,"ID", "NAME");
            entidades = e.objeto;
          for(var i =0;i<e.objeto.length;i++)
          {
              $(".containerEntidades").append('<div class="entity-div"> ' +
                  '<nav class="primordial" id="'+e.objeto[i]["ID"]+'"><h3>'+e.objeto[i]["NAME"]+'</h3>' +
                  ' <a>' +
                  '<span class="show-hide" >' +
                  ' <i class="icon-ctrl" onclick=showHideValue('+e.objeto[i]["ID"]+')></i></span>' +
                  '</a>' +
                  '</nav> ' +
                  '<nav class="list"> ' +
                  '</nav> ' +
                  '</div>');
              loadObjectValues(e.objeto[i]["ID"]);

           }
        }
    });

}

function disableObject(idObject) {
    $.ajax({
       url:"./bean/user.php",
        data:{"intention": "disable object", "idObject": idObject},
        type:"POST",
        dataType:"json",
        success:function (e) {
            if(e.resultado["RESULT"] === "true")
            {
                callXpertAlert("Entidade removida com sucesso.", 'checkmark', 8000);
                $("#objectData"+idObject).remove();
            }
            else
                callXpertAlert(e.resultado["MESSAGE"], 'warning', 8000);
        }
    });
}
function addNewEntity() {
    if($("#ADMINENTITY").val() !== "" && $("#txtEntity").val() !== "")
     {
        $.ajax({
           url:"./bean/user.php",
            type:"POST",
            data: {"intention":"add Entity","entity":$("#txtEntity").val(), "idTypeEntity" : $("#adminEntity").val()},
            dataType:"json",
            success:function (e) {

                if(e.entity["RESULT"] === "true")
                {
                    loadObjectValues($("#adminEntity").val());
                    callXpertAlert(entityName($("#adminEntity").val())+" adicionado.", 'checkmark', 8000);
                    $("#txtEntity").val("");
                    $("#adminEntity").val("");
                }
                else
                    callXpertAlert(e.entity["MESSAGE"], 'warning', 8000);
            }
        });
    }
}
function showHideValue(idEntidade) {
    $("#"+idEntidade).closest('.entity-div').find('.list').toggleClass('show');

}


function loadObjectValues(id)
{
    $.ajax({
        url: "./bean/user.php",
        type: "POST",
        data: {"intention": "loadDataObject", "object_id":id},
        dataType: "json",
        success: function (e) {
            $("#"+id).closest('.entity-div').find('.list').empty();
            for(var i =0;i<e.objeto.length;i++)
            {
                $("#"+id).closest('.entity-div').find('.list').append('<div id="objectData'+e.objeto[i]["idCredito"]+'"><span  class="objectData'+e.objeto[i]["idCredito"]+'">'+e.objeto[i]["DESCRICAO"]+'</span><span class="delete objectData'+e.objeto[i]["idCredito"]+'" onclick="disableObject('+e.objeto[i]["idCredito"]+')">X</span></div>'+
                    '</nav> ');
            }

        }
    });

}
function addMore(id) {
    title = $("#".id).closest('nav').find('h3').text();
    var fakeModal = $("#".id).closest('.active').find('.add-new-admin');

    idTypeEntity = id;
}

function entityName(idEntity) {
    for(var i =0;i<entidades.length;i++)
    {
        if(entidades[i]["ID"] == idEntity)
        {
            return entidades[i]["NAME"];
        }
    }
}