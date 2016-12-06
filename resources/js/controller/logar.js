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
                if(e.state === 1)
                    window.location = "./RClient.php";
                else if(e.state=== 2) {
                    $("b#nome").text(e.nome);
                    $(".mp-change-pwd").fadeIn();
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
                    window.location = "./RClient.php?newUser="+e.msg;
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
                if(e.result)
                    callXpertAlert('A senha foi alterada com sucessso!', new Mensage().checkmark, 10000);
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
    if (getUrlParameter("newUser") != undefined)
        callXpertAlert('Bem vindo a aplicação CREDIAL SA!', new Mensage().notification, 20000);
});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

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
    $.ajax({
        url: "./bean/logar.php",
        type: "POST",
        data: {"intensao": "getDataUser"},
        dataType: "json",
        success: function (e) {
            if(e.result) {
                $(".photo").css({
                    'background': 'content-box #444 url(' + e.user_logo + ') no-repeat',
                    'backgroundPosition': 'center',
                    'backgroundSize': 'cover'
                });
                $(".aut-user-login-name").text(e.user_name_complete);
            }
        }
    });
}