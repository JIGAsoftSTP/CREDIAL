
// $(document).ready(function() {
//
// });
XpertToggle($('#toggle-deb-cred') , 'on', 'Crédito');

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
	addNewItem($(this).prev());
});



/* ############## ENTITY 	###########*/

$('.containerEntidades').on('click', '.show-hide', function(event) {
    etty = $(this).closest('.entity-div');
    etty.toggleClass('showed');
});


/* ############## BANK  ###########*/

$('.bank .menu-bank li').click(function(event) {
    var idx = $(this).index();
    var sec = $('.bank').find('.add-new-admin section');
    sec.eq(idx).addClass('active').siblings().removeClass('active'); 
    addNewItem($(this));
});

$('.bank').on('click','.siglas li', function(event) {
    var idx = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
/*    var bkds = ['Banco Internacional de STP', 'Banco Equandor', 'EcoBank', '37 000 000,00', '1 000 000,00', '5 000 000,00'];
    $('.bank-descript .name').text(bkds[idx]);
    $('.bank-descript .sald').text(bkds[idx+3]);
    if(unformatted(bkds[idx+3]) <= 1000000)
        $('.bank-descript .sald').addClass('bad').removeClass('good');
    else
        $('.bank-descript .sald').addClass('goo
d').removeClass('bad');*/
});


/* ############## CHEQ 	###########*/

$('.cheq .menu-cheq li').click(function(event) {
    CtrlTabs($(this), $('.cheq .abas section'));
});



/* ############## USER 	###########*/

$('.add-new-user p').click(function(event) {
     openModalFrame($('.mp-menu-user'));
});

$('.mp-menu-user .default').on("click","i",function(event) {
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

function addNewItem(title){    
    itemForm = title.closest('.master-content').find('.add-new-admin');
    title = title.text();
	itemForm.find('h2').text(title);
	itemForm.addClass('show');
}