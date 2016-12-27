/**
 * Created by Helcio on 12/22/2016.
 */

$(function () {

    $(".is-datepicker").blur(function () {
        var yearComparation = 0;

        if($("#report-inicial-date").val() !== "" &&
                $("#report-final-date").val() !== "")
        {
            var dataI = $("#report-inicial-date").val(), dataF = $("#report-final-date").val();
            if(Number(dataF.substr(6, 9))>= Number(dataI.substr(6, 9))){

                yearComparation = Number(dataF.substr(6, 9)) - Number(dataI.substr(6, 9));
                if(yearComparation >1)
                    $("#yerC").html(yearComparation+" anos em comparação");
                else if(yearComparation === 1)
                    $("#yerC").html(yearComparation+" ano em comparação");
            }

        }

    });
});





