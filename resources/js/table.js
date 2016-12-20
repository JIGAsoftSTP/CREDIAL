


tableEstructure($('.x-table'));

function tableEstructure(myTable){
	head = myTable.find('th');
	var unitGrow = myTable.width();
	console.log(unitGrow);
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
	myTable.prepend('<span class="icon-magic-wand sh-rcrs"></span>')
	if(myTable.find('.rowCount').length !== 1)
	myTable.append('<div class="table-resources rowCount"><span></span></div>')
	
}


$('table.selectable td').click(function(event) {
	$(this).closest('tr')
	.addClass('selected')
	.siblings().removeClass('selected');
});

$('.x-table').on('click','.sh-rcrs',function(event) {
	table = $(this).closest('.x-table');
	setRowCount(table, table.find('tbody tr').length );
	table.find('.table-resources').toggleClass('show');
});

function setRowCount(table, _value){
	table.find('.rowCount span').text(_value);
}