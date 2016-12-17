/**
 * Created by ahmedjorge on 9/27/16.
 */

var title = "";

$(function () {

    dadosComboBox();

    $(".addAgency").click(function () {

    });

    $("#btRegBank").click(function()
    {
        regBank();
    });
});


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
        }
    });
}

