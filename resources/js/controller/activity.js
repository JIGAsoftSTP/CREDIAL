/**
 * Created by Helcio on 2/23/2017.
 */

$(function ()
{
    loadUserActivities();
});

  var address = "bean/activity.php";
  var activities = [];

function loadUserActivities() {

    $.ajax({
        url: address,
        type:"POST",
        dataType:"json",
        data: {"intention" : "loadActivities"},
        beforeSend: function () {  $(".mp-loading").fadeIn(); },
        complete: function () {
            $(".mp-loading").fadeOut();},

        success:function (e)
        {
            activities = e.result;
            for(var i =0;i<activities.length;i++)
            {
                var activity = activities[i];
                if(activity["levelkey"] === LevelActivity.ATUALIZACAO)
                {
                    $(".list-logs").append('' +
                        '<section> +'
                             +' <span class="hour">17:20</span> +'
                              +'<div class="detail">+'
                                 +'  <i class="icon-pencil edit"></i> +'
                                  +' <span>+'
                                         +'<span class="date">12-12-2017</span> +'
                                      + '<span class="description">dnerjmnerjm</span> +'
                                      +' <small>Mais detalhes</small> +'
                                  +' </span> +'
                             +' </div> +'
                        +' </section>'
                    );
                }
                else if(activity["levelkey"] === LevelActivity.CRIACAO)
                {
                    $(".list-logs").append('' +
                        '<section> +'
                           +' <span class="hour">17:20</span> +'
                           +'<div class="detail">+'
                            +'  <i class="icon-plus create"></i> +'
                              +' <span>+'
                                 +'<span class="date">'+formatDate(activity["date"], 2)+'</span> +'
                                 + '<span class="description">dnerjmnerjm</span> +'
                                  +' <small>Mais detalhes</small> +'
                              +' </span> +'
                             +' </div> +'
                        +' </section>'
                    );
                }
                else if(activity["levelkey"] === LevelActivity.DESATIVACAO ||
                        activity["levelkey"] === LevelActivity.ELIMINACAO)
                {
                    $(".list-logs").append('' +
                        '<section> +'
                        +' <span class="hour">17:20</span> +'
                            +'<div class="detail">+'
                             +'  <i class="icon-minus remove"></i> +'
                             +' <span>+'
                                +'<span class="date">'+formatDate(activity["date"], 2)+'</span> +'
                                 + '<span class="description">dnerjmnerjm</span> +'
                                 +' <small>Mais detalhes</small> +'
                              +' </span> +'
                           +' </div> +'
                        +' </section>'
                    );
                }
                else if(activity["levelkey"] === LevelActivity.VISUALIZACAO)
                {
                    $(".list-logs").append('' +
                        '<section> +'
                        +' <span class="hour">17:20</span> +'
                             +'<div class="detail">+'
                             +'  <i class="icon-eye view"></i> +'
                        +' <span>+'
                               +'<span class="date">'+formatDate(activity["date"], 2)+'</span> +'
                        + '<span class="description">dnerjmnerjm</span> +'
                        +' <small>Mais detalhes</small> +'
                        +' </span> +'
                        +' </div> +'
                        +' </section>'
                    );
                }
            }
        }
    });
}

