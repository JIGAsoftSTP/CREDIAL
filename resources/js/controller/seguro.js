/**
 * Created by Helcio on 12/17/2016.
 */

$(function () {

    regUserActivity(securityActivityAddress, -1, "Visualizou Seguros da Administração", -1, LevelActivity.VISUALIZACAO);
    loadInsurance();
    $("#btAddInsurance").click(function () {
        regInsurance();
    });
});

var securityAddress = "../../bean/AdministracaoBean.php";
var securityActivityAddress = "../../bean/activity.php";
var insuranceActivity = undefined;

function regInsurance() {
    if($("#txtInsurance").val() !== '')
    {
        insuranceActivity = {"Valor" : $("#txtInsurance").val()};
        $.ajax({
            url: securityAddress,
            type:"POST",
            dataType:"json",
            data:{"intention": "add Insurance", "value": unformatted($("#txtInsurance").val())},
            success:function (e) {
                if(e.result["RESULT"])
                {
                     loadInsurance();
                    callXpertAlert("Seguro adicionado com sucesso!", "checkmark", 8000);
                    $('.add-new-admin').find('input').val("");
                    $('.add-new-admin').find('input').css("border", "");
                    regUserActivity(securityActivityAddress, -1, "Registou um novo Seguro",
                        JSON.stringify(insuranceActivity), LevelActivity.CRIACAO);
                }
                else
                    callXpertAlert(e.result["MESSAGE"], "warning", 8000);
            }
        });
    }
}

function loadInsurance() {
    $.ajax({
        url: securityAddress,
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
                var column0 = row.insertCell(0);
                var column1 = row.insertCell(1);

                column0.innerHTML = insurance["VALOR"];
                column1.innerHTML =insurance["ESTADO"];
            }
            tableEstructure($("#table-seguro"));

        }

    });
}