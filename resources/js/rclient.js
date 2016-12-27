
    $('.header-tittle').click(function(event) {
        var father;
        if($(this).hasClass('header-tittle'))
            father = $(this);
        else
            father = $(this).parents();
        father.toggleClass('shrink');
    });

    $('.new-client, .close-add-client, .table-client .icon-pencil').click(function(event) {
        $('.add-new-form').toggleClass('show');
        if ($(this).hasClass('icon-pencil')) {
            $('.add-new-form h1').text('Editar cliente')
            $("#cli-reg").text('Editar cliente');
        }
        else {
            CLIENTEEDITE = false;
            $('.add-new-form h1').text('Adicionar cliente')
            $("#cli-reg").text('Adicionar cliente');
        }
    });

    $('.search-span input').focusin(function(event) {
        $('.search-span').addClass('is-focused');
    }).focusout(function(event) {
        $('.search-span').removeClass('is-focused');
    });

    $('.search-span i').click(function(event) {
        $(this).insertBefore($('.search-span i:first-child'));
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