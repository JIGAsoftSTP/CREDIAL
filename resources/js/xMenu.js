

organizeMenu($('#menuAccessUser'));

$('.XpertTreeMenu').on('click','.isFather .icon-ctrl, .isFather > nav span', function(event) {
	li_me = $(this).closest('li');
    li_me.toggleClass('open');
    event.stopPropagation();
});

$('.XpertTreeMenu').on('click','li.isChild', function(event) {

	$(this).toggleClass('checked');
	i = $(this).find('i');
	i.toggleClass('icon-checkbox-unchecked icon-checkbox-checked');

	autoCheck($(this));

    event.stopPropagation();
});

$('.XpertTreeMenu').on('click','.partial', function(event) {
	childs = $(this).closest('li').find('.isChild');
	i = childs.find('i');
	i.addClass('icon-checkbox-checked').removeClass('icon-checkbox-unchecked');
    childs.addClass('checked');
    autoCheck(childs);
    event.stopPropagation();
});

$('.XpertTreeMenu').on('click','.isFather > nav i.xpert-check', function(event) {
	childs = $(this).closest('li').find('.isChild');
	i = childs.find('i');
	i.removeClass('icon-checkbox-checked').addClass('icon-checkbox-unchecked');
    childs.removeClass('checked');
    autoCheck(childs);
    event.stopPropagation();
});


function organizeMenu(menu){

	var liAll = menu.find('li');
	
	orderByLevel(liAll);

	for (var i = 0; i < liAll.length; i++) {
		for (var j = 0; j < liAll.length; j++) {
			i_me = liAll.eq(i); /*li's first for*/
			j_me = liAll.eq(j); /*li's second for*/
			/*verify if this menu have submenus*/
			if(i_me.attr('id') === j_me.attr('idfrw') && i !== j){
				/*verify if this menu has already a son*/
				if( i_me.hasClass('isFather') ){
					i_me.find('ul').append(j_me);
				} else{
					i_me.append('<ul></ul>');
					i_me.find('nav').append('<i class="icon-ctrl"></i>');
					i_me.find('span').prepend('<i class="xpert-check partial"></i>');
					i_me.addClass('isFather');
					i_me.find('ul').append(j_me);
				}
			}
		}
	}
	liAll.each(function(index, el) {
		if( ! $(this).hasClass('isFather')){
			$(this).prepend('<i class=" xpert-check icon-checkbox-unchecked"></i>')
			$(this).addClass('isChild');
		}
			
	});
}

function autoCheck(li_clicked){

	fathers = li_clicked.parents('.isFather');

	for (var i = 0; i < fathers.length; i++) {

		li_all = fathers.eq(i).children('ul').find('li').length;
		li_checked = fathers.eq(i).children('ul').find('li.checked').length;
		father_icon = fathers.eq(i).children('nav').find('.xpert-check');

		if(li_checked === 0){
			father_icon.replaceWith('<i class="xpert-check partial"></i>')
			fathers.eq(i).removeClass('checked');
		} else if(li_checked < li_all){
			father_icon.replaceWith('<i class="xpert-check partial checked"></i>')
			fathers.eq(i).removeClass('checked');
		} else if(li_checked === li_all){
			father_icon.replaceWith('<i class="xpert-check icon-checkbox-checked"></i>');
			fathers.eq(i).addClass('checked');
		}

	}	
	
}

function orderByLevel(menus){
	
	for (var i = 0; i < menus.length; i++) {
		for (var j = (i+1); j < menus.length; j++) {
			if (menus.eq(i).attr('level') > menus.eq(j).attr('level')){
				menus.eq(i).insertAfter(menus.eq(j));
			}
		}
	}
}
/* END 09-11-2016 01:31 AM */