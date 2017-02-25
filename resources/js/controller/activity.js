/**
 * Created by Helcio on 2/23/2017.
 */

$(function ()
{
    loadUser();


    $("#searchActivity").keyup(function () {

    });
    $("#activitySearch-user").keyup(function () {
        advSearch($(this), $(".user-names li"));
    });
    $("#filterActivity").change(function()
    {
        filterActivity();
    });

    $(".x-close").click(function () {
        $(".div-statitcs").removeClass("show");
    });

    $("#reportActivity-initialDate").change(function () {

        if($("#reportActivity-initialDate").val() !== "" &&
            $("#reportActivity-finalDate").val() !== "")
        {
            loadUserActivities(1, selectedUser);
        }
    });

    $("#reportActivity-finalDate").change(function () {
        $("#reportActivity-initialDate").trigger("change");
    });
});

  var address = "../bean/activity.php";
  var activities = [];
  var userActivities = [];
  var selectedUser = undefined;
  var index = 0;

function loadUserActivities(filter, user)
{

    $.ajax({
        url: address,
        type:"POST",
        dataType:"json",
        data: {"intention" : "loadActivities",
                "user" : user,
            "filter" : filter,
            "dataInicio" :  $("#reportActivity-initialDate").val(),
              "dataFim" : $("#reportActivity-finalDate").val()},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();},
        success:function (e)
        {
            activities = e.result;
            filterActivity();
        }
    });
}

function loadAllActivities()
{
    var itensAdicionados = 0, itensEditados = 0, itensRemovidos = 0;
    $(".list-logs").empty();

    for(var i =0;i<activities.length;i++)
    {
        var activity = activities[i];
        if(activity["levelkey"] === LevelActivity.ATUALIZACAO)
        {
            itensEditados +=1;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>' +
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span>'+
                '<div class="detail">'+
                '  <i class="icon-pencil edit"></i>'+
                ' <span>' +
                '<span class="description">'+activity["activity"]+'</span>'+
                ' <small>Mais detalhes</small>'+
                ' </span>'+
                ' </div>'+
                ' </section>'
            );
        }
        else if(activity["levelkey"] === LevelActivity.CRIACAO)
        {
            itensAdicionados +=1;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>'+
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span> '+
                '<div class="detail">'+
                '  <i class="icon-plus create"></i> '+
                ' <span>'+
                '<span class="description">'+activity["activity"]+'</span>'+
                ' <small>Mais detalhes</small> '+
                ' </span> '+
                ' </div> '+
                ' </section>'
            );
        }
        else if(activity["levelkey"] === LevelActivity.DESATIVACAO ||
            activity["levelkey"] === LevelActivity.ELIMINACAO)
        {
            itensRemovidos +=1;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>'+
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span> '+
                '<div class="detail">'+
                '  <i class="icon-minus remove"></i> '+
                ' <span>'+
                '<span class="description">'+activity["activity"]+'</span> '+
                ' <small>Mais detalhes</small> '+
                ' </span> '+
                ' </div> '+
                ' </section>'
            );
        }
        else if(activity["levelkey"] === LevelActivity.VISUALIZACAO)
        {
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>'+
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span> '+
                '<div class="detail">'+
                '  <i class="icon-eye view"></i> '+
                ' <span>'+
                '<span class="description">'+activity["activity"]+'</span> '+
                ' <small>Mais detalhes</small> '+
                ' </span> '+
                ' </div> '+
                ' </section>'
            );
        }
    }

    $(".total-added h3").html(itensAdicionados);
    $(".total-edited h3").html(itensEditados);
    $(".total-removed h3").html(itensRemovidos);

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

function filterActivity()
{
    $(".list-logs").empty();
    var itensAdicionados = 0, itensEditados = 0, itensRemovidos = 0;
    for(var i =0;i<activities.length;i++)
    {
        var activity = activities[i];
        if($("#filterActivity").val() === LevelActivity.CRIACAO &&
            activity["levelkey"] === LevelActivity.CRIACAO)
        {
            itensAdicionados++;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>'+
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span> '+
                '<div class="detail">'+
                '  <i class="icon-plus create"></i> '+
                ' <span>'+
                '<span class="description">'+activity["activity"]+'</span>'+
                ' <small>Mais detalhes</small> '+
                ' </span> '+
                ' </div> '+
                ' </section>'
            );
        }
        else if($("#filterActivity").val() === LevelActivity.ATUALIZACAO &&
            activity["levelkey"] === LevelActivity.ATUALIZACAO)
        {
            itensEditados++;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>' +
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span>'+
                '<div class="detail">'+
                '  <i class="icon-pencil edit"></i>'+
                ' <span>' +
                '<span class="description">'+activity["activity"]+'</span>'+
                ' <small>Mais detalhes</small>'+
                ' </span>'+
                ' </div>'+
                ' </section>'
            );
        }
        else if($("#filterActivity").val() === LevelActivity.ELIMINACAO &&
            activity["levelkey"] === LevelActivity.ELIMINACAO)
        {
            itensRemovidos++;
            $(".list-logs").append('' +
                '<h3>'+formatActivityDate(activity["date"], 1)+'</h3>'+
                '<section> '+
                ' <span class="hour">'+formatActivityDate(activity["date"], 2)+'</span> '+
                '<div class="detail">'+
                '  <i class="icon-minus remove"></i> '+
                ' <span>'+
                '<span class="description">'+activity["activity"]+'</span> '+
                ' <small>Mais detalhes</small> '+
                ' </span> '+
                ' </div> '+
                ' </section>'
            );
        }
        else if($("#filterActivity").val() === LevelActivity.OUTROS)
        {
            loadAllActivities();
        }

        if($("#filterActivity").val() !== LevelActivity.OUTROS)
        {
            $(".total-added h3").html(itensAdicionados);
            $(".total-edited h3").html(itensEditados);
            $(".total-removed h3").html(itensRemovidos);
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
                    $(".user-names").append('<li onclick="selectUser('+i+', $(this))" class="active"  id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
                else
                    $(".user-names").append('<li onclick="selectUser('+i+', $(this))" id="'+userActivities[i]["id"]+'">'+userActivities[i]["name"]+" "+userActivities[i]["surname"]+'</li>');
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

    loadUserActivities(-1, selectedUser);

}

function showMoreActivityInfo()
{
    $(".div-statitcs").addClass("show");
}