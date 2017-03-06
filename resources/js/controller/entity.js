/**
 * Created by Helcio on 12/17/2016.
 */
$(function () {
    loadObjectType();

    $("#btAddEntity").click(function()
    {
        addNewEntity();
    });
});

var address = "../../bean/user.php";
var activityAdress = "../../bean/activity.php";
var entityActivity = undefined;
var entidades =[];
var activity = undefined;

function loadObjectType() {

    $.ajax({
        url: address,
        type: "POST",
        data: {"intention": "loadObject"},
        dataType: "json",
        success: function (e) {
            loadComoBoxIDandValue($("#adminEntity"), e.objeto ,"ID", "NAME");
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
            regUserActivity(activityAdress, -1, "Visualizou Entidades da Administração", -1, LevelActivity.VISUALIZACAO);
        }
    });
}

function showHideValue(idEntidade) {
    $("#"+idEntidade).closest('.entity-div').find('.list').toggleClass('show');

}
function loadObjectValues(id, type)
{
    $.ajax({
        url: address,
        type: "POST",
        data: {"intention": "loadDataObject", "object_id":id},
        dataType: "json",
        success: function (e) {
            activity = e.objeto[e.objeto.length-1]["idCredito"];
            entidades = e.objeto;
            $("#"+id).closest('.entity-div').find('.list').empty();
            for(var i =0;i<e.objeto.length;i++)
            {
                $("#"+id).closest('.entity-div').find('.list').append('<div id="objectData'+e.objeto[i]["idCredito"]+'">' +
                    '<span  class="objectData desc'+e.objeto[i]["idCredito"]+'">'+e.objeto[i]["DESCRICAO"]+'</span>' +
                    '<span class="delete objectData'+e.objeto[i]["idCredito"]+'" onclick="disableObject('+e.objeto[i]["idCredito"]+')">X</span></div>'+
                    '</nav> ');
            }

        }
    });
}
function disableObject(idObjeto) {

    var selectedEntity;

    $.ajax({
        url:address,
        data:{"intention": "disable object", "idObject": idObjeto},
        type:"POST",
        dataType:"json",
        success:function (e) {
            if(e.resultado["result"] === "true")
            {
                callXpertAlert("Entidade removida com sucesso!", 'checkmark', 8000);
                selectedEntity = $(".desc"+idObjeto).text();
                $("#objectData"+ idObjeto).remove();
                regUserActivity(activityAdress, -1, "Eliminou a Entidade "+selectedEntity, -1, LevelActivity.ELIMINACAO);
            }
            else
                callXpertAlert(e.resultado["message"], 'warning', 8000);
        }
    });
}

function addNewEntity() {

    if($("#adminEntity").val() !== "" &&
        $("#txtEntity").val() !== "")
    {
        $.ajax({
            url:address,
            type:"POST",
            data: {"intention":"add Entity","entity":$("#txtEntity").val(), "idTypeEntity" : $("#adminEntity").val()},
            dataType:"json",
            success:function (e) {
                if(e.entity["RESULT"] === "true")
                {
                    loadObjectValues($("#adminEntity").val());
                    setEntityActivity();
                    callXpertAlert(entityName($("#adminEntity").val())+" adicionado!", 'checkmark', 8000);
                    $("#txtEntity").val("");
                    $("#adminEntity").val("");
                    regUserActivity(activityAdress, -1,"Registou uma nova Entidade",JSON.stringify(entityActivity) , LevelActivity.CRIACAO);
                }
                else
                    callXpertAlert(e.entity["MESSAGE"], 'warning', 8000);
            }
        });
    }
}

function setEntityActivity()
{
    entityActivity = {"Entidade" : $("#txtEntity").val(),
        "Tipo de Entidade" : $("#adminEntity :selected").text()};
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

getDataStorage()
/*setTimeout(function () { setWithEntity() }, 5000);

function setWithEntity(){
    var wth;
    $('.entity-div .list').each(function() {
        wth = 0;
        $(this).find('div').each(function() {
            wth = wth < $(this).width() ? $(this).width() : wth;
        });
        $(this).find('div').each(function() {
            $(this).css('width', (wth + 10) + 'px');
        });
    });    
}*/