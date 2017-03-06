

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
    imageUser = undefined;
    $("#gest-user-nif").removeAttr("disabled");
    USEREDITE = false;
    resetForm($(".add-new-admin"));
    resetForm($(".mp-menu-user"));
	addNewItem($(this).closest('nav').find('.title'));
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

$('.bank .add-more').click(function(event) {
    $('.bank .menu-bank li').eq(0).click();
});

$('.bank').on('click','.contas li', function(event) {
    var idx = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');

});
$('.bank .add-new-admin').click(function(event) {
    $('.bank .siglas li.active').click();
});

$('.table-list-bank').css('max-width', $('.article-bank').width() + 'px');

/* ############## CHEQ 	###########*/

$('.cheq .menu-cheq li').click(function(event) {
    CtrlTabs($(this), $('.cheq .abas section'));
});


$('.x-table').on('click','i',function(event) {
     openModalFrame($('.mp-cancel-cheq'));
});


/* ############## USER  ###########*/
$('.master-content.adm-user').on('click','.add-more, i.icon-pencil', function(event) {
    bt = $('#gest-user-add');
    if($(this).hasClass('icon-pencil')){
        bt.text('Editar')
    } else{
        bt.text('Adicionar')
        
    }
});
$('.add-new-user p').click(function(event) {
     openModalFrame($('.mp-menu-user'));
});

$('.mp-menu-user .default').on("click","i",function(event) {
    $(this).addClass('icon-radio-checked2').removeClass('icon-radio-unchecked');
    $(this).siblings().removeClass('icon-radio-checked2').addClass('icon-radio-unchecked');
});

$('.search input').keyup(function(event) {
    advSearch($(this), $('.list-user section'))
});
$('.filter li').click(function(event) {
     filterUser($(this));
     // advSearch($('.search input'), $('.list-user section'))
});

$('.new-photo').click(function(event) {
     openInNewTab('https://www.pixect.com/pt/');
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

function filterUser(el){
    el.addClass('active').siblings().removeClass('active');
    typeAttr = el.attr('type');
    users = $('.list-user section');
    users.css('display', 'block');
    if( typeAttr !== undefined)
        users.each(function(index, el) {
            if (typeAttr !== $(this).attr('status'))
                $(this).css('display', 'none');
        });
    
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}