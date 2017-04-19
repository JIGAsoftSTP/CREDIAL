
$('.header-tittle').click(function(event) {
    var father;
    if($(this).hasClass('header-tittle'))
        father = $(this);
    else
        father = $(this).parents();
    father.toggleClass('shrink');
});

$('.new-client, .close-add-client, .table-client .icon-pencil').click(function(event) {
    // if (containMenu("cre.clie")) {
        $('.add-new-form').toggleClass('show');
        setAppLog($('.add-new-form'), 'show');
        if ($(this).hasClass('icon-pencil')) {
            $('.add-new-form h1').text('Editar cliente');
            $("#cli-reg").text('Editar cliente');
        }
        else {
            CLIENTEEDITE = false;
            $('.add-new-form h1').text('Adicionar cliente');
            $("#cli-reg").text('Adicionar cliente');
            $(".add-new-form").find("input, select").removeAttr("disabled");
            resetForm($(".add-new-form"));
        }
        DOCREDITO = false;
    // } else{
    //     callXpertAlert("Infelizmente nao tens permiçao para efectuar o registro de Cliente!", new Mensage().warning, 8000);
    // }
});

$('.search-span input').focusin(function(event) {
    $('.search-span').addClass('is-focused');
}).focusout(function(event) {
    $('.search-span').removeClass('is-focused');
});

$('.search-span span i').click(function(event) {
    $(this).insertBefore($('.search-span span i:first-child'));
    $('.search-span input').focus();
});

$('.alphabet span').click(function(event) {
    $(this).addClass('active').siblings().removeClass('active');
});

$('.master.xpert-form').on('keydown','input, select', function(event) {
    section = $(this).closest('section');
    isLast = $(this).parent().is(':last-child');
    if((event.which === 9 || event.which === 13) && isLast){
        console.log(isLast);
        section.prev().addClass('shrink');
        section.next().removeClass('shrink');

            /*if(($(this).parent().index() + 1) === leng){
            }*/
        }
    });


// $('.add-new-form input, .add-new-form select').keypress(function(event) {
//  if (keyCode === 9) {
//      alert("kjbn");
//    }
// });



$('.sh-more').click(function(event) {
    $(this).parent().find('.more-details').toggleClass('show');
    /*tableEstructure($('#table-amortizacao'));*/
});


$('.mp-info-client .menu-info li').click(function(event) {
    CtrlTabs($(this), $('.content-info section'));
});

$('.mini-report.rep2 small').click(function(event) {
    showDataCliente();
    openModalFrame($('.mp-info-client'));
});



/*    ###### AMORTIZAÇÃO #####*/

