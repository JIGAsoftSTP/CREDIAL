
/*menuWebkit();*/
XpertToggle($('#toggle-deb-cred') , 'on', 'Crédito');
menuLateralID($('.menu-cheq nav'));




$('#toggle-deb-cred').click(function(event) {
    XpertToggleCtrl($(this), 'Crédito', 'Débito');
});



$('.search-span2 input').focusout(function(event) {
	if($(this).val() === '')
		$(this).parent().removeClass('show');
});

$('.add-new-admin .closeIt').click(function(event) {
	$(this).closest('.add-new-admin').removeClass('show');
});

$('.add-new-admin button').click(function(event) {
	validation1($(this).closest('.add-new-admin').find('input, select, textarea'));
});

$('.add-more.default').click(function(event) { 
    if($('article > section').hasClass('bank')){
        $('.bank .menu-bank li').eq(0).trigger('click');
    }   
	addNewItem($(this).prev());
});

// $('.xpert-form button').click(function(event) {
//     $(this).closest('.xpert-form').find('input, textarea').val('');
//     $(this).closest('.xpert-form').find('select').val(0);
//     isNull($(this).closest('.xpert-form').find('select'));
// });

// ############## ENTITY 	###########

/*$('.entity-div:first-child').addClass('show');
$('.entity-div:first-child').find('.list').addClass('show');*/
$('.containerEntidades').on('click', '.show-hide', function(event) {
    etty = $(this).closest('.entity-div');
    etty.toggleClass('showed');
});
$('.containerEntidades').on('click', '.add-more', function(event) {
	var title = $(this).closest('nav').find('h3').text();
	var fakeModal = $(this).closest('.active').find('.add-new-admin');
	addNewItem();
});


// ############## BANK 	###########

$('.bank .menu-bank li').click(function(event) {
    var idx = $(this).index();
    var sec = $('.bank').find('.add-new-admin section');
    sec.eq(idx).addClass('active').siblings().removeClass('active'); 
    addNewItem($(this));
});

$('.bank').on('click','.siglas li', function(event) {
	var idx = $(this).index();
	$(this).addClass('active').siblings().removeClass('active');
    var bkds = ['Banco Internacional de STP', 'Banco Equandor', 'EcoBank', '37 000 000,00', '1 000 000,00', '5 000 000,00'];
    $('.bank-descript .name').text(bkds[idx]);
    $('.bank-descript .sald').text(bkds[idx+3]);
    if(unformatted(bkds[idx+3]) <= 1000000)
    	$('.bank-descript .sald').addClass('bad').removeClass('good');
    else
    	$('.bank-descript .sald').addClass('good').removeClass('bad');
});



// ############## CHEQ 	###########

$('.cheq .menu-cheq li').click(function(event) {
    controlLateralMenu($(this) , $('.cheq .abas section'));
    // tableEstructure($('.active table'));
    	var sec = $('.cheq .abas section').eq($(this).index());
    	tableEstructure(sec.find('table'));
});

// ############## USER 	###########

$('.add-new-user p').click(function(event) {
     openModalFrame($('.mp-menu-user'));
});

$('.mp-menu-user .default i').click(function(event) {
    $(this).addClass('icon-radio-checked2').removeClass('icon-radio-unchecked');
    $(this).siblings().removeClass('icon-radio-checked2').addClass('icon-radio-unchecked');
});

/*###################### AGENCY ##############*/

$('.agency').on('click','.funcs',function(event) {
    $(this).closest('.active').find('.list-funcs').addClass('show');
});

$('.list-funcs .closeIt').click(function(event) {
    $(this).parent().removeClass('show');
});


/*
$(window).resize(function(event) {
    menuWebkit();
});*/






function checkMenuSelection(element){
    var allChecked = true;
    element.each(function(index, el) {
        if($(this).hasClass('icon-checkbox-unchecked')){
            allChecked = false;
            return false;
        }
    });
    return allChecked;
}

/*function menuWebkit(){

    $('.content-w-lateral').css('height' , $('.content-w-lateral').parent().height() + 'px');

}*/

// ######################################

function addNewItem(title){    
    title = title.text();
    itemForm = $('article > section.active').find('.add-new-admin');
	itemForm.find('h2').text(title);
    itemForm.css('min-height', ($('article').height() +32) + 'px');
	itemForm.addClass('show');
}