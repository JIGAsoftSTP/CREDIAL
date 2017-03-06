/**
 * Created by Helcio on 2/23/2017.
 */

$(document).ready(function() {

    loadUser();

    $("#activitySearch-user").keyup(function () {
        advSearch($(this), $(".user-names li"));
    });
    $("#filterActivity").change(function()
    {
        filterLoaded();
    });

    $(".x-close").click(function () {
        $(".div-statitcs").removeClass("show");
    });

    $("#reportActivity-initialDate").change(function () {

        if($("#reportActivity-initialDate").val() !== "" &&
            $("#reportActivity-finalDate").val() !== "")
        {
            $("#reportActivity-initialDate").val(alterFormatDate($("#reportActivity-initialDate").val() ));
            $("#reportActivity-finalDate").val(alterFormatDate($("#reportActivity-finalDate").val()));

            activityData = new ActivityData();
            activityData.dateinicio =   $("#reportActivity-initialDate").val();
            activityData.datefim = $("#reportActivity-finalDate").val();
            activityData.loadmod = "date";

            loadUserActivities(1, selectedUser);
        }
    });

    $("#reportActivity-finalDate").change(function () {
        $("#reportActivity-initialDate").trigger("change");
    });
});

  var address = "../../bean/activity.php";
  var activities = [];
  var userActivities = [];
  var selectedUser = undefined;
  var size = 0;
  var dataAnterior = "";
  var activityData = null;
  var activityInterval = undefined;
  var totalRecords = undefined;
  var jsonValue = undefined;
  var itensAdicionados = 0, itensEditados = 0, op = 0,
    itensRemovidos = 0, creditosRegistados = 0;

  var ActivityData = function () {};
  ActivityData.prototype.dateinicio = undefined;
  ActivityData.prototype.datefim = undefined;
  ActivityData.prototype.loadmod = undefined;


function loadUserActivities(filter, user)
{

    $.ajax({
        url: address,
        type:"POST",
        dataType:"json",
        data: {"intention" : "loadActivities",
                "user" : user,
            "filter" : filter,
            "jsonContent" : JSON.stringify(activityData)},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () { $(".mp-loading").fadeOut();},
        success:function (e)
        {
            activities = e.result;
            filterActivity(250);
        }
    });
}

function formatActivityDate(date,type)
{
    var newDate = date.split("-");
    newDate = $.makeArray(newDate);
    if(type === 1)
        return newDate[2].substring(0, 2)+"-"+newDate[1]+"-"+newDate[0];
    else
        return newDate[2].substring(3, 8);
}

function filterActivity(time)
{
    $(".list-logs").empty();
    totalRecords = activities.length;
    dataAnterior = "";
    itensRemovidos = 0;
    itensAdicionados = 0;
    itensEditados = 0;
    size = 0;

    clearInterval(activityInterval);
    if(totalRecords >0)
    {
        activityInterval = setInterval(function ()
        {
            var activity = activities[size];
            if($("#filterActivity").val() === LevelActivity.CRIACAO &&
                activity["levelkey"] === LevelActivity.CRIACAO)
            {
                itensAdicionados++;
                showActivity(activity, LevelActivity.CRIACAO);

                if(activity["activity"].$$("Registou novo Crédito com o Dossier")) creditosRegistados++;
            }
            else if($("#filterActivity").val() === LevelActivity.ATUALIZACAO &&
                activity["levelkey"] === LevelActivity.ATUALIZACAO)
            {
                itensEditados++;
               showActivity(activity, LevelActivity.ATUALIZACAO);
            }
            else if($("#filterActivity").val() === LevelActivity.ELIMINACAO &&
                activity["levelkey"] === LevelActivity.ELIMINACAO)
            {
                itensRemovidos++;
                showActivity(activity, LevelActivity.ELIMINACAO);
            } else if($("#filterActivity").val() === LevelActivity.VISUALIZACAO &&
                activity["levelkey"] === LevelActivity.VISUALIZACAO)
            {
                itensRemovidos++;
               showActivity(activity, LevelActivity.VISUALIZACAO);
            }
            else if($("#filterActivity").val() === LevelActivity.TODOS)
            {
                if(activity["levelkey"] === LevelActivity.CRIACAO)
                {
                    itensAdicionados++;
                    showActivity(activity, LevelActivity.CRIACAO);
                }
                else if(activity["levelkey"] === LevelActivity.ATUALIZACAO)
                {
                    itensEditados++;
                    showActivity(activity, LevelActivity.ATUALIZACAO);
                }
                else if(activity["levelkey"] === LevelActivity.VISUALIZACAO) showActivity(activity, LevelActivity.VISUALIZACAO);
                else if(activity["levelkey"] === LevelActivity.ELIMINACAO)
                {
                    itensRemovidos++;
                    showActivity(activity, LevelActivity.ELIMINACAO);
                }
            }
            size++;

            $(".total-added h3").html(itensAdicionados);
            $(".total-edited h3").html(itensEditados);
            $(".total-removed h3").html(itensRemovidos);

            if(creditosRegistados <= 1)
            {
                $("#contratoDesc p").html("Contrato registado");
                $("#totalCreditos").html(creditosRegistados);
            }
            else
            {
                $("#contratoDesc p").html("Contratos registados");
                $("#totalCreditos p").html(creditosRegistados);
            }
            if(size === totalRecords) clearInterval(activityInterval);
        }, time);
    }

}