$('.mp-liquidar i').click(function(event) {
         // if(!missFazeado) {
            if(!$(this).hasClass('unchange')){
               $(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
               if ($(this).hasClass('icon-checkbox-checked')) {
                 // $('.sec-same').find('*').removeAttr('disabled');
             }
             else {
                 // $('.sec-same').find('*').attr('disabled', 'true');
             }
             if ($(this).closest('p').hasClass('type-font')) {

               $('.sec-another').toggleClass('show');
               $('.sec-another i').addClass('icon-checkbox-unchecked').removeClass('icon-checkbox-checked');
           }
         // }else if($(this).attr("id") == "cred-pay-desco"){
         //     $(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
         // }}
     }
 });

$('.table-liquid').on('dblclick','td', function(event) {
    $('.add-detail-table').addClass('show');
});
$('.close-add-detail').click( function(event) {
    $('.add-detail-table').removeClass('show');
});

$('.special-ipt input').focusin(function(event) {
    $(this).parent().addClass('focused').removeClass('empty');
});
$('.special-ipt input').focusout(function(event) {
    $(this).parent().removeClass('focused');
    if(isEmpty($(this))) $(this).prev().addClass('empty').removeClass('focused');
    else $(this).prev().removeClass('empty');
});


function CtrlFormLiquidar(state){
    var modal = $('.mp-liquidar');
    if(state === 0){
        modal.find('i').addClass('icon-checkbox-unchecked').removeClass('unchange icon-checkbox-checked');
        modal.find('input, select').attr('disabled', 'true');
        modal.find('input.is-datepicker').removeAttr('disabled');
        modal.find('.sec-another').removeClass('show');
    } else{
        modal.find('.type-font i').addClass('unchange icon-checkbox-checked').removeClass('icon-checkbox-unchecked');
        modal.find('#cred-pay-fazea').removeClass('icon-checkbox-unchecked').addClass('unchange icon-checkbox-checked');
        modal.find('.sec-another').addClass('show');
        modal.find('input, select').removeAttr('disabled');
    }
}

$('.new-simulation').click(function(event) {
    // if (containMenu("cre.regCre")){
    cliente_more.reiniciar_modal_novo_credito();
    openModalFrame($('.mp-new-credit'));
    // }else{
    //     callXpertAlert("Infelizmente nao tens permiçao para efectuar o registro de Cliente!", new Mensage().warning, 8000);
    // }
});

$('.define-client').click(function(event) {
    $('.select-client').addClass('show');
});

$('.select-client b').click(function(event) {
    if(cliFind.isFind) {
        si.nifClient = cliFind.nif;
        $('#cred-cli-nif').text(cliFind.nif +" -");
        $('#cred-cli-comName').text(cliFind.name);
        $(this).closest('.select-client').removeClass('show');
    }
});

$('.item-descript').click(function(event) {
    event.stopPropagation();   
});

$('.item-descript small').click(function(event) {
    $(this).closest('.item-descript').removeClass('show');
});

$('.item-descript textarea').click(function(event) {
    $(this).removeAttr('readonly');
    $(this).closest('.item-descript').removeClass('visualize');    
});
$('.item-descript textarea').keydown(function(event) {
    if (event.keyCode == 13 && !event.shiftKey){
        setDescription($(this).attr('id-opt'), $(this).val());
        $('.item-descript').removeClass('show');
        $(this).val("");
    }
});

$('.x-list').on('click','i',function(event) {
    txt = $(this).parent().text();
    ident = $(this).parent().attr('id-opt');
    descript = $(this).parent().attr('description');
    $('.item-descript').addClass('show');
    $('.item-descript textarea').val(descript).attr('readonly', 'readonly');
    if(descript != "")
        $('.item-descript').addClass('visualize');
    else{
        $('.item-descript').removeClass('visualize');
        $('.item-descript textarea').removeAttr('readonly').focus();
    }
    $('.item-descript textarea').attr({
            'placeholder':'Descrição de '+ txt, 
            'id-opt':ident
        });
    event.stopPropagation();
});

$('.x-list').on('mouseenter','span',function(event) {
    diff = $(this).parent().width() - $(this).width();
    if(diff < 60){
        $(this).css('margin-left', (diff - 60) +'px');
    }
});
$('.x-list').on('mouseleave','span',function(event) {
    diff = $(this).parent().width() - $(this).width();
    if(diff < 60){
        $(this).css('margin-left', '0');
    }
});

$('.x-list').on('click','b',function(event) {
   $('.item-descript small').click();
});

$('.select-client small').click(function(event) {
    $(this).closest('.select-client').removeClass('show');
});


$('.mp-new-credit .modalContainer').click(function(event){    
    $('.item-descript, .x-list-select ul').removeClass('show');
});


$('.x-list-select').on('mouseup', 'li', function(event) {
    loadChequeSimulacao();
});


function setDescription(ident, desc){
    var flag = true;
    $('.x-list').each(function() {
        $(this).find('span').each(function() {
            if($(this).attr('id-opt') == ident){
                $(this).attr('description', desc);
                flag = false;
                return flag;
            }
        });
        return flag;
    });
}

$('.mp-liquidar-full .type-font i').click(function(event) {
    $(this).toggleClass('icon-checkbox-unchecked icon-checkbox-checked');
    $('.mp-liquidar-full .dffrent').toggleClass('show');
});

$('.list-history').on('click', '.bt-full-payment',function(event) {
    getDadosPayFull.call(this)
});