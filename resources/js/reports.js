$('.ctrls .hide-filter').click(function(event) {
	if($('.filter-report').hasClass('float'))
		$('.filter-report').addClass('hidden');
});
$('.ctrls .pin').click(function(event) {
	$(this).toggleClass('pinned');
	$('.filter-report').toggleClass('float');
});

$('.add-section-filter select').change(function(event) {
	$('.add-section-filter b').click();
});
$('.add-section-filter b').click(function(event) {
	selected = $(this).prev();
	filter = $(this).prev().find('option:selected', this).attr('filter');;
	if(!isEmpty(selected))
		filterConstruct(selected, filter);
});

$('.filter-added').on('keyup focusin','input', function(event) {
	
	printWanted($(this), event);
});

$('.filter-added').on('click','.x-autocomplete li', function(event) {
	$(this).closest('.x-autocomplete').find('input').val($(this).text())
});
$('.filter-added').on('click','.xClose',function(event) {
	$(this).closest('section').remove();
});

$('.periodic i:first').click(function(event) {
	$(this).toggleClass('icon-checkbox-checked icon-checkbox-unchecked');
	$('.periodic i.icon-ctrl').click();
});
$('.periodic i.icon-ctrl').click(function(event) {
	$(this).add($('.prd-enabled')).toggleClass('show');
});

$('.filter-added .icon-ctrl').click(function(event) {
	$('.filter-added').toggleClass('hidden');
	$(this).toggleClass('show');
});



function filterConstruct(selected, filter){
	var structure;
	if(!filterExists(filter).exist){
		structure = '<section class="sec-added" filter="'+ filter +'">'+
		'<span class="xClose"><hr><hr></span>'+
		'<span class="x-autocomplete">'+
		'<input type="text" placeholder="'+ filter +'">'+
		'<ul>'+
		returnListFilter(selected)+
		'</ul>'+
		'</span>'+						
		'</section>';
		$('.filter-added').append(structure);
	} else{
		$('.filter-added section').eq(filterExists(filter).position)
		.insertBefore($('.filter-added section').eq(0))
		.find('input').focus();
	}
}

function filterExists(filter){
	var arrayExist = {exist: false, position: 0};
	$('.filter-added section').each(function(index, el) {
		if($(this).attr('filter') === filter){
			arrayExist.exist = true;
			arrayExist.position = $(this).index();
			return false;
		}

	});
	console.log(arrayExist);
	return arrayExist;
}

function returnListFilter(listDB){
	var list = '<li>some</li><li>some1</li><li>some11</li>';
	return list;
}
function printWanted(input, event){
	list = input.next().find('li');
	textIpt = input.val();
	if(!isEmpty(input)){

		list.each(function() {
			if($(this).text().match(textIpt)) {
				$(this).addClass('found');
			} else
			$(this).removeClass('found');

		});
		listSelected = input.next().find('li.found').first();
		list.removeClass('lighted');
		listSelected.addClass('lighted');
		if(event.which === 13){
			input.val(listSelected.text());
			list.removeClass('found');
		}
	} else
		list.removeClass('found');
}