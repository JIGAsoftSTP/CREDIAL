$('aside .multiple').on('click','li',function(event) {
	$('.title-report').text($(this).text());
});


$('.ctrls .hide-filter').click(function(event) {
	if($('.filter-report').hasClass('float'))
		$('.filter-report').addClass('hidden');
});
$('.ctrls .pin').click(function(event) {
	$(this).toggleClass('pinned');
	$('.filter-report').toggleClass('float');
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


$('.callFilter').click(function(event) {
	$('.filter-report').removeClass('hidden');
});

