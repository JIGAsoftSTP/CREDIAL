
isNull($('.xpert-form select'));
setTitle($('input, select, textarea'));
menuLateralID($('.content-w-lateral aside'));

$('.xpert-form select').change(function(event) {
    isNull($(this));
});

$('.logout').click(function(event) {
    openModalFrame($('.mp-logout'));
});

$('.chg-pwd').click(function(event) {
    openModalFrame($('.mp-change-pwd'));
});

$('.user-span').click(function(event) {
    $('.menu-user').toggleClass('show');
    // callXpertAlert('Adicionado', 'notification', 8000);
});

$('.xpert-toggle-2 span').click(function(event) {
    $(this).addClass('active').siblings().removeClass('active');
});

$('.modalPage .mp-close, .modalPage .bt-no-option').click(function(event) {
    $(this).closest('.modalPage').fadeOut(300);
});

$('body').on('click','.xpert-alert .close',  function(event) {
    $('.xpert-alert').removeClass('show');
});




/* Xpert List Items Events*/
$('.xpert-list .add-more-item').click(function(event) {
    $(this).closest('.xpert-list').find('.list-items').toggleClass('show');    
});

$('.xpert-list li').click(function(event) {
    XpertListItem($(this));
});

$('.xpert-list').on( 'dblclick','.item-list', function(event) {
    $(this).toggleClass('show-hide');
    $(this).find('span').toggleClass('show-hide');
    $(this).find('input').toggleClass('show-hide').focus();
    if(isEmpty($(this).find('input')))
        $(this).find('.state-desc').removeClass('icon-checkmark');
});

$('.xpert-list').on( 'keyup','input', function(event) {
    var actual = $(this);
    if ((event.which === 13)) {
        if(!isEmpty(actual)){
            actual.closest('.item-list').trigger('dblclick');
            actual.closest('.item-list').find('.state-desc').addClass('icon-checkmark');
        }

    } else if(event.which === 27){
        actual.closest('.item-list').find('.state-desc').removeClass('icon-checkmark');
        actual.closest('.item-list').trigger('dblclick');
    }
});

$('.xpert-list').on( 'click','.delete-item-list', function(event) {
    var meList = $(this).closest('.item-list');
    var xp = meList.find('span').eq(0).attr('value');
    var list_Items = meList.closest('.xpert-list').find('ul li');


    list_Items.each(function(index, el) {
        if(("simula-list-id-"+xp) === $(this).attr('id')){
            var i = $(this).find('i');
            var b_qtt = $(this).find('b');
            var bqttNum = parseInt(b_qtt.text());
            bqttNum -= 1;
            b_qtt.text(bqttNum);
            if( bqttNum === 0){
                b_qtt.removeClass('show');
                i.toggleClass(' icon-checkbox-unchecked icon-checkbox-checked');
            }
        }

            /*$(this).find('i').toggleClass('icon-checkbox-unchecked icon-checkbox-checked');*/
    });

    meList.remove();
});

$('.xpert-list').on( 'click','b', function(event) {

    event.preventDefault();
});





/*########      CONTROL LATERAL MENU        ####################*/


$('.content-w-lateral aside li').click(function(event) {
    controlLateralMenu($(this), $('article > section'), event);
});

$('.content-w-lateral .icon-menu').click(function(event) {
    $('.content-w-lateral').toggleClass('shrinked');

    $(this).parent().addClass('show');
    $('.search-span2 input').focus();
});





/*########      FUNCTIONS      ####################*/

function openModalFrame(modal) {
    modal.fadeIn(300);
}

function callXpertAlert(txt, type, time) {
    $('.xpert-alert').remove();
    $('body').append('<div class="xpert-alert ' + type + '"><i class="icon-' + type + '"></i><span class="txt">' + txt + '</span> <span class="close">X</span></div>')

    setTimeout(function () {
        $('.xpert-alert').addClass('show');
    }, 200);
    setTimeout(function () {
        $('.xpert-alert').removeClass('show');
    }, time);
}

