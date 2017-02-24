/**
 * Created by ahmedjorge on 9/25/16.
 */
loadDataUser();
$("#logar").click(function () {
    var pwd = $("#pwd").val();
    var user = $("#user").val();
    if (pwd != "" && user != "")
    $.ajax({
        url: "./bean/logar.php",
        type: "POST",
        data: {"intensao": "login", "user": user, "pwd": pwd},
        dataType: "json",
        success: function (e) {
            if(e.result){
                if(e.state === 1) {
                    if(e.pageUser !== null) {
                        window.location = e.pageUser["LINK"];
                    }else{
                        callXpertAlert('Utilizador sem previlegio, contante o administrador!', new Mensage().warning, 10000);
                    }
                }
                else if(e.state=== 2) {
                    $("b#nome").text(e.nome);
                    $(".mp-change-pwd").fadeIn();
                    $('#pwd1').focus();
                }
                else
                    callXpertAlert('Acesso Negado!', new Mensage().cross, 10000);
            }
            else { callXpertAlert('Senha ou Usuario incorreto!', new Mensage().warning, 10000); }
        }
    });
});
/*warning;checkmark;cross;notification*/
$("#confirme").click(function () {
    if(isValid($("#pwd1"),$("#pwd2"))){
        var pwd = $("#pwd1").val();
        $.ajax({
            url: "./bean/logar.php",
            type: "POST",
            data: {"intensao": "redinirSenha", "pwd": pwd},
            dataType: "json",
            success: function (e) {
                if(e.result){
                    if(e.pageUser !== null) {
                        window.location = "includes/welcome.html";
                        sessionStorage.setItem("hasBeenActiveNow", e.pageUser["LINK"] );
                    }else{
                        $(".mp-change-pwd").fadeOut(800);
                        callXpertAlert('Utilizador Sem previlegio, contante o administrador!', new Mensage().warning, 10000);
                    }
                }
                else { callXpertAlert(e.msg, new Mensage().warning, 10000); }
            }
        });
    }
    else{
        callXpertAlert('As senhas não coincidem!', new Mensage().warning, 10000);
    }
});

$("#pwd1").keyup(function () {
    isValid($("#pwd1"),$("#pwd2"));
});

$("#pwd2").keyup(function () {
    isValid($("#pwd1"),$("#pwd2"));
});

function isValid(pwd1,pwd2) {
    if (pwd1.val() === pwd2.val()) {
        var css = {color:"",borderColor:""};
        pwd2.css(css);
        pwd1.css(css);
        return true;
    }
    else if (pwd1.val() !== "" && pwd2.val() !== "") {
        var css = {color:"red",borderColor:"red"};
        pwd1.css(css);
        pwd2.css(css);
        return false;
    }
    else {return false;}

}

$("#changePwd").click(changePwd);

function changePwd() {
    if(isValid($("#pwdN1"), $("#pwdN2")) && $("#pwdAT").val()!=="" ){
        $.ajax({
            url: "./bean/logar.php",
            type: "POST",
            data: {"intensao": "changePwd","pwdOld":$("#pwdAT").val(),"pwdNew":$("#pwdN1").val()},
            dataType: "json",
            success: function (e) {
                if(e.result) {

                    regUserActivity("./bean/activity.php", -1 , "Alterou a sua senha!", -1, LevelActivity.VISUALIZACAO );

                    callXpertAlert('A senha foi alterada com sucessso!', new Mensage().checkmark, 10000);
                    resetForm($(".mp-change-pwd"));
                    $("#changePwd").closest(".bt-no-option").click();
                }
                else
                    callXpertAlert(e.msg, new Mensage().cross, 10000);
            }
        });
    }
}

$("#logout").click(logOut);

function logOut() {
    $.ajax({
        url: "./bean/logar.php",
        type: "POST",
        data: {"intensao": "logOut"},
        dataType: "json",
        success: function (e) {
            window.location = "./index.php";
        }
    });
}

$(document).ready(function (e) {
    if (sessionStorage.getItem("hasBeenActiveNow") !== null)
        $("#wel-link").attr("href", "../"+sessionStorage.getItem("hasBeenActiveNow") );
    sessionStorage.removeItem("hasBeenActiveNow");
});


