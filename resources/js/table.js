


tableEstructure($('.x-table'));

function tableEstructure(myTable){
	head = myTable.find('th');
	var unitGrow = myTable.width();
	var grow = 0;
	head.each(function() {
		grow += parseInt($(this).attr('grow'));
	});
	unitGrow /= grow;
	myTable.find('tr > *').each(function(index, el) {
		var idx=$(this).index();
		grow = head.eq(idx).attr('grow');
		$(this).css('width', (unitGrow * grow) + 'px');
	});
}

$('table.selectable td').click(function(event) {
	$(this).closest('tr')
	.addClass('selected')
	.siblings().removeClass('selected');
});
