$(document).ready(function() {
    $('.multiple li').eq(0).trigger('click');
});

$('.multiple li').click(function(event) {
    CtrlMenu($(this), $('.report-content'));
    event.stopPropagation();
});

$('.search-agency .param').val('1');

$('.sh-srch-agc').click(function(event) {	
	$('.search-agency').toggleClass('hidden');
});
$('.article-report .pin').click(function(event) {	
	$('.search-agency').toggleClass('float');
	$(this).toggleClass('pinned');
});
$('.search-agency .param').change(function(event) {	
	if($(this).val() === '1')
		$('.is-periodic').removeClass('show');
	else
		$('.is-periodic').addClass('show');
});