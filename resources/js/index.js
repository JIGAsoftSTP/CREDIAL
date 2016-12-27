$('.udf input').keyup(function (event) {
    
    if (event.which === 13) {
    	$('#logar').trigger('click');
    }
});
$('.mp-change-pwd input').keyup(function (event) {
    
    if (event.which === 13) {
    	$('#confirme').trigger('click');
    }
});
