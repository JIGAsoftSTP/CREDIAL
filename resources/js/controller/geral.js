/**
 * Created by ahmedjorge on 9/30/16.
 */
function loadComoBox(element, array) {
    for (var x=0; x < array.length; x++){
        element.append('<option value="'+ array[x] +'">'+array[x]+'</option>');
    }
}

function loadComoBoxIDandValue(element, array, id, value) {
    for (var x=0; x < array.length; x++){
        var lista = array[x];
        element.append('<option value="'+ lista[id] +'">'+lista[value]+'</option>');
    }
}

function loadComoBoxIDandValueReport(element, array) {
  var existAnoSub = false;
    if($(".report-P").attr('id') !== undefined) $(".report-P").remove();

    for (var x=0; x < array.length; x++){
        var lista = array[x];
        if(lista["cod"] === "anoSub")
            existAnoSub = true;
       else
        {
            if(lista["type"] !== "5")
                 element.append('<option value="'+ lista["contents"]["table"] +'" filter="'+ lista["name"] +'" identifier="'+lista["cod"]+'">'+lista["name"]+'</option>');
            else
                element.append('<option value="'+ lista["name"] +'" filter="'+ lista["name"] +'" identifier="'+lista["cod"]+'">'+lista["name"]+'</option>');
        }

    }
    if(existAnoSub && $(".report-P").attr('id') === undefined){
        $(".prd-enabled").append('<input type="text" id="relatorio-periodo" class="report-P integer" maxlength="3" ' +
            'onkeypress="numericNumbers(event)" placeholder="Periodo em Comparação" value="1"/>');
        setDataStorage(sessionStorage, 'filterReport', "anoSub" , "1");
    }
    else $(".report-P").remove();
}

function regUserActivity(url, contentKey, operation, jsonContent, level )
{
    $.ajax
    ({
        url: url,
        type:"POST",
        dataType:"json",
        data:{"intention":"reg_activity", "contentKey": contentKey,
              "operation" : operation, "jsonContent": "content:"+jsonContent,
                "level": level},
        success:function(e){

        }
    });
}