function XpertListItem(li){
    var list = li.closest('.xpert-list');
    var lst = list.find('.add-more-item');
    var qtt = li.find('b');
    var qttNum = parseInt(qtt.text()); 
    var i = li.find('i');
    var realId = li.attr("id").split("-")[3]; // para pegar a ultima posição do id separado com '-'
    lst.before('<div class="item-list"><span value="'+realId+'">'
                    + li.find('.list-name').text() +
                    '</span><span>' +
                    '<i class="state-desc"></i>' +
                    '<span class="delete-item-list">X</span></span>' +
                    '<input type="text" placeholder="Descrição '+ li.find('.list-name').text() +'" class="input-desc-list _noObrigatory show-hide">' +
                '</div>');
    qttNum +=1;
    li.find('b').text(qttNum);
    if(qttNum > 0){
        qtt.addClass('show');
        i.addClass('icon-checkbox-checked').removeClass('icon-checkbox-unchecked');
    }

    /*else{
        list.find('span').each(function(index, el) {
            var me = $(this);
            if( me.attr("value") === li.attr("id")){
                me.closest('.item-list').remove();
            }
        });
    }
    i.toggleClass(' icon-checkbox-unchecked icon-checkbox-checked');*/
}

function XpertToggle(tgID , initialState, initialTxt){

    tgID.find('.bar').addClass(initialState);
    tgID.find('.text').text(initialTxt);
}
function XpertToggleCtrl(tgID, txtON, txtOFF){
    tgID.find('*').addClass('affect');
    if(tgID.find('.bar').hasClass('on'))
        tgID.find('.text').text(txtOFF);
    else
        tgID.find('.text').text(txtON);        
    
    tgID.find('.bar').toggleClass('on off');
}
function menuLateralID(menu){
    var i = 0;
    if(menu.hasClass('single')){
        menu.find('li').each(function(index, el) {
            $(this).attr('identity', i);
            i++;
        });
    }else{
        menu.find('li li').each(function(index, el) {
            $(this).attr('identity', i);
            i++;
        });
    }
}
function controlLateralMenu(element, element2, event){
    idx = element.attr('identity');
    ctt = element2.eq(idx);
    element.addClass('active').siblings().removeClass('active');
    ctt.addClass('active').siblings().removeClass('active');
    /*if(element.parent().hasClass('lateral-menu'))
        $('article .title').text(element.text());*/
    element.find('li').eq(0).trigger('click');  
    event.stopPropagation();
    
}

// ###################     VALIDATION      ##############
function isEmpty(element) {
    if (element.attr('type') === 'password')
        return (element.val().length < 1);
    else
        return (element.val().replace(/\s/g, '') === '' || (element.val() === '0' && element[0]["localName"] === "select") );

}

function isNull(_element) {
    if (_element.val() === '' || (_element.val() === '0' && _element[0]["localName"] === "select") ) {
        _element.addClass('is-placeholder');
    } else {
        _element.removeClass('is-placeholder');
    }

}

function validation1(_element) {
    var validation;
    _element.each(function () {
        if (isEmpty($(this)) && !$(this).hasClass("_noObrigatory")) {
            $(this).addClass('empty');
            validation = false;
            return false;
        } else {
            $(this).removeClass('empty');
            validation = true;
        }
    });
    return validation;

}

function pwdValid(pwd1, pwd2) {
    if (pwd1.val() === pwd2.val())
        return true;
    else {
        // $('.msg').html('As senhas não se correspondem!');
        pwd1.add(pwd2).addClass('empty');
        return false;
    }
}



/* Function to format numbers with "space" using as parameter a input*/
function formatted(nStr) {

    var num = nStr.val().replace(/(\s)/g, '');
    nStr.val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "));

}

$('.formatNumber').on('keyup', function () {

    formatted($(this));

});

function unformatted(nStr) {

    if(nStr !== '')
        return parseFloat(nStr.replace(/\s/g , '').replace(/,/g, '.'));
    else
        return 0;
}

function setTitle(element){
    element.each(function(index, el) {
        if($(this).attr('placeholder'))
            $(this).attr('title', $(this).attr('placeholder'));
        else
            $(this).attr('title', $(this).find('option').eq(0).text());
        
    });
        
}



$('.integer').keypress(function (event) {

    if ((event.which != 44 || $(this).val().indexOf('/') != -1) &&
        ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
        event.preventDefault();
}

});

$('.double').keypress(function (event) {

    //$( ".integer" ).trigger("keypress ");

    if ((event.which != 44 || $(this).val().indexOf(',') != -1) &&
        ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
        event.preventDefault();
}

var text = $(this).val();

if ((text.indexOf(',') != -1) &&
    (text.substring(text.indexOf(',')).length > 2) &&
    (event.which != 0 && event.which != 8) &&
    ($(this)[0].selectionStart >= text.length - 2)) {
    event.preventDefault();
}
});