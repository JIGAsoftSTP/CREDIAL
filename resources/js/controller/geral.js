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
Amortizacao.prototype.nunDoc = "";
Amortizacao.prototype.idTipoPagam = "0";
Amortizacao.prototype.nomeBanco = "";
Amortizacao.prototype.tipoPagam = "";

/**
 *
 * @constructor USER
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
User.prototype.estado = undefined;
User.prototype.menu = undefined;


var ListUser =  function () {
    this.list = [];
    this.listContainer = "";
};

ListUser.prototype.addUser = function (user) {
    if(user.nif != undefined)
        this.list[this.list.length] = user;
};
ListUser.prototype.bluider = function () {
    for(var k = 0; k < this.list.length; k++)
    this.listContainer += '<section item="'+k+'">' +
        '<span>'+ ((this.list[k].estado === "Pre-Ativo") ? '' : '<i class="icon-undo2" title="Redefinir senha"></i>')+'<i class="icon-pencil" title="Editar"></i><i class="icon-unlocked" title="Bloquear utilizador"></i></span>' +
        '<div>' +
        '<nav class="default-user-img-'+this.list[k].nif+'"></nav>' +
        '<h4>'+this.list[k].nome+' '+this.list[k].apelido+'</h4>' +
        '<p>NIF: '+this.list[k].nif+'</p>' +
        '<p>'+this.list[k].nivel+' na agência '+this.list[k].agencia+'</p>' +
        '</div>' +
        '</section>';
};

ListUser.prototype.getList = function () {
    return this.listContainer;
};



