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
function loadObjectType() {

    $.ajax({
        url: address,
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

function showHideValue(idEntidade) {
    $("#"+idEntidade).closest('.entity-div').find('.list').toggleClass('show');

}
function loadObjectValues(id)
{
    $.ajax({
        url: address,
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
function disableObject(idObject) {
    $.ajax({
        url:address,
        data:{"intention": "disable object", "idObject": idObject},
        type:"POST",
        dataType:"json",
        success:function (e) {
            if(e.resultado["result"] === "true")
            {
                callXpertAlert("Entidade removida com sucesso!", 'checkmark', 8000);
                $("#objectData"+idObject).remove();
            }
            else
                callXpertAlert(e.resultado["message"], 'warning', 8000);
        }
    });
}

function addNewEntity() {
    if($("#ADMINENTITY").val() !== "" && $("#txtEntity").val() !== "")
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
                    callXpertAlert(entityName($("#adminEntity").val())+" adicionado!", 'checkmark', 8000);
                    $("#txtEntity").val("");
                    $("#adminEntity").val("");
                }
                else
                    callXpertAlert(e.entity["MESSAGE"], 'warning', 8000);
            }
        });
    }
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