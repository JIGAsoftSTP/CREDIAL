


tableEstructure($('table'));

function tableEstructure(myTable){
	myTable.css('max-height', myTable.parent().height() + 'px');
	var column = myTable.find('tbody td');
	var hWidth = myTable.find('thead').width();
	column.each(function(index, el) {
		var _index = $(this).index();
		var hColumn = myTable.find('th').eq(_index);
		var colWidth = (parseInt(hColumn.attr('width')) * hWidth / 100);
		$(this).css('width', colWidth + 'px');
		hColumn.css('width', colWidth + 'px');
	});
}

$('table.selectable td').click(function(event) {
	$(this).closest('tr')
	.addClass('selected')
	.siblings().removeClass('selected');
});
