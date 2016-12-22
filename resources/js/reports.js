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

$('.filter-added').on('focusout','input', function(event) {	
	$(this).next().find('li').removeClass('found');
});



$('.filter-added').on('mousemove','.x-autocomplete li', function(event) {
	
	Ipt = $(this).parent().prev();
	Ipt.val($(this).text());
	event.stopPropagation();
});
$('.filter-added').on('mouseover','.x-autocomplete li', function(event) {
	lighting($(this));
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
	selected = parseInt(selected.val());
	if(!filterExists(filter).exist){
		structure = '<section class="sec-added" filter="'+ filter +'">'+
		'<span class="xClose"><hr><hr></span>'+
		'<span class="x-autocomplete">'+
		'<input type="text" placeholder="'+ filter +'">'+
		'<ul id="'+ selected +'">'+
				setTimeout( function(){returnListFilter(selected)}, 1000);+
		'</ul>'+
		'</span>'+						
		'</section>';
		$('.filter-added').append(structure);
		console.info("value "+returnListFilter(selected));
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
	var list="";
	$.ajax({
		url: "bean/relatorio.php",
		type:"POST",
		dataType:"json",
		data:{"intention" : "load object values", "id" : listDB},
		success:function (e) {
			for(var i=0;i<e.objeto.length;i++){
				$("ul#"+listDB).append('<li>'+e.objeto[i]["DESCRICAO"]+'</li>');
			}

        }
	});
}

function printWanted(input, event){
	list = input.next().find('li');
	textIpt = input.val();
	if(!isEmpty(input)){

		list.each(function() {
			if($(this).text().toLowerCase().match(textIpt.toLowerCase())) {
				$(this).addClass('found');
			} else
			$(this).removeClass('found');

		});
		listSelected = input.next().find('li.lighted');
		lighting(listSelected);
		if(event.which === 13)
			input.val(listSelected.text());
	} else
		list.removeClass('found');
}

function lighting(el){
	el.addClass('lighted').siblings().removeClass('lighted');
	
}