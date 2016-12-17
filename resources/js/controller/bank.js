/**
 * Created by Helcio on 12/17/2016.
 */

$(function(){

});



function carregarSiglas()
{
    $.ajax
    ({
        url:"./bean/AdministracaoBean.php",
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
        url:"./bean/AdministracaoBean.php",
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