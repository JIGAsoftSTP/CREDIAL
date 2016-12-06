$('.udf input').keyup(function (event) {
    
    if (event.which === 13) {
    	$('#logar').trigger('click');
    }
});
