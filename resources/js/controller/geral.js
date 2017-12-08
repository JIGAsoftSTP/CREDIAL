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

function loadContensFilterReport(element, array) {
    for (var x=0; x < array.length; x++){
        var lista = array[x];
        element.append('<option loadData="'+(lista.contents !== null ? "1" : "0")+'" value="' + (lista.contents !== null ? lista["contents"]["table"] : lista["name"]) + '" filter="' + lista["name"] + '" identifier="' + lista["cod"] + '">' + lista["name"] + '</option>');
    }
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

        setTimeout(getImageUser,3500, user);
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
    if ((event.which !== 44 || $(this).val().indexOf(',') !== -1) &&
        ((event.which < 48 || event.which > 57) &&
        (event.which !== 0 && event.which !== 8))) {
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
        return (((this.getDate()+"").length === 1) ? "0"+this.getDate() : this.getDate() )
            +"-"+((((this.getMonth()+1)+"").length === 1) ? "0"+(this.getMonth()+1) : (this.getMonth()+1))
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

var ExportData = function () {
    this.type = undefined;
    this.name = undefined;
    this.data = undefined;

    this.haveData = function () {
        return (this.data !== undefined || $.isArray(this.data));
    };
};

/**
 * @type {ExportData}
 */
var dataExport = new ExportData();

function getNameReport(name) {
    dataExport.name = name;
}

var geral = {
  has_session : function () {
      $.ajax({
          url: "./bean/logar.php",
          type: "POST",
          data: {"intensao": "has_session"},
          dataType: "json",
          async: false,
          success: function (e) {
              if(!e.hassession) window.location = "./index.php";
          }
      });
  }
};

if(!String.prototype.stringToDate) {
    /***
     * @param format
     * @param delimiter
     * @return {Date}
     */
    String.prototype.stringToDate = function (format, delimiter) {
        var dt;
        var st = undefined;
        if(format === undefined){
            st = this.split("-");
            dt = new Date(st[2]+"-"+st[1]+"-"+st[0]);
        }
        else{
            st = this.split(delimiter);
            var fo = format.split(delimiter);
            dt = new Date(st[getPositionParam("YYYY", fo)]+"-"+st[getPositionParam("MM", fo)]+"-"+st[getPositionParam("DD", fo)]);
        }

        /**
         * @param str {String}
         * @param array {Array}
         */
        function getPositionParam( str, array ) {
            for ( var i = 0; i < array.length; i++ ) {
                if ( str === array[ i ].toUpperCase() ) {
                    return i;
                }
            }
        }
        return dt;
    };
}

if (!String.prototype.this_is_date){
    /***
     * @return {boolean}
     */
    String.prototype.this_is_date = function () {
        return valideData(this.toString());
    }
}

if (!String.prototype.data_BD_to_DDMMYYYY) {
    /**
     * @return {string}
     */
    String.prototype.data_BD_to_DDMMYYYY = function () {
        var data = this.split("-");
        return data[2]+"-"+data[1]+"-"+data[0];
    };
}

if(!Date.prototype.getDatePt){
    Date.prototype.getDatePt = function () {
        return (((this.getDate()+"").length === 1) ? "0"+this.getDate() : this.getDate() )
            +"-"+((((this.getMonth()+1)+"").length === 1) ? "0"+(this.getMonth()+1) : (this.getMonth()+1))
            +"-"+this.getUTCFullYear();
    }
}

if(!Date.prototype.getTimeStamp){
    Date.prototype.getTimeStamp = function () {

        function test(int) {
            return (((int+"").length === 1) ? "0"+int : int );
        }

        return test(this.getDate())
            +"-"+test(this.getMonth()+1)
            +"-"+this.getUTCFullYear()+" "+test(this.getHours())+":"+test(this.getMinutes());
    }
}

if(!Date.prototype.getDateEn){
    Date.prototype.getDateEn = function () {
        return this.getUTCFullYear()
            +"-"+((((this.getMonth()+1)+"").length === 1) ? "0"+(this.getMonth()+1) : (this.getMonth()+1))
            +"-"+(((this.getDate()+"").length === 1) ? "0"+this.getDate() : this.getDate());
    }
}