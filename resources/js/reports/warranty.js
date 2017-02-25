loadDataToPage();

$('.list-warr').on("click",".first small", function(event) {
	me = $(this).closest('section');
	me.find('.more').toggleClass('show');
    var ig = Number($(this).attr("id-id"));

	if(!me.hasClass("show")) {
        if(creditBluider.listaCredito[ig].listaInformacao.length == 0 ){ getInformationCredit(ig, creditBluider.listaCredito[ig]); }
        else{ creditBluider.getListInformationCredit(ig); }
    }else{ $("#"+ig).empty(); }
});

var CreditoBluider = function () {
    /**
     * @type {[Credito]}
     */
    this.listaCredito = [];
    this.getCreditos = function () {
        var rt = "";
        for (var ig = 0; ig < this.listaCredito.length; ig++){
            rt += '<section>' +
                    '<div class="first">' +
                        '<b><span>Crédito nº <span>'+this.listaCredito[ig].number+'</span></span><small id-id="'+ig+'">Mais detalhes</small></b>' +
                        '<h3>'+this.listaCredito[ig].clienteNome+'</h3>' +
                    '</div>' +
                    '<div class="more" id="'+ig+'" ></div>' +
                '</section>';
        }
        return rt;
    };

    /**
     * @param iClient {Number}
     */
    this.getListInformationCredit = function (iClient) {
        var rt = "";
        /**
         * @type {Credito}
         */
        var Creditoe = this.listaCredito[iClient];
        for (var ig = 0; ig < Creditoe.listaInformacao.length; ig++ ){
            var infor = Creditoe.listaInformacao[ig];
            rt +=
                '<h4>'+infor.tipo+' - '+infor.name+'</h4>' +
                '<p>'+infor.value+'</p>';
        }
        $("#"+iClient).html(rt);
    };

    /**
     * @param GarClient {Credito}
     */
    this.addCredito = function (GarClient) {
        this.listaCredito[this.listaCredito.length] = GarClient;
    }
};

var Credito = function () {
    this.cheque = undefined;
    this.id = undefined;
    this.name = undefined;
    this.nif = undefined;
    this.number = undefined;
    this.other = undefined;
    this.state = undefined;
    this.surname = undefined;
    this.totalpagar = undefined;
    this.value = undefined;
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
    this.addInformation = function (information) {
        this.listaInformacao[this.listaInformacao.length] = information;
    }
};

var Information = function () {
    this.id = undefined;
    this.tipo = undefined;
    this.name = undefined;
    this.value = undefined;
};

var creditBluider = new CreditoBluider();
function loadDataToPage() {
    $.ajax({
        url: "../../bean/relInformationCredit.php",
        type: "POST",
        data: {intensao: "loadListCredits", filter: null},
        dataType: "json",
        success: function (e) {
            for (var f=0; (f < e.credits.length && f != 199) ; f++){
                var Creditoe = new Credito();
                var credits = e.credits[f];
                Creditoe.cheque = credits["cheque"];
                Creditoe.id = credits["id"];
                Creditoe.name = credits["name"];
                Creditoe.nif = credits["nif"];
                Creditoe.number = credits["number"];
                Creditoe.other = credits["other"];
                Creditoe.state = credits["state"];
                Creditoe.surname = credits["surname"];
                Creditoe.totalpagar = credits["totalpagar"];
                Creditoe.value = credits["value"];
                Creditoe.clienteNome = (Creditoe.name+" "+((Creditoe.surname == Creditoe.name)
                    ? "" : Creditoe.surname ));
                creditBluider.addCredito(Creditoe);
            }
            $(".list-warr").html(creditBluider.getCreditos());
        }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}

/**
 * @param i {Number}
 * @param credit {Credito}
 */
function getInformationCredit(i,credit) {
    $.ajax({
        url: "../../bean/relInformationCredit.php",
        type: "POST",
        data: {intensao: "loadListInformationCredit", id: credit.id},
        dataType: "json",
        success: function (e) {
            for (var f=0; (f < e.information.length && f != 199) ; f++){
                var info = e.information[f];
                var newInfo = new Information();
                newInfo.id = info["ID"];
                newInfo.tipo = info["tipo"];
                if (newInfo.tipo == "Garrantia") {
                    newInfo.name = info["GARRANTIA"];
                    newInfo.value = info["GARRANTIAVALUE"];
                } else {
                    newInfo.name = info["DOCUMENT"];
                    newInfo.value = info["DOCUMENTVALUE"];
                }
                credit.addInformation(newInfo);
            }
            creditBluider.getListInformationCredit(i);
        }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}