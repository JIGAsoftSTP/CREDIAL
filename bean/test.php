<?php
/*include "../conexao/CallPgSQL.php";
include "../modelo/Imagem.php";
include "Session.php";
include_once "../modelo/User.php";

        loadActivities();
function loadActivities()
{
    $call = new CallPgSQL();
    $call->functionTable("report.funct_rep_activity", "*")
        ->addString('109000001')
        ->addJsonb('{"dateinicio":"2008-02-14","datefim":"2017-02-27","loadmod":"date"}');
    $call->execute();
    $arrayValues = array();

    while($result = $call->getValors())
    {
            $arrayValues[count($arrayValues)] = $result;
        print_r(json_encode(array("dd" =>$result)));
    }

include "../resources/fw/resize/image.php";

funct_load_user_image(
    userId character varying,
   userAgenciaId numeric,
   userImage character varying,
   imageType character varying
)
imageType { IMAGE, IMAGE-TINY, IMAGE-SMALL }


    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";
    print_r($call->getValors());
    echo "<br><br>";*/



/*var inteClient = undefined;
function carregarCliente(time) {
    if(inteClient!=undefined) {clearInterval(inteClient);}
    clienteSearch = false;
    addTable = (clientes[clienteLetra] != undefined) ? clientes[clienteLetra].length : 0;
    $('#tableCliente').empty();
    var ff = 0;
    if(addTable > 0)
        inteClient = setInterval(function () {
            var client = clientes[clienteLetra][ff];
            var table = document.getElementById("tableCliente");
            var row = table.insertRow(table.childElementCount);

            row.id = ff;

            row.onclick = function () {
                $(this).addClass('selected').siblings().removeClass('selected');
            };

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = "<i class='icon-credit-card' onclick='" + "credito(" + ff + ")'  title='Registo Crédito'></i>" +
                "<i class='icon-info' onclick='" + "inforCiente(" + ff + ")'  title='Mais Informaçõess'></i>" +
                "<i class='icon-pencil' onclick='" + "editCiente(" + ff + ")' title='Editar Cliente' ></i>";
            cell2.innerHTML = client['NIF'];
            cell3.innerHTML = client['NAME'] + " " + client['SURNAME'];
            cell4.innerHTML = client['TELE'];

            var span1 = document.createElement("span");
            span1.setAttribute("class","total");
            var spanText1 = document.createTextNode(client['QUANTIDADE DE CREDITO']);
            span1.appendChild(spanText1);

            var span2 = document.createElement("span");
            span2.setAttribute("class","payed");
            var spanText2 = document.createTextNode(client['creditopay']);
            span2.appendChild(spanText2);

            var porPagar = Number(client['QUANTIDADE DE CREDITO'])-Number(client['creditopay']);
            var span3 = document.createElement("span");
            span3.setAttribute("class","doubt");
            var spanText3 = document.createTextNode(porPagar);
            span3.appendChild(spanText3);

            cell5.appendChild(span1);
            cell5.appendChild(span2);
            cell5.appendChild(span3);
            cell5.setAttribute("class","col-credit");

            ff++;
            tableEstructure($('.x-table.table-client'));
            if (ff == addTable) {
                setRowCount($('.x-table.table-client'));
                clearInterval(inteClient);
            }
        }, time);

}

*/