function filterLoaded()
{
    $(".list-logs").empty();
    for(var i =0;i<activities.length;i++)
    {
        var activity = activities[i];
        if($("#filterActivity").val() === LevelActivity.CRIACAO &&
            activity["levelkey"] === LevelActivity.CRIACAO)
        {
            showActivity(activity, LevelActivity.CRIACAO);
        }
        else if($("#filterActivity").val() === LevelActivity.ATUALIZACAO &&
            activity["levelkey"] === LevelActivity.ATUALIZACAO)
        {
            showActivity(activity, LevelActivity.ATUALIZACAO);
        }
        else if($("#filterActivity").val() === LevelActivity.ELIMINACAO &&
            activity["levelkey"] === LevelActivity.ELIMINACAO)
        {
            showActivity(activity, LevelActivity.ELIMINACAO);
        } else if($("#filterActivity").val() === LevelActivity.VISUALIZACAO &&
            activity["levelkey"] === LevelActivity.VISUALIZACAO)
        {
            showActivity(activity, LevelActivity.VISUALIZACAO);
        }
        else if($("#filterActivity").val() === LevelActivity.TODOS)
        {
            if(activity["levelkey"] === LevelActivity.CRIACAO)
                showActivity(activity, LevelActivity.CRIACAO);
            else if(activity["levelkey"] === LevelActivity.ATUALIZACAO)
                showActivity(activity, LevelActivity.ATUALIZACAO);
            else if(activity["levelkey"] === LevelActivity.VISUALIZACAO)
                showActivity(activity, LevelActivity.VISUALIZACAO);
            else if(activity["levelkey"] === LevelActivity.ELIMINACAO)
                showActivity(activity, LevelActivity.ELIMINACAO);
        }
    }
}

function loadUser()
{
    $.ajax({
        url: address,
        type:"POST",
        dataType:"json",
        data: {"intention" : "loadUsers"},
        success:function (e)
        {
            $(".user-names").empty();
            userActivities = e.result;
            for(var i = 0;i<userActivities.length;i++)
            {
                if(i === 0)
                {
                    if(userActivities[i]["name"] === userActivities[i]["surname"])
                    {
                        if(userActivities[i]["state"] === UserState.INATIVO)
                             $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state="0"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                        else if(userActivities[i]["state"] === UserState.ATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state="1"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                        else
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state-"2"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                    }
                    else
                    {
                        if(userActivities[i]["state"] === UserState.INATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state="0"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                        else if(userActivities[i]["state"] === UserState.ATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state="1"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                        else
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active" state="2"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                    }
                }
                else
                {
                    if(userActivities[i]["name"] === userActivities[i]["surname"])
                    {
                        if(userActivities[i]["state"] === UserState.INATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))"  state="0"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                        else if(userActivities[i]["state"] === UserState.ATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))"  state="1"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                        else
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))"  state="2"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+'</li>');
                    }
                    else
                    {
                        if(userActivities[i]["state"] === UserState.INATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))" state="0"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                        else if(userActivities[i]["state"] === UserState.ATIVO)
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))"  state="1"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                        else
                            $(".user-names").append('<li onclick="selectUser('+i+', $(this))"  state="2"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                    }
                }
            }
            selectedUser = userActivities[0]["id"];
            loadUserActivities(-1, userActivities[0]["id"]);

        }
    });
}

