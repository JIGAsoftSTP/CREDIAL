$('.list-warr .first small').click(function(event) {
	me = $(this).closest('section');
	me.find('.more').toggleClass('show');
});