function formattedString(nStr) {
    var num = nStr.replace(/(\s)/g, '');
    return  num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

var Mensage  = function () {};
Mensage.prototype.warning ="warning";
Mensage.prototype.checkmark="checkmark";
Mensage.prototype.cross="cross";
Mensage.prototype.notification="notification";

function valideData(data)
{
    var rar = data.val().split('-');
    rar = $.makeArray(rar);
    if( rar.length===3 && rar[0].length===2 && rar[1].length===2 && rar[2].length===4 )
    {
        if( $.isNumeric(rar[0]) && $.isNumeric(rar[1]) && $.isNumeric(rar[2]) && Number(rar[0]) > 0 && Number(rar[1]) > 0  && Number(rar[1]) <= 12 )
        {
            switch (Number(rar[1]))
            {
                case 1:case 3:case 5:case 7:case 8:case 10:case 12:
                    if (Number(rar[0]) <= 31) { return true; }
                    return false;
                case 4:case 6:case 9:case 11:
                    if (Number(rar[0]) <= 30) {  return true;  }
                    return false;
                default:
                    if (!isBisexto(rar[2]) && (Number(rar[0]) <= 28)) { return true; }
                    else if (Number(rar[0]) <= 29) {  return true;  }
                    return false;
            }
        } else { return false; }
    } else { return false; }
}

function isBisexto(valor)
{ return (( Number(valor)%4 === 0 && Number(valor)%100 !== 0 ) || (Number(valor)%400 === 0) ); }

if (!String.prototype.$$) {
    String.prototype.$$ = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

/**
 * Class ComoBox
 * */
var ComoBox = function () {};
ComoBox.prototype.id = undefined;
ComoBox.prototype.value = undefined;
ComoBox.prototype.detalhes = undefined;
ComoBox.prototype.obj = undefined;

/**
 * Class <b>Amortizacao<b> usada para lista de Amortização
 * */
var Amortizacao = function () {};
Amortizacao.prototype.data = "";
Amortizacao.prototype.idBanco = "0";
Amortizacao.prototype.reebolso = "";
Amortizacao.prototype.reebolsoVew = "";
Amortizacao.prototype.nunDoc = "";
Amortizacao.prototype.idTipoPagam = "0";
Amortizacao.prototype.nomeBanco = "";
Amortizacao.prototype.tipoPagam = "";

/**
 *
 * @constructor User
 */
var User =  function () {};
User.prototype.id = "";
User.prototype.nome = undefined;
User.prototype.apelido = undefined;
User.prototype.nif = undefined;
User.prototype.agencia = undefined;
User.prototype.idAgencia = undefined;
User.prototype.nivel = undefined;
User.prototype.idNivel = undefined;
User.prototype.img = undefined;
User.prototype.imgSmall = undefined;
User.prototype.imgTiny = undefined;
User.prototype.estado = undefined;

/**
 *
 * @type {Array}
 */
User.prototype.menu = undefined;
User.prototype.disableMode = undefined;

var USEREDITE = false;
var CLIENTEEDITE = false;
var DOCREDITO = false;
/**
 *
 * @constructor ListUser
 */
var ListUser =  function () {
    /**
     *
     * @type {[User]}
     */
    this.listActive = [];
    this.listOther = [];

    /**
     *
     * @param user {User}
     */
    this.addUser = function (user) {
        this.listActive[this.listActive.length] = user;
    };

    /**
     * @param user {User}
     */
    this.addOtherUser = function (user) {
        this.listOther[this.listOther.length] = user;
    };

    /**
     * @param k {Number}
     */
    this.bluiderActive = function (k) {
        this.appendUser(this.listActive[k], k);
    };

    /**
     * @param user {User}
     */
    this.appendUser = function (user, k) {
        var content = '<section item="' + k + '" status="' + user.estado + '">' +
            '<span>' + ((user.estado === "Pre-Ativo") ? '' : '<i class="icon-undo2" title="Redefinir senha"></i>') + '<i class="icon-pencil" title="Editar"></i><!--<i class="icon-calendar" title="Atividades"></i>-->' + ((user.estado != "Inativo") ? '<i class="icon-lock" title="Bloquear utilizador"></i>' : '' ) + '</span>' +
            '<div>' +
            '<nav class="default-user-img-' + user.nif + '"></nav>' +
            '<h4>' + user.nome + ' ' + user.apelido + '</h4>' +
            '<p>NIF: ' + user.nif + '</p>' +
            '<p>' + user.nivel + ' na agência ' + user.agencia + '</p>' +
            '</div>' +
            '</section>';
        $(".list-user").append(content);
        var css = {
            "background": "content-box #444 url('../." + user.img + "') no-repeat"
            , "background-position": "center"
            , "background-size": "cover"
        };
        $(".default-user-img-" + user.id).css(css);

        setTimeout(getImageUser,1500, user);
    };


    /**
     * @param k {Number}
     */
    this.bluiderOther = function (k) {
        this.appendUser(this.listOther[k], k);
    };

};

if(!Number.prototype.dc){
    Number.prototype.dc = function () {
        return Number(this.toFixed(2));
    }
}

if(!Number.prototype.rp){
    Number.prototype.rp = function () {
        return this.toString().replace(".",",");
    }
}


function numericNumbers(event) {
    if ((event.which != 44 || $(this).val().indexOf(',') != -1) &&
        ((event.which < 48 || event.which > 57) &&
        (event.which != 0 && event.which != 8))) {
        event.preventDefault();
    }
}

function checkDate(str) {
    var partes = str.split("-");
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

var LevelActivity = {"ELIMINACAO" : "0", "DESATIVACAO" : "0", "ATUALIZACAO": "1",
    "CRIACAO": "2",  "VISUALIZACAO": "3", "OUTROS": "4" , "TODOS" : "5"};
Object.freeze(LevelActivity);

var UserState = {"ATIVO": "1", "INATIVO": "0", "PRE_ATIVO": "2" };
Object.freeze(UserState);

if(!Date.prototype.getDatePt){
    Date.prototype.getDatePt = function () {
        return (((this.getDate()+"").length == 1) ? "0"+this.getDate() : this.getDate() )
            +"-"+((((this.getMonth()+1)+"").length == 1) ? "0"+(this.getMonth()+1) : (this.getMonth()+1))
            +"-"+this.getUTCFullYear();
    }
}

function getStringDate() {
    return new Date().getDatePt();
}

function alterFormatDate(date)
{
    var newDate = date.split("-");
    newDate = $.makeArray(newDate);
    return newDate[2]+"-"+newDate[1]+"-"+newDate[0];
}


