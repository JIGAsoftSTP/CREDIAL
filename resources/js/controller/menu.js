/**
 * Created by ahmedjorge on 12/15/16.
 */
/**
 *
 * @param user {User}
 */
var menusText = undefined;
function loadMenuUserLogado(){
    $.ajax({
        url:"./bean/utilizador.php",
        type:"POST",
        dataType: "json",
        data: {intensao:"loadMENU-USER-log"},
        success: function (data) {
            var body = $("body").attr('id');
            var seletedMenu = Number(body.substring(1,body.length));
            var menus = data.MENU;
            // var idSuper = getUrlParameter("id");
           for (var gg =0; gg < menus.length; gg++){
               if(menus[gg]["LEVEL"] == "0")
               $("#principal-menu").append('<li id="pri-'+menus[gg]['ID']+'" '+((gg === 0) ? 'class="active-menu"' : '' )+'><a href="'+menus[gg]['LINK']+'" id="m'+(menus[gg]['ID'])+'">'+menus[gg]['NAME']+'</a></li>');

               if(menus[gg]["SUPER.ID"] === seletedMenu+""){
                   loadSubMenuSecondaryADM(menus[gg]);
               }

               // var cod = menus[gg]["SUPER.COD"];
               // if(cod !== null && $("[id='"+cod+"']").length > 0){
               //     var ul = document.getElementById(cod);
               //     var li = document.createElement("li");
               //     li.id = menus[gg]["COD"];
               //     li.setAttribute("urldata", menus[gg]['LINK']);
               //     var liText = document.createTextNode(menus[gg]['NAME']);
               //     li.appendChild(liText);
               //     ul.appendChild(li);
               // }
           }
            menusText = menus;
            $('.single').find("li").eq(0).trigger('click');
        }
    });
}
loadMenuUserLogado();

var isFirstADM = true;
function loadSubMenuSecondaryADM(menus) {
   var mn = '<li id="'+menus['COD']+'" urldata="'+menus['LINK']+'" '+((isFirstADM) ? 'class="active"' : '' )+'>' +
    '<i class="'+menus["ICON"]+'"></i>' +
    '<span>'+menus['NAME']+'</span>' +
    '</li>';
   $("#secondary-menu").append(mn);
    isFirstADM = false;
}

var isFirstReport = true;
function loadSubMenuSecondaryReport(menus) {
    var mn = '<li '+((isFirstReport) ? 'class="active"' : '')+'>' +
        '<nav>' +
        '<span><i class="'+menus["ICON"]+'"></i>'+menus['NAME']+'</span>' +
        '<i class="icon-ctrl"></i>' +
        '</nav>' +
        '<ul id="'+menus["COD"]+'">' +
        '</ul>' +
        '</li>';
    $("#secondary-menu").append(mn);
    isFirstReport = false;
}

$('.multiple').on("click", "li", function(event) {
    CtrlMenu($(this), $('.report-content'));
    event.stopPropagation();
});

$('.single').on("click", "li", function(event) {
    CtrlMenu($(this), $('.article-admin'));
    event.stopPropagation();
});
