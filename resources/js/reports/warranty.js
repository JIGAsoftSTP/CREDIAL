
$('.list-warr').on("click", ".first small", function (event)
{
    me = $(this).closest('section');
    var ig = Number($(this).attr("id-id"));
    if (!me.hasClass("show")) {
        if (creditBluider.listaCredito[ig].listaInformacao.length == 0) {
            getInformationCredit(ig, creditBluider.listaCredito[ig], me);
        }
        else {
            creditBluider.getListInformationCredit(ig, me);
        }
    } else {
        $("#" + ig).empty();
    }
});
$(".execute").click(function () {
    loadDataToPage();

});

var CreditoBluider = function () {
    /**
     * @type {[Credito]}
     */
    this.listaCredito = [];

    /**
     * @param credito {Credito}
     * @param ig {Number}
     */
    this.bluiderCreditos = function (credito, ig) {
        var rt = '<section>' +
            '<div class="first">' +
            '<b><span>Crédito nº <span>' + credito.number + '</span></span><small   id-id="' + ig + '">Mais detalhes</small></b>' +
            '<h3>' + credito.clienteNome + '</h3>' +
            '</div>' +
            '<div class="more" id="' + ig + '" ></div>' +
            '</section>';
        $(".list-warr").append(rt);
    };

    /**
     * @param iClient {Number}
     * @param section {*}
     */
    this.getListInformationCredit = function (iClient, section) {
        var rt = "";
        var isAdd = [];
        /**
         * @type {Credito}
         */
        var credit = this.listaCredito[iClient];
        for (var ig = 0; ig < credit.listaInformacao.length; ig++) {
            var info = credit.listaInformacao[ig];
            rt += ((fistOfType(info.tipo)) ? "<h4 class='title'>" + info.tipo + "<h4/>" : '') +
                '<h4>' + info.name + '</h4>' +
                '<p>' + info.value + '</p>'
                + (nextIsOtherType(ig, credit.listaInformacao) ? '<hr>' : '');
        }
        $("#" + iClient).html(rt);
        section.find('.more').toggleClass('show');
        function fistOfType(type) {
            if (isAdd[type] == undefined) {
                isAdd[type] = true;
                return true;
            } else {
                return false;
            }
        }

        /**
         * @param i {Number}
         * @param info {[Information]}
         */
        function nextIsOtherType(i, info) {
            return (info.length > i + 1 && info[i].tipo != info[(i + 1)].tipo);
        }
    };

    /**
     * @param GarClient {Credito}
     */
    this.addCredito = function (GarClient) {
        this.listaCredito[this.listaCredito.length] = GarClient;
    };
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
var dataCredit = undefined;


function loadDataToPage() {
   $.ajax({
        url: "../../bean/relInformationCredit.php",
        type: "POST",
        data: {intensao: "loadListCredits", filter: getDataStorage(sessionStorage,'filterReport')},
        dataType: "json",
        success: function (e) {
           dataCredit = e.credits;
        }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();
            transformDataToCredito(dataCredit, 250);
        }
    });
}

/**
 * @param i {Number}
 * @param credit {Credito}
 * @param section {*}
 */
function getInformationCredit(i, credit, section) {
    $.ajax({
        url: "../../bean/relInformationCredit.php",
        type: "POST",
        data: {intensao: "loadListInformationCredit", id: credit.id, filter : getDataStorage(sessionStorage,'filterReport')},
        dataType: "json",
        success: function (e) {
            for (var f=0; (f < e.information.length && f != 199) ; f++){
                var info = e.information[f];

                var newInfo = new Information();
                newInfo.id = info["id"];
                newInfo.tipo = info["type"];

                if (newInfo.tipo == "Garrantia") {
                    newInfo.name = info["garrantia"];
                    newInfo.value = info["garrantiavalue"];
                } else {
                    newInfo.name = info["document"];
                    newInfo.value = info["documentvalue"];
                }
                credit.addInformation(newInfo);
            }
            creditBluider.getListInformationCredit(i, section);
        }, beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();}
    });
}

var totalData = undefined;
var iData = 0;
/**
 *
 * @type {*}
 */
var creditInte = undefined;
/**
 *
 * @param data {*}
 * @param time {Number}
 */
function transformDataToCredito(data, time) {
    iData = 0;
    totalData = data.length;
    clearInterval(creditInte);
    if(totalData > 0)
    creditInte = setInterval(function () {
        var credits = data[iData];
        var Creditoe = new Credito();
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
        creditBluider.bluiderCreditos(Creditoe, iData);
        iData ++;
        if(iData === totalData) { clearInterval(creditInte)}
    }, time);
}

