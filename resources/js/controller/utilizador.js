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
        url:"../../bean/utilizador.php",
        type:"POST",
        processData: false,
        contentType: false,
        dataType: "json",
        data: formData,
        success: function (data) {
            var css = {"background":"content-box #444 url('"+'../.'+data.img+"') no-repeat"
                ,"background-position":"center"
                ,"background-size":"cover"};
            $(".adm-ph-user").css(css);
            $(".adm-ph-user").removeClass("default-user-img");
            imageUser = "."+data.img;

        }
    });

});


var imageUser = undefined;
var userActivityAddress = "../../bean/activity.php";
var addUserActivity = undefined;


regUserActivity(userActivityAddress, -1, "Visualizou Utilizadores", -1, LevelActivity.VISUALIZACAO);
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

        addUserActivity = {"NIF":  $("#gest-user-nif").val(), "Nome": $("#gest-user-nome").val(),
        "Apelido" : $("#gest-user-apelido").val(), "Agência" : $("#gest-user-agencia :selected").text()};


        for (var o =0; o< listMenuSelect.length; o++)
            formDataReg.append("menu[]",listMenuSelect[o]);
        $.ajax({
            url: "../../bean/utilizador.php",
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
                    regUserActivity(userActivityAddress, -1, "Registou um novo Utilizador",
                        JSON.stringify(addUserActivity), LevelActivity.CRIACAO);
                    var css = {"background":"content-box #444 url('../../resources/img/user.png') no-repeat"
                        ,"background-position":"center"
                        ,"background-size":"cover"};
                    $(".adm-ph-user").css(css);
                    imageUser = undefined;
                    setTimeout(loadListUser,4000,true);
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

$("#gest-user-add").on("click", function () {
    if(USEREDITE) editeClient();  else regUser();
});

function isValideParanRegUser() {
    return validation1($(".add-new-user input:text, .add-new-user select")) && alertForAddImagem() && alertForSelectMenu();
}

function alertForAddImagem() {
    if(imageUser == undefined){
        callXpertAlert('Por favor, carregue uma Imagem!', new Mensage().cross, 10000);
        return false;
    }
    else return true;
}

function alertForSelectMenu() {
    if(listMenuSelect.length == 0){
        callXpertAlert('Por favor, selecione Menu para o Utilizador!', new Mensage().cross, 10000);
        $(".icon-cog").click();
        return false;
    }
    else if ( $("#gest-user-type").find("i.icon-radio-checked2").attr("value") == undefined)
    {
        callXpertAlert('Por favor, selecione Nivel para o Utilizador!', new Mensage().cross, 10000);
        $(".icon-cog").click();
        return false;
    }
    else return true;
}
var listUser = new ListUser();
var dataUserActive = undefined;
var dataOtherUser = undefined;
var listMenus = undefined;
function loadListUser(at) {
    $.ajax({
        url: "../../bean/utilizador.php",
        type: "POST",
        data: {"intensao": "loadDataUser"},
        dataType: "json",
        success: function (e) {
            dataUserActive = e.userActive;
            dataOtherUser = e.otherUser;
            listUser = new ListUser();
            $(".list-user").empty();
            $('.filter li.active').click();
            if(at === undefined) {
                listMenus = e.listMenu;
                loadMenu(listMenus);
                loadComoBoxIDandValue($(".listAgencies"), e.agencias, "ID", "NOME");
                loadTypeUser(e.typesUser);
            }
        },
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();
            if(at !== undefined)
                callXpertAlert("Lista de Utilizador actualizada", new Mensage().notification, 10000);
                transformDataUserToUser(dataUserActive,"Active", 500);
        }
    });
}

// $("#section-user").click(function () {
    loadListUser();
// });

var listMenuSelect = [];
function getSelectMenu() {
    listMenuSelect = [];
    $("#menuAccessUser li").each(function (e) {
        if($(this).find("i").hasClass("checked") || $(this).find("i").hasClass("icon-checkbox-checked"))
            listMenuSelect[listMenuSelect.length] = $(this).attr("_id");
    });
}
/**
 *
 * @type {User}
 */
var user = undefined;

$(".list-user").on("click", "i.icon-undo2", function () {
    clearInterval(addInterUser);
    user =  getSelectedUser.call(this);
    user.disableMode = "F";
    disibleUser();
})
    .on("click", "i.icon-pencil", function () {
        resetForm($(".add-new-admin"));
        // resetForm($(".mp-menu-user"));
        USEREDITE = true;
        user = getSelectedUser.call(this);
        $("#gest-user-nif").val(user.nif).attr("disabled",true);
        $("#gest-user-nome").val(user.nome);
        $("#gest-user-apelido").val(user.apelido);
        $("#gest-user-agencia").val(user.idAgencia == null ? "0" : user.idAgencia);
        $("#gest-user-type").find("i").removeClass("icon-radio-checked2").addClass("icon-radio-unchecked")
            .each(function () {
            if($(this).attr("value") === user.idNivel) {
                $(this).removeClass("icon-radio-unchecked").addClass("icon-radio-checked2");
                return true;
            }
        });

        listMenuSelect = [];
        user.menu.forEach(function (men) {
            listMenuSelect[listMenuSelect.length] = men["ID"];
        });

        imageUser = "."+user.img;

        isNull($("#gest-user-agencia"));

        var css = {"background":"content-box #444 url('"+'../.'+user.img+"') no-repeat"
            ,"background-position":"center"
            ,"background-size":"cover"};
        $(".adm-ph-user").css(css);

        disableAllCheck();
        for (var b = 0; b < user.menu.length; b++){
            var ids = user.menu[b]['ID'];
            if(!thisMenuHaveSon(ids, user.menu)) {
                seletedMenuUser(ids);
            }
        }
        openFatherHaveSonSelected();
        autoCheck($("li.isChild"));
        addNewItem($(this).closest('section').find('h4'));
    })
    .on("click", "i.icon-lock", function () {
        clearInterval(addInterUser);
        user =  getSelectedUser.call(this);
        user.disableMode = "B";
        disibleUser();
    });

function disibleUser() {

    $.ajax({
        url:"../../bean/utilizador.php",
        type:"POST",
        dataType: "json",
        data: {intensao:"disibleUSER", USER : user},
        success: function (data) {
            if (data.result) {

                if(user.disableMode === "F"){
                    callXpertAlert("Palavra-Passe foi redifinida com sucesso! ", new Mensage().checkmark, 10000);
                    regUserActivity(userActivityAddress, -1, "Redifiniu a palavra-passe do Utilizador "+user.nome+" "+user.apelido, -1, LevelActivity.ATUALIZACAO);
                }
                else{
                    callXpertAlert("Utilizador foi desativado com sucesso! ", new Mensage().checkmark, 10000);
                    regUserActivity(userActivityAddress, -1, "Desativou o Utilizador "+user.nome+" "+user.apelido, -1, LevelActivity.ATUALIZACAO);
                }
                setTimeout(loadListUser,4000,true);
            }
            else {
                callXpertAlert(data.return["MESSAGE"], new Mensage().cross, 10000);
            }
        }
    });
}
/**
 *
 * @param id {string}
 */
function seletedMenuUser(id) {
    $("#menuAccessUser").find("li").each(function (e) {
        if($(this).attr("_id") === id) {
            if($(this).hasClass("isFather"))
                $(this).find(".partial").trigger("click");
            else
                $(this).trigger("click");
        }
    })
}

function loadMenu(listMenu) {
    for (var j=0; j< listMenu.length; j++)
        $("#menuAccessUser").append('<li _id="'+listMenu[j]['ID']+'" id="'+listMenu[j]['COD']+'" level="'+listMenu[j]['LEVEL']+'" idfrw="'+((listMenu[j]['SUPER.COD']==null) ? listMenu[j]['COD'] : listMenu[j]['SUPER.COD'] )+'">' +
            '<nav><span>'+listMenu[j]["NAME"]+'</span></nav>' +
            '</li>');
    organizeMenu($('#menuAccessUser'));
}

$("#gest-user-menu-change").click(function () {
    getSelectMenu();
    $('.mp-menu-user').fadeOut(300);
});

function loadTypeUser(typeUser) {
    for(var r = 0; r < typeUser.length; r++){
        $("#gest-user-type").append('<i value="'+typeUser[r]['ID']+'" class="icon-radio-'+((r==0) ? "checked2" : "unchecked")+'"><span> '+typeUser[r]['NAME']+'</span></i>');
    }
}

$("#gest-user-type").on("click","i", function () {
    $.ajax({
        url:"../../bean/utilizador.php",
        type:"POST",
        dataType: "json",
        data: {intensao:"loadMENU-Perfil", perfil : $(this).attr("value")},
        success: function (data) {
            var menu = data.MENU;
            //resetForm($(".mp-menu-user"));
            disableAllCheck();
            setTimeout(function () {
                for (var v = 0; v < menu.length; v++){
                    seletedMenuUser(menu[v]['ID']);
                }
                autoCheck($("li.isChild"));
            },700);
        }
    });
});

function disableAllCheck() {
    $("#menuAccessUser").empty();
    loadMenu(listMenus);
}

function thisMenuHaveSon(id, menu) {
    for (var b = 0; b < menu.length; b++){
        if(id === menu[b]['SUPER.ID']) {
            return true
        }
    }
    return false;
}

/**
 *
 * @type {User}
 */
var userChange = new User();
function editeClient() {
    if(isValideParanRegUser()) {

        clearInterval(addInterUser);

        userChange.nif = user.nif;
        userChange.nome = $("#gest-user-nome").val();
        userChange.apelido =  $("#gest-user-apelido").val();
        userChange.idAgencia = $("#gest-user-agencia").val();
        userChange.idNivel = $("#gest-user-type").find("i.icon-radio-checked2").attr("value");
        userChange.menu = listMenuSelect;
        userChange.img = imageUser;

        var change = {
            menu : areChangeMenu(),
            names: areChangeNames(),
            agencia: areChageAgencia(),
            nivel: areChengeNivel(),
            avatar: areChengeAvatar()
        };

        if(!change.menu&&!change.agencia&&!change.nivel&&!change.names&&!change.avatar){
            callXpertAlert("Nenhuma alteração foi efetuada!", new Mensage().warning, 10000);
            return false;
        }
        $.ajax({
            url:"../../bean/utilizador.php",
            type:"POST",
            dataType: "json",
            data: {intensao:"alter-user", USER : userChange, change : change},
            success: function (data) {
                if (data.result) {
                    callXpertAlert("O Utilizador foi editado com sucesso!", new Mensage().checkmark, 10000);
                    regUserActivity(userActivityAddress, -1, "Atualizou Informações do Utilizador com nif "+$("#gest-user-nif").val(), -1, LevelActivity.ATUALIZACAO);
                    resetForm($(".add-new-admin"));
                    resetForm($(".mp-menu-user"));
                    var css = {"background":"content-box #444 url('../../resources/img/user.png') no-repeat"
                        ,"background-position":"center"
                        ,"background-size":"cover"};
                    $(".adm-ph-user").css(css);
                    imageUser = undefined;
                    $('.add-new-admin .closeIt').click();
                    setTimeout(loadListUser,4000,true);
                }
                else {
                    callXpertAlert(data.message, new Mensage().cross, 10000);
                }
            },
            beforeSend: function () {  $(".mp-loading").fadeIn(); },
            complete: function () { $(".mp-loading").fadeOut();}
        });
    }
}


function areChangeMenu() {
    if(user.menu.length !== userChange.menu.length )
        return true;
    for (var meC = 0; meC < userChange.menu.length; meC++){
        var ex = false;
       for (var me = 0; me < user.menu.length; me++ ){
           if(user.menu[me]['ID']+"" === userChange.menu[meC]+"")
               ex = true;
       }
       if (!ex)
           return true;
    }
    return false;
}

function areChangeNames() {
    return user.nome+user.apelido != userChange.nome+userChange.apelido;
}

function areChageAgencia() {
    return user.idAgencia != userChange.idAgencia;
}

function areChengeNivel() {
    return userChange.idNivel != user.idNivel;
}

function areChengeAvatar() {
    return userChange.img != ("."+user.img);
}

function openFatherHaveSonSelected() {
    $(".XpertTreeMenu").find('.isFather').each(function () {
        if ($(this).hasClass("checked")) {
            $(this).find('.icon-ctrl').click();
        }
    });
}

var totalDataUser = undefined;
/**
 *
 * @type {Number}
 */
var iDataUser = 0;
/**
 * @type {*}
 */
var addInterUser = undefined;

/**
 *
 * @param data {[*]}
 * @param type {String}
 * @param time {Number}
 */
function transformDataUserToUser(data, type, time) {
    iDataUser = 0;
    totalDataUser = data.length;
    if (totalDataUser > 0) {
        addInterUser = setInterval(function () {
            var us = new User();
            us.nome = data[iDataUser]["NAME"];
            us.apelido = ((us.nome == data[iDataUser]["SURNAME"]) ? "" : data[iDataUser]["SURNAME"]);
            us.id = data[iDataUser]["NIF"];
            us.idAgencia = data[iDataUser]["AGENCIA ID"];
            us.agencia = data[iDataUser]["AGENCIA"];
            us.nif = data[iDataUser]["NIF"];
            us.nivel = data[iDataUser]["PERFIL"];
            us.estado = data[iDataUser]["STATE"];
            us.img = data[iDataUser]["PHOTO"];
            us.idNivel = data[iDataUser]["PERFIL ID"];
            us.menu = data[iDataUser]["MENU"];

            if (type == "Active") {
                listUser.addUser(us);
                listUser.bluiderActive(iDataUser);
            } else {
                listUser.addOtherUser(us);
                listUser.bluiderOther(iDataUser);
            }
            iDataUser++;

            if (iDataUser == totalDataUser) {
                clearInterval(addInterUser);
                if (type == "Active") {
                    transformDataUserToUser(dataOtherUser, "Other", 250);
                }
                else {
                    $('.filter li.active').click();
                    if (!isEmpty($('.search input'))) {
                        $('.search input').keyup();
                    }
                }
            }
        }, time);
    }
}

function getSelectedUser() {
    return (($(this).closest("section").attr("status") == "Ativo")
        ? listUser.listActive[$(this).closest("section").attr("item")]
        : listUser.listOther[$(this).closest("section").attr("item")]);
}

/**
 * @param user {User}
 */
function getImageUser(user) {
    $.ajax({
        url:"../../bean/utilizador.php",
        type:"POST",
        dataType: "json",
        data: {intensao : "loadImage-Perfil", USER : user},
        success: function (data) {
            user.img = data.img;
            user.imgSmall = data.imgSmall;
            user.imgTiny = data.imgTiny;
            var css = {
                "background": "content-box #444 url('../." + user.img + "') no-repeat"
                , "background-position": "center"
                , "background-size": "cover"
            };
            $(".default-user-img-" + user.id).css(css);
        }
    });
}
