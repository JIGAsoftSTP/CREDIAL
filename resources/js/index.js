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
registerLoginActivity();

function registerLoginActivity() {
    regUserActivity("bean/activity.php", -1, "Visualizou a pagina de Login", -1, LevelActivity.VISUALIZACAO);
}