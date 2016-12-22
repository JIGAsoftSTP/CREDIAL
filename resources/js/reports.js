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
	filter = $(this).prev();
	if(!isEmpty(filter))
		filterConstruct(filter.val());
});

$('.filter-added').on('keyup','input', function(event) {
	printWanted($(this));
});
$('.filter-added').on('click','.xClose',function(event) {
	$(this).closest('section').remove();
});



function filterConstruct(filter){
	var structure;
	if(!filterExists(filter).exist){
		structure = '<section class="sec-added" filter="'+ filter +'">'+
						'<span class="xClose"><hr><hr></span>'+
						'<span class="x-autocomplete">'+
							'<input type="text" placeholder="'+ filter +'">'+
							'<ul>'+
								returnListFilter()+
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

function returnListFilter(){
	var list = '<li>some</li><li>some1</li><li>some11</li>';
	return list;
}
function printWanted(input){
	list = input.next().find('li');
	console.log(list.length)
	textIpt = input.val();
	list.each(function() {
		console.log($(this).text().contains("some"))

	});
	/*list.each(function(index, el) {
		if( $(this).text().contains(textIpt))
			$(this).removeClass('obsolete');
		else
			$(this).addClass('obsolete');
	});*/
}