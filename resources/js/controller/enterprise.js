/**
 * Created by ahmedjorge on 15-03-2017.
 */
var Enterprise = function () {
    this.name = undefined;
    this.nif = undefined;
    this.telefone = undefined;
    this.mail = undefined;
    this.photo = undefined;
};
/**
 *
 * @type {Enterprise}
 */
var enter = new Enterprise();

loadEnterprise();

$("#logo-ipt").change(function (e)
{

    if(!window.File || !window.FileReader || !window.FileList || !window.Blob)
    { return ; }

    if(this.files.length === 0)
    { return ;}

    var file = this.files[0];

    var formData = new FormData();
    formData.append("intensao","loadLogoEnterprise");
    formData.append("img",file);

    $.ajax({
        url:"../../bean/enterprise.php",
        type:"POST",
        processData: false,
        contentType: false,
        dataType: "json",
        data: formData,
        success: function (data) {
            if (data.return) {
                var css = {
                    "background": "content-box #444 url('" + '../.' + data.img + "') no-repeat"
                    , "background-position": "center"
                    , "background-size": "cover"
                };
                $("#enter-logo").css(css);
                enter.photo = data.img;
            }else{
                enter.photo = undefined;
            }
        }
    });

});

$("#enter-bt").click(function () {
    if(validation1($(".xpert-form input")) && enter.photo != undefined){
        enter.mail = $("#enter-mail").val();
        enter.name = $("#enter-name").val();
        enter.telefone = $("#enter-tel").val();
        enter.nif = $("#enter-nif").val();

        $.ajax({
            url:"../../bean/enterprise.php",
            type:"POST",
            dataType: "json",
            data: {intensao : "saveDataEnterprise", enter : enter},
            success: function (data) {
                if (data.return) {

                }else{

                }
            }
        });
    }
});

function loadEnterprise() {
    $.ajax({
        url:"../../bean/enterprise.php",
        type:"POST",
        dataType: "json",
        data: {intensao : "getDataEnterprise"},
        /**
         * @param ep {Enterprise}
         */
        success: function (ep) {
            $("#enter-mail").val(ep.mail);
            $("#enter-name").val(ep.name);
            $("#enter-tel").val(ep.telefone);
            $("#enter-nif").val(ep.nif);
            enter.photo = ep.photo;

            var css = {
                "background": "content-box #444 url('" + '../.' + enter.photo + "') no-repeat"
                , "background-position": "center"
                , "background-size": "cover"
            };
            $("#enter-logo").css(css);
        }
    });
}