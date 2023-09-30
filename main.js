// WEB303 Assignment 2

$(document).ready(function () {
    // Function to load content in from the div conntent using AJAX
    function loadContent(url) {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "html",
            success: function (data) {
                // Hiding content, clearing contents, and setting new content
                $("#content").hide().html(data);
                // Animation
                $("#content").fadeIn();
            },
            error: function () {
                console.error("Error loading content");
            }
        });
    }

    // Click event handlers
    $("#prospect").click(function (event) {
        event.preventDefault();
        loadContent("prospect.html");
    });

    $("#convert").click(function (event) {
        event.preventDefault();
        loadContent("convert.html");
    });

    $("#retain").click(function (event) {
        event.preventDefault();
        loadContent("retain.html");
    });
});
