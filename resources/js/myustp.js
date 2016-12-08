
var actualSec = 1;
$('.next').click(  function(event) {
    nextStep( $('.master-signup'));
    actualSection ++;
    $('.master-signup').css('left' -(actualSection*100) + '%');

});
$('.prev').click(  function(event) {
    prevStep( $('.master-signup') );
});

$('.master-sign-log small').click(  function(event) {
    $('.master-sign-log > div').toggleClass('hide');
});
