$('.m-search input').focusin(function(event) {
	$(this).parent().addClass('focus')
});
$('.m-search input').focusout(function(event) {
	$(this).parent().removeClass('focus')
});

$('.m-search input').keyup(function(event) {
	advSearch($(this), $('.user-names li'));
});
$('.user-names li').click(function(event) {
	$(this).addClass('active').siblings().removeClass('active');
});

$('.super-search *').focusin(function(event) {
	$(this).parent().addClass('focus')
});
$('.super-search *').focusout(function(event) {
	$(this).parent().removeClass('focus')
});
$('.super-search input').keyup(function(event) {
	advSearch($(this), $('.list-logs section'));
});

$('.view-m-det').add('.div-statitcs .x-close').click(function(event) {
	$('.div-statitcs').toggleClass('show');
});

