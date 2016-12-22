/**
 * Created by Helcio on 12/22/2016.
 */

$(function () {
    loadObjectType();
});

var reportUrl = "bean/relatorio.php";

function loadObjectType() {
    $.ajax({
        url: reportUrl,
        type:"POST",
        dataType:"json",
        data:{"intention" : "load object type"},
        success:function (e) {
            loadComoBoxIDandValueReport($("#report-entities"), e.objeto ,"ID", "NAME");
        }
    });
}