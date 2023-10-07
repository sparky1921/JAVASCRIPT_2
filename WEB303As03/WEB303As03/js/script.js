$('document').ready(function () {

    getJSONData();
    ajaxRequest();

});

function getJSONData() {
    $.getJSON("../team.json", function (data) {

        $.each(data, function (index, element) {
            var name = "<h2>" + element.name + "</h2>";
            var position = "<h5>" + element.position + "</h5>";
            var bio = "<p>" + element.bio + "</p>";
            var html = name + position + bio;
            $("#team").append(html);
        });
    });
}


function ajaxRequest() {
    $("#team").html("Loading...");
    $.ajax({
        url: "../team.json",
        method: "get",
        dataType: "json",
        
        success: function (data) {
            console.log(data);

            var teamDiv = $("#team");
            teamDiv.empty();
            $.each(data, function (index, member) {
                teamDiv.append("<h2>" + member.name + "</h2>");
                teamDiv.append("<h5>" + member.position + "</h5>");
                teamDiv.append("<p>" + member.bio + "</p>");
            });

            teamDiv.html(teamDiv.html().replace("Loading...", ""));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Request failed: " + errorThrown);
            console.log(jqXHR);
            console.log(textStatus);
            $("#team").html("Error: Content could not be retrieved.");
        }
    });
}