function selectUser(index, component)
{
    $(".user-names li.active").removeClass('active');
    $(component).closest('li').addClass('active');
    selectedUser = userActivities[index]["id"];

    if($("#reportActivity-initialDate").val() !== "" &&
        $("#reportActivity-finalDate").val() !== "")
    {

        activityData = new ActivityData();
        activityData.dateinicio =   $("#reportActivity-initialDate").val();
        activityData.datefim = $("#reportActivity-finalDate").val();
        activityData.loadmod = "date";

        $("#reportActivity-initialDate").val(alterFormatDate($("#reportActivity-initialDate").val() ));
        $("#reportActivity-finalDate").val(alterFormatDate($("#reportActivity-finalDate").val()));
        loadUserActivities(1, selectedUser);
    }
    else
        loadUserActivities(-1, selectedUser);
}



function groupByDate(date)
{
    if(dataAnterior === date)
        return "";
    else {
        dataAnterior = date;
        return date;
    }
}

function alterFormatDate(date)
{
    var newDate = date.split("-");
    newDate = $.makeArray(newDate);
    return newDate[2]+"-"+newDate[1]+"-"+newDate[0];
}


function showActivity(value, filter)
{
    var classIcon, view ="";

    if(filter !== LevelActivity.VISUALIZACAO &&
        filter !== LevelActivity.OUTROS && value["data"] !== null)
    {
       if(value["data"].$$("{"))
           view ="Mais detalhes";
    }


    if(filter === LevelActivity.ATUALIZACAO) classIcon ="icon-pencil edit";
    else if(filter === LevelActivity.CRIACAO) classIcon = "icon-plus create";
    else if(filter === LevelActivity.VISUALIZACAO)
    {
        classIcon ="icon-eye view";
        view ="";
    }
    else if(filter === LevelActivity.ELIMINACAO) classIcon ="icon-minus remove";


    $(".list-logs").append('' +
        '<h3>'+groupByDate(formatActivityDate(value["date"], 1))+'</h3>'+
        '<section> '+
        ' <span class="hour">'+formatActivityDate(value["date"], 2)+'</span> '+
        '<div class="detail">'+
        '  <i class="'+classIcon+'"></i> '+
        ' <span>'+
        '<span class="description">'+value["activity"]+'</span> '+
        ' <small onclick="showMoreDetailsActivity($(this))" >'+view+'</small> '+
        ' </span> '+
        ' </div> '+
        ' </section>'
    );
}



function showMoreDetailsActivity(activitySelected)
{
    jsonValue = null;
    $(".modalContainer .content").empty();
    activitySelected = activitySelected.closest('div').find('.description').text();

    for(var i = 0;i<activities.length;i++) {
        var activity = activities[i];

        if (activity["activity"] === activitySelected) {  // Somente as atividades que não forem de visualização e outros podem ter mais detalhes.
                jsonValue = activity["data"];
                jsonValue = jsonValue.replace(/[\\]/g, '').substring(1, jsonValue.replace(/[\\]/g, '').length - 1);
                jsonValue = jsonValue.replace("content:", "");
                jsonValue = JSON.parse(jsonValue);
                break;
        }
    }

    if(jsonValue !== null)
    {
        $.each(jsonValue, function (key, value) {
            showDetails(key, value);
        });
        openModalFrame($('.mp-mf-activity'));
    }
}


function showDetails(_key, _value)
{
    var details;
    details ='<nav>'+
        '<span class="mykey">'+_key+'</span>'+
        '<span class="myVal">'+_value+'</span>'+
        '</nav>';
    $(".mp-mf-activity .content").append(details);

}


var TypeActivity = {"REGISTO_CLIENTE" : "Novo cliente registrado com sucesso", "SIMULACAO" : "Efetuou uma simulaçao!"};
Object.freeze(TypeActivity);
