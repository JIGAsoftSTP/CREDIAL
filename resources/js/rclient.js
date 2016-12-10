menuLateralID($('.mp-info-client .menu-info'));

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
    

// $('.add-new-form input, .add-new-form select').keypress(function(event) {
//  if (keyCode === 9) {
//      alert("kjbn");
//    }
// });

    

    $('.sh-more').click(function(event) {
        $(this).parent().find('.more-details').toggleClass('show');
        tableEstructure($('#table-amortizacao'));
    });

    // $('.table-liquid table').on('dblclick',function(event) {
    //     $('.add-detail-table').addClass('show');
    // });
    //
    // $('.close-add-detail').on("click",function(event) {
    //     $('.add-detail-table').removeClass('show');
    // });
    //
    // $('.icon-credit-card').on("click",function(event) {
    //     $('.mp-new-credit').fadeIn(500);
    //     tableEstructure($('#table-liquid'));
    // });

    // $('.table-client table').on("dblclick",function(event) {
    //     $('.icon-credit-card').trigger('click');
    // });

// icon-info close-history
//     $('#tableCliente').on("click",".close-history,.icon-info",function(event) {
//         $('.history-selected').toggleClass('show');
//         // alert("fkkf");
//     });




    $('.mp-info-client .menu-info li').click(function(event) {
        controlLateralMenu($(this), $('.content-info section'))
    });

    $('.mini-report.rep2 small').click(function(event) {
        showDataCliente();
        openModalFrame($('.mp-info-client'));
    });



/*    ###### AMORTIZAÇÃO #####*/

     $('.mp-liquidar i').click(function(event) {
        $(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
        if($(this).closest('p').hasClass('type-font'))
            $('.sec-another').toggleClass('show');
    });


// $('.mp-change-pwd button:first-child').click(function(event) {
//  callXpertAlert('Senha alterada com sucesso!', 'cross', 8000);
// });