$('.list-warr').on("click",".first small", function(event) {
	me = $(this).closest('section');
	me.find('.more').toggleClass('show');
    var ig = Number($(this).attr("id-id"));
	if(!me.hasClass("show")) {
        garantiaBluider.getListGrantiaDescription(ig);
    }else{
        $("#"+ig).empty();
    }
});

var GarantiaClienteBluider = function () {
    /**
     * @type {[GarantiaClient]}
     */
    this.listaGarantiaCliente = [];
    this.getGarrantiaCliente = function () {
        var rt = "";
        for (var ig = 0; ig < this.listaGarantiaCliente.length; ig++){
            rt += '<section>' +
                    '<div class="first">' +
                        '<b><span>Crédito nº <span>'+this.listaGarantiaCliente[ig].numCredito+'</span></span><small id-id="'+ig+'">Mais detalhes</small></b>' +
                        '<h3>'+this.listaGarantiaCliente[ig].clienteNome+'</h3>' +
                    '</div>' +
                    '<div class="more" id="'+ig+'" ></div>' +
                '</section>';
        }
        return rt;
    };

    /**
     * @param iClient {Number}
     */
    this.getListGrantiaDescription = function (iClient) {
        var rt = "";
        /**
         * @type {GarantiaClient}
         */
        var garantiaCliente = this.listaGarantiaCliente[iClient];
        for (var ig = 0; ig < garantiaCliente.listaInformacao.length; ig++ ){
            var garantia = garantiaCliente.listaInformacao[ig];
            rt +=
                '<h4>'+garantia.tipo+'</h4>' +
                '<p>'+garantia.descricao+'</p>';
        }
        $("#"+iClient).html(rt);
    };

    /**
     * @param GarClient {GarantiaClient}
     */
    this.addClienteGarantia = function (GarClient) {
        this.listaGarantiaCliente[this.listaGarantiaCliente.length] = GarClient;
    }
};

var GarantiaClient = function () {
    this.numCredito = undefined;
    this.clienteNome = undefined;
    /**
     *
     * @type {[Information]}
     */
    this.listaInformacao = [];

    /**
     *
     * @param information {Information}
     */
    this.addGarantia = function (information) {
        this.listaInformacao[this.listaInformacao.length] = information;
    }
};

var Information = function () {
    this.tipo = undefined;
    this.idTipo = undefined;
    this.descricao = undefined;
};

var garantiaBluider = new GarantiaClienteBluider();
function loadDataToPage() {
    for (var i = 0; i < 10; i++ ){
        var garantiaCliente = new GarantiaClient();
        garantiaCliente.clienteNome = "fjjfjf-"+i;
        garantiaCliente.numCredito = "554545---"+i;

        for (var j = 0; j < 7; j++){
            var information = new Information();
            information.tipo = i+"-tipe-"+j;
            information.descricao = i+"-fhfhfhf-"+j;
            information.idTipo = j;
            garantiaCliente.addGarantia(information);

        }
        garantiaBluider.addClienteGarantia(garantiaCliente);
    }

    $(".list-warr").html(garantiaBluider.getGarrantiaCliente());
}

loadDataToPage();