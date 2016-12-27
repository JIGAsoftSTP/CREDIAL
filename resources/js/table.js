(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);


tableEstructure($('.x-table'));

function tableEstructure(myTable){	
	head = myTable.find('th');
	var unitGrow = myTable.width();
	expand = myTable.hasClass('expand');
	var grow = 0;
	head.each(function() {
		grow += getGrow($(this));
	});
	unitGrow /= grow;
	myTable.find('tr > *').each(function(index, el) {

		idx = $(this).index();		

		$(this).css('width', unitGrow * getGrow(head.eq(idx)) + 'px');
	});
	myTable.prepend('<span class="icon-magic-wand sh-rcrs"></span>')
	if(myTable.find('.rowCount').length !== 1)
	myTable.append('<div class="table-resources rowCount"><span></span></div>')
	
}

$(".x-table.auto-width").resize(function(e){
	tableEstructure($('.x-table'));
});

$('.x-table').on('click','.selectable td', function(event) {
	$(this).closest('tr')
	.addClass('selected')
	.siblings().removeClass('selected');
	$(this).closest('.x-table').find('.table-resources').removeClass('show');
});

$('body').on('click','.x-table .sh-rcrs',function(event) {
	table = $(this).closest('.x-table');
	setRowCount(table);
	table.find('.table-resources').toggleClass('show');
});

function setRowCount(table){
	rows = table.find('tbody tr').length;
	table.find('.rowCount span').text(rows + (rows !== 1 ? ' registos': ' registo'));
}
function expandTable(myTable){
	myTable.toggleClass('expand');
	tableEstructure(myTable);
}

function getGrow(column){
	growAttr = column.attr('grow');
	growAttr2 = column.attr('grow2');
	expand = column.closest('.x-table').hasClass('expand');

	if(expand)			
		growAttr = growAttr2 === undefined ? growAttr : growAttr2; 
	return parseInt(growAttr);
}