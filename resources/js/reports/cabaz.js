var cabaz = {
    conversions: [
        {
            value: "dos_name",
            name: "Nome"
        },
        {
            value: "dos_surname",
            name: "Apelido"
        },
        {
            value: "dos_nif",
            name: "NIF"
        },
        {
            value: "dos_numdos",
            name: "Numero de Dossier"
        },
        {
            value: "hisdos_mail",
            name: "Email"
        },
        {
            value: "hisdos_telefone",
            name: "Telemovel"
        },
        {
            value: "hisdos_telfixo",
            name: "Telefone Fixo"
        },
        {
            value: "hisdos_telservico",
            name: "Telefone Serviço"
        },
        {
            value: "num_contrato",
            name: "Numero de Contrato"
        },
        {
            value: "num_contrato_nao_pago",
            name: "Numero de Contrato Não Pago"
        },
        {
            value: "num_contrato_pago",
            name: "Numero de Contrato Pago"
        },
        {
            value: "num_contrato_pago_tardio",
            name: "Numero de Contrato Pago Tardio"
        },
        {
            value: "num_contrato_vencido_nao_pago",
            name: "Numero de Contrato Vencido Não Pago"
        },
        {
            value: "total_capital_inicial",
            name: "Total Capital Inicial",
            type: "moeda"
        },
        {
            value: "total_montante_pagar",
            name: "Total Montante à Pagar",
            type: "moeda"
        },
        {
            value: "total_montante_pago",
            name: "Total Montante Pago",
            type: "moeda"
        },
        {
            value: "total_taeg",
            name: "Total TAEG",
            type: "moeda"
        },
        {
            value: "total_taeg_contrato_pago",
            name: "Total TAEG de Contrato Pago",
            type: "moeda"
        }
    ],
    data: undefined,
    load_detalhes: function () {
        var idlist = $("#more-detalhes-list");
        idlist.empty();
        this.conversions.forEach(function (conv) {
            var li = "<li>" +
                "<b>$name : </b>" +
                "<span>$value</span>" +
                "</li>";
            li = li.replace("$name", conv.name);
            li = li.replace("$value", cabaz.put_value(cabaz.data[conv.value], conv));
            idlist.append(li);
        });
        openModalFrame($(".mp-show-more-information-client-credit"));
    },
    put_value : function (value, conv) {
        if(value !== null && value !== "null" && value !== ""){
            return ((conv.type !== undefined && conv.type === "moeda") ? formattedString(value) : value);
        }else{
            return "";
        }
    }
};

$("#table-client").on("dblclick", "tr", function (object) {
    cabaz.data = JSON.parse($.base64.atob($(this).attr("data"), true));
    cabaz.load_detalhes();
});