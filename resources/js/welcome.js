

$(document).scroll( function (event) {
    if($(this).scrollTop() > 100 )
        $('.header').addClass('mmn');
    else
        $('.header').removeClass('mmn');
});