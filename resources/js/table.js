


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
	$('.x-table').prepend('<span class="icon-magic-wand sh-rcrs"></span>')
	$('.x-table').append('<div class="table-resources rowCount"><span>2</span></div>')
	
}


$('table.selectable td').click(function(event) {
	$(this).closest('tr')
	.addClass('selected')
	.siblings().removeClass('selected');
});

$('.x-table').on('click','.sh-rcrs',function(event) {
	$(this).closest('.x-table').find('.table-resources').toggleClass('show');
});

function setRowCount(_value){
	$('.x-table').find('.rowCount span').text(_value);
}