/**
 * Created by Helcio on 12/17/2016.
 */

$(function(){
    taxData();

    $("#btAddTax").click(function () {
       addtax();
    });

    $("#tipoCreditoSearch").change(function () {
        if($(this).val() !== "")
        {
            $.ajax({
                url: taxAdress,
                type:"POST",
                dataType:"json",
                data:{"intention": "search tax", "typeCredit": $("#tipoCreditoSearch").val()},
                success:function (e) {
                    taxs = e.result;
                    loadTax();

                }
            });
        }
    });
});

var taxAdress = "../../bean/AdministracaoBean.php";
var taxs = [];

var Taxa = function () {};
Taxa.prototype.valorTaxa = undefined;
Taxa.prototype.dias = undefined;
Taxa.prototype.tipoCredito = undefined;

function loadTypeCredit()
{
    $.ajax({
        url : address,
        type:"POST",
        dataType:"json",
        data:{"intention" : ""}
    })
}

function taxData() {

    $.ajax({
        url: taxAdress,
        type:"POST",
        dataType:"json",
        data:{"intention": "tax data", "typeCredit": null},
        success:function (e) {
            taxs = e.result;
            loadComoBoxIDandValue($("#taxaTipoCredito"), e.tipoCreditos ,"ID", "DESC");
            loadComoBoxIDandValue($("#tipoCreditoSearch"), e.tipoCreditos ,"ID", "DESC");
            loadTax();
        }
    });
}

function addtax() {

    var taxa = new Taxa();
    if($("#txtTaxa").val() !== "" &&
        $("#taxaDias").val() !== "" &&
        $("#taxaTipoCredito").val() !== "")
    {
        taxa.valorTaxa = unformatted($("#txtTaxa").val());
        taxa.dias = $("#taxaDias").val();
        taxa.tipoCredito = $("#taxaTipoCredito").val();

        $.ajax({
            url:taxAdress,
            type:"POST",
            dataType:"json",
            data:{"intention": "add tax", "taxData": taxa},
            success:function (e)
            {
                if(e.resultado["RESULT"] === "true")
                {
                    $("#tipoCreditoSearch").trigger("change");
                    callXpertAlert("Taxa registrado com sucesso!", "checkmark", 8000);
                    $('.flex-form').find('input, select').val("");
                    $('.flex-form').find('input, select').css("border", "");
                }
                else
                    callXpertAlert(e.resultado["MESSAGE"], "warning", 8000);
            }
        });
    }
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
     // setRowCount(".x-table");
}