// var getUrlParameter = function getUrlParameter(sParam) {
//     var sPageURL = decodeURIComponent(window.location.search.substring(1)),
//         sURLVariables = sPageURL.split('&'),
//         sParameterName,
//         i;
//
//     for (i = 0; i < sURLVariables.length; i++) {
//         sParameterName = sURLVariables[i].split('=');
//         if (sParameterName[0] === sParam) {
//             return sParameterName[1] === undefined ? true : sParameterName[1];
//         }
//     }
// };

$("#user").keyup(function () {
    $.ajax({
        url: "./bean/logar.php",
        type: "POST",
        data: {"intensao": "getImageUser","user_id":$(this).val()},
        dataType: "json",
        success: function (e) {
            $(".photo").css({'background':'content-box #444 url('+e.img+') no-repeat',
                'backgroundPosition': 'center',
                'backgroundSize': 'cover'});
        }
    });
});
// user-name-complete
function loadDataUser() {
    var l = location+"";
    if(!l.$$("welcome"))
        $.ajax({
            url: "./bean/logar.php",
            type: "POST",
            data: {"intensao": "getDataUser"},
            dataType: "json",
            success: function (e) {
                if(e.result) {
                    $(".default-user-img").css({
                        'background': 'content-box #444 url(' + e.user_logo + ') no-repeat',
                        'backgroundSize': 'cover'
                    });
                    $(".aut-user-login-name").text(e.user_name_complete);
                    $("#menu-ag-user").text(e.user_perfil+" na "+e.user_agency);
                    appLog = e.user_nif;
                     window.onpaint = getAppLog();
                }
            }
        });
}

var feedback = function () {};
feedback.prototype.type = undefined;
feedback.prototype.text = undefined;
feedback.prototype.other = undefined;
feedback.prototype.mail = undefined;

$("#cli-feed-bt").click(function () {
    if(validation1($(".content-feed input, .content-feed textarea, .content-feed select")))
    {
        var feed = new feedback();
        feed.mail = $("#cli-feed-mail").val();
        feed.text = $("#cli-feed-text").val();
        feed.type = $("#cli-feed-type").val();
        feed.other = $("#cli-feed-other").val();
        $.ajax({
            url: "./bean/logar.php",
            type: "POST",
            data: {"intensao": "sendfeeback", feed : feed},
            dataType: "json",
            success: function (e) {
                if(e.result) {
                    callXpertAlert('A sua mensagem foi enviada com sucesso!', new Mensage().checkmark, 80000);
                    resetForm($(".mp-feedback").fadeOut(300));
                }
            }
        });
    }
});

var refresh = function () {};
/**
 * @type {string}
 * @variation {CLIENT,PAYMENT,CREDIT}
 */
refresh.prototype.dataType = null;


function doRefresh() {
    var re = sessionStorage.getItem("refresh");
    $.ajax({
        url: "./bean/refreshDataBD.php",
        type: "POST",
        data: {"intensao": "refresh", re : re},
        dataType: "json",
        success: function (e) {
            if(e.result) {
                sessionStorage.removeItem("refresh");
            }
        }
    });
}
var res = undefined;
function saveRefresh(re) {
    if (sessionStorage.getItem("refresh") == null) {
        res = {};
        res.list=[re];
        sessionStorage.setItem("refresh", JSON.stringify(res));
    }
    else {
        res = $.parseJSON(sessionStorage.getItem("refresh"));
        var list = res.list;
        list[list.length] = re;
        res.list=list;
        sessionStorage.setItem("refresh", JSON.stringify(res));
    }
    doRefresh();
}

if (sessionStorage.getItem("refresh") !== null) doRefresh();

function getAppLog(){
    logData = getDataStorage(localStorage, 'user-' + appLog);
        for (var key in logData) {
            if(logData[key] !== "")
            $('#' + key).addClass(logData[key])
    }
}
function setAppLog(element, classLog){
    idLog = element.attr('id');
    hasClass = element.hasClass(classLog);    
    setDataStorage(localStorage, 'user-' + appLog, idLog, hasClass ? classLog : "");
}