/**
 * Created by ahmedjorge on 10/27/16.
 */
$("#add-ph-user").change(function (e)
{
    if(!window.File || !window.FileReader || !window.FileList || !window.Blob)
    { return ; }

    if(this.files.length === 0)
    { return ;}

    var file = this.files[0];

    var formData = new FormData();
    formData.append("intensao","loadImagem");
    formData.append("img",file);

    $.ajax({
        url:"./bean/utilizador.php",
        type:"POST",
        processData: false,
        contentType: false,
        dataType: "json",
        data: formData,
        success: function (data) {
            var css = {"background":"content-box #444 url('"+data.img+"') no-repeat"
                ,"background-position":"center"
                ,"background-size":"cover"};
            $(".adm-ph-user").css(css);
            $(".adm-ph-user").removeClass("default-user-img");
            imageUser = "."+data.img;

        }
    });

});

var imageUser = undefined;
function regUser() {

    if(isValideParanRegUser()) {
        var formDataReg = new FormData();
        formDataReg.append("intensao", "regUser");
        formDataReg.append("photofile", imageUser);
        formDataReg.append("nif", $("#gest-user-nif").val());
        formDataReg.append("username", $("#gest-user-nome").val());
        formDataReg.append("usersurname", $("#gest-user-apelido").val());
        formDataReg.append("idAgencia", $("#gest-user-agencia").val());
        formDataReg.append("typeperfil", $("#gest-user-type").find("i.icon-radio-checked2").attr("value"));
        for (var o =0; o< listMenuSelect.length; o++)
            formDataReg.append("menu[]",listMenuSelect[o]);
        $.ajax({
            url: "./bean/utilizador.php",
            type: "POST",
            processData: false,
            contentType: false,
            dataType: "json",
            data: formDataReg,
            success: function (data) {
                if (data.result) {
                    callXpertAlert("Novo utilizador registado com sucesso!", new Mensage().checkmark, 10000);
                    $(".add-new-user").find("input:text").val("");
                    $(".add-new-user").find("select").val("0");
                    var css = {"background":"content-box #444 url('./resources/img/user.png') no-repeat"
                        ,"background-position":"center"
                        ,"background-size":"cover"};
                    $(".adm-ph-user").css(css);
                    imageUser = undefined;
                    loadListClient();
                }
                else {
                    callXpertAlert(data.return["MESSAGE"], new Mensage().cross, 10000);
                }
            },
            beforeSend: function () {  $(".mp-loading").fadeIn(); },
            complete: function () { $(".mp-loading").fadeOut();}
        });
    }
}

$("#gest-user-add").on("click",regUser);

function isValideParanRegUser() {
    return validation1($(".add-new-user input:text, .add-new-user select")) && alertForAddImagem() && alertForSelectMenu();
}

function alertForAddImagem() {
    if(imageUser == undefined){
        callXpertAlert('Por favor, carrege uma Imagem!', new Mensage().cross, 10000);
        return false;
    }
    else return true;
}

function alertForSelectMenu() {
    getSelectMenu();
    if(listMenuSelect.length == 0){
        callXpertAlert('Por favor, selecione Menu para o Utilizador!', new Mensage().cross, 10000);
        $(".icon-cog").click();
        return false;
    }
    else return true;
}
var listUser = undefined;
function loadListClient() {
     listUser = new ListUser();
    $.ajax({
        url: "./bean/utilizador.php",
        type: "POST",
        data: {"intensao": "loadDataUser"},
        dataType: "json",
        success: function (e) {
            for (var u = 0; u < e.return.length; u++) {
                var us = new User();
                us.nome = e.return[u]["NAME"];
                us.apelido = ((us.nome == e.return[u]["SURNAME"]) ? "" : e.return[u]["SURNAME"]);
                us.id = e.return[u]["NIF"];
                us.idAgencia = e.return[u]["AGENCIA ID"];
                us.agencia = e.return[u]["AGENCIA"];
                us.nif = e.return[u]["NIF"];
                us.nivel = e.return[u]["PERFIL"];
                us.estado = e.return[u]["STATE"];
                us.img = e.return[u]["PHOTO"];
                us.idNivel = e.return[u]["PERFIL ID"];
                listUser.addUser(us);
            }
            listUser.bluider();
            $(".list-user").empty().append(listUser.getList());
            for (var ui = 0; ui < listUser.list.length; ui++) {
                var css = {"background":"content-box #444 url('"+listUser.list[ui].img+"') no-repeat"
                    ,"background-position":"center"
                    ,"background-size":"cover"};
                $(".default-user-img-"+listUser.list[ui].id).css(css);
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut(); }
    });
}

$("#section-user").click(function () {
    loadListClient();
});

var listMenuSelect = [];
function getSelectMenu() {
    listMenuSelect = [];
    $("#menuAccessUser li").each(function (e) {
        if($(this).find("i").hasClass("checked") || $(this).find("i").hasClass("icon-checkbox-checked"))
            listMenuSelect[listMenuSelect.length] = $(this).attr("_id");
    });
}

$(".list-user").on("click", "i.icon-undo2", function () {
    console.info(listUser.list[$(this).closest("section").attr("item")]);
})
    .on("click", "i.icon-pencil", function () {
        console.info(listUser.list[$(this).closest("section").attr("item")]);
    })
    .on("click", "i.icon-unlocked", function () {
        console.info(listUser.list[$(this).closest("section").attr("item")]);
    })
    .on("click", "i.icon-lock", function () {
        console.info(listUser.list[$(this).closest("section").attr("item")]);
    });