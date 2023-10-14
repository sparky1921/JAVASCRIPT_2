/*
    Assignment #4
    {PARTH HARESKUMAR PATEL}
*/

$(function () {
    function getLocationAndDisplay() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var accuracy = "Accuracy: " + position.coords.accuracy + " meters";
                var currentLocation = "Latitude: " + lat + ", Longitude: " + lon;
                $("#locationhere").text(currentLocation);
                $("#accuracyhere").text(accuracy);

                var storedLocation = localStorage.getItem("userLocation");

                if (storedLocation) {
                    var storedLocationTag = $("<p>").text("Stored Location: " + storedLocation);
                    $("body").append(storedLocationTag);
                    $("body").append("<h2>Welcome back to the page!</h2>");

                    var distanceInMeters = calculateDistance(lat, lon, ...parseCoordinates(storedLocation));
                    $("body").append("<p>You traveled " + distanceInMeters + " meters since your last visit to this page.</p>");
                } else {
                    $("body").append("<h1>Welcome to the page for the first time!</h1>");
                }

                // Store the current location in local storage
                localStorage.setItem("userLocation", currentLocation);
            });
        } else {
            $("#locationhere").text("Geolocation is not available. Please allow geolocation to use this application.");
        }
    }

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
    function parseCoordinates(location) {
        var coordinates = location.split(", ");
        return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
    }

    getLocationAndDisplay();
});


