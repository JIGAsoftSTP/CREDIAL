

/*################     CHEQUE  	#####################*/

$('.filter-type-cheq li').click(function(event) {
	$(this).toggleClass('active').siblings().removeClass('active');
});