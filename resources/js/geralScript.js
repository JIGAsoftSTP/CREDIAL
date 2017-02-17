isNull($('.xpert-form select'));
setTitle($('input, select, textarea'));

$('.content-feed select').click(function(event) {
    if($(this).val() === 'another')
        $('.another').removeClass('disabled')
            .find("input").removeClass("_noObrigatory");
    else
        $('.another').addClass('disabled')
            .find("input").addClass("_noObrigatory");
});
$('.xClose').click(function(event) {
    $(this).closest('section.modalPage').fadeOut(400);
});
$('.feedback-li').click(function(event) {
    openModalFrame($('.mp-feedback'));
    $('.mp-feedback .modalContainer').addClass('jello');
});


$('header .pin').click(function(event) {
    $('.header-1').toggleClass('shrinked');
    $(this).toggleClass('unpin');
    setAppLog($(this), 'unpin');
    setAppLog($('.header-1'), 'shrinked');
});

$('.xpert-form select').change(function(event) {
    isNull($(this));
});

$('.logout').click(function(event) {
    openModalFrame($('.mp-logout'));
});

$('.chg-pwd').click(function(event) {
    openModalFrame($('.mp-change-pwd'));
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

$('.x-list').click(function(event) {
    $(this).find('input').focus();
});
$('.x-list').on('click','b',function(event) {
    $(this).parent().remove();
});

$('input[datalist="list"]').on('keypress', function (e) {
    if (String.fromCharCode(e.keyCode) !='"') {
        return;
    } else {
        e.preventDefault();
    }
});

$('input[datalist="list"]').on('input', function(event){  
    prt = $(this).parent(); 
    $('<a id="width">').append( $(this).val() ).appendTo($(this).parent());
    $(this).width( $('#width').width());
    $('#width').remove();
});

$('input[datalist="list"]').keyup(function(event){      
    if(event.which == 13 && verifyDataList($(this))){
        var newList = '<span class="sltd-item">'+ $(this).val() +'<i></i><b></b></span>';
        prt.find('input').before(newList);
        $(this).val("");
        $(this).css('width', '5px');
    }
});
$('input[datalist="list"]').keyup(function(event){    
    if(event.which == 8 && $(this).val() == ""){
        $(this).prev().remove();
    }
});


/*########      CONTROL LATERAL MENU        ####################*/

$('.content-w-lateral .icon-menu').click(function(event) {
    $('.content-w-lateral').toggleClass('shrinked');
    setAppLog($('.content-w-lateral'), 'shrinked');


    $(this).parent().addClass('show');
    $('.search-span2 input').focus();
});




// $('input[datalist="list"]').keyp(resizeInput).each(resizeInput);

/*########      FUNCTIONS      ####################*/
// function resizeInput() {
//     $(this).attr('size', $(this).val().length);
// }

function verifyDataList(ipt){
    vl = ipt.val();
    var valid = false;
    ipt.next().find('option').each(function() {
        if($(this).val() == vl){
            valid = true;
            return false;
        }
    });
    return valid;
}


function CtrlTabs(el1, el2){
    el1.addClass('active').siblings().removeClass('active');
    el2.eq(el1.index()).addClass('active').siblings().removeClass('active');
}

function openModalFrame(modal) {
    if(modal.hasClass('resetOnOpening'))
        resetForm(modal);
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

function CtrlMenu(element, element2){
    element.addClass('active').siblings().removeClass('active');
    element2.html('<iframe src="'+ element.attr('urldata') +'" frameborder="0" id="iframe-'+ element.index() +'"></iframe>');
    element.find('li').eq(0).trigger('click');
    /*event.stopPropagation();*/
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

function resetForm(form){
    form.find('input, textarea').val("");
    form.find('select').val(form.find('select option:first').val());
    check = form.find('i.icon-checkbox-checked');
    check.each(function () {
        if(!$(this).closest('li').hasClass('isFather'))
            $(this).addClass('icon-checkbox-unchecked').removeClass('icon-checkbox-checked');
        else
            $(this).addClass('xpert-check partial').removeClass('icon-checkbox-checked');
    });

    isNull(form.find('select'));
}

setDatePicker();

function setDatePicker(){
    i = 0;
    $('.is-datepicker').each(function(index, el) {
        new Pikaday(
        {
            field: $('.is-datepicker')[i],
            firstDay: 1,
        });
        i++;
    });
}

function setDataStorage(_type, myObject, myKey, myValue){

    typeData = _type === localStorage ? localStorage : sessionStorage;
    var objectData = {};

    if (typeData.getItem(myObject))
        objectData = $.parseJSON(typeData.getItem(myObject));


    objectData[myKey] = myValue;

    typeData.setItem(myObject, JSON.stringify(objectData));
    console.log(getDataStorage(sessionStorage, myObject));
}

function getDataStorage(_type, myObject){
    typeData = _type === localStorage ? localStorage : sessionStorage;
    
    return $.parseJSON(typeData.getItem(myObject));

}

function deleteContentDataStorage(_type, myObject, myKey) {
    typeData = _type === localStorage ? localStorage : sessionStorage;
    var objectData = {};

    if (typeData.getItem(myObject))
        objectData = $.parseJSON(typeData.getItem(myObject));

    delete objectData[myKey];
    typeData.setItem(myObject, JSON.stringify(objectData));
    console.log(getDataStorage(sessionStorage, myObject));
}
function limitString(element){
    element.on('keydown keyup', function(e){
    if ($(this).val() > 100 
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
       ) {
       e.preventDefault();
       $(this).val(100);
    }
});
}


