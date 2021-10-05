


//      for later          https://getbootstrap.com/docs/4.3/getting-started/introduction/

// I need to store history in local storage
////// I need to store the name of the location in a retrievable string
//////////////-array[].name.text()
////////// the string name or value needs to apply to a button with the name or value appended as an ID
////////////// when the button is pressed, it's -value- is sent through the search engine inplace of the search bar searching method

// the fetch is going to need to be a function with the input perameter being either the button or the search bar
////// I will need to fetch the geo api first for longitude and latitude information
////// after I recieve that information I will then use it to fetch the weather data of that location
////////// I need to know how to access the information I require and how to redirect it to the second getApi() function
////////////// I will need 2 global variables depicting the request url's
////////////////// so the geoApi can address the url of the weatherApi
////////////////// so the search bar can address the geoApi

// object names within array must be different, so I can make a nested forloop
//////that examines the name of the object within the first index of the array and loop through it by changing array[i] number
//////upon match it adds =1 to the name and redoes the search
//////unon no match it generates the button and appends it to the page


// when I hit the search bar
/////// then the information gets stored within the history array
////////// I might need some kind of special data tags for this so identical results don't conflict, so likely the name != the value

// I'll need to display that information
//////I need enough html containers for all that information with unique tags corresponding to the unique location the information will be deposited into




////// /shift /update object names to index location /push new object with name according to index location /save

//  Weather API - needs geoApi coordinates to work.
//      https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//  https://openweathermap.org/api/one-call-api

// Geo API - needs search bar input to work.
//      http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//  https://openweathermap.org/api/geocoding-api



// I .shift the array
// push { value:"searchTerm"}
//then I update the array

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready()


var historyGroup = $("#historyButtonGroup");

//this is the array it pushes to
var arr = [];





//this is the array it pulls from
// arr = [new set(arr)];
// theroretically




$('#searchArea').on("submit", $("button"), getSearch);
var searchValue = $("input").val();


function getSearch(event) {
    event.preventDefault();

    var searchValue = $("input").val();
    console.log("Searching for " + searchValue);


    arr.unshift(searchValue);


    appendHistory();
    saveHistory();
    getAPIs();
    document.getElementById("deleteThis").style.display = "none";
}


function getAPIs() {






    


    // var geoApi = "https:api.openweathermap.org/geo/1.0/direct?q=" + arr[0] + "&limit=1&appid=5de4fe643c36c638596fa3acd666e2a7";



    $.ajax({
        url: "http:api.openweathermap.org/geo/1.0/direct?q=" + arr[0] + "&limit=1&appid=5de4fe643c36c638596fa3acd666e2a7",
        method: 'GET',
        dataType: 'JSON',
    })


        .done(function (data1) {
            console.log(data1)

            // });

            // fetch(geoApi)
                                                //removed all of the fetch content to see if it would work with ajax instead, and it does. but the bug still persists on the deployed link.
        
            // if (response1 == 400) {
            //     console.log("Incorrect Name Input")
            // }
            // return response1.json()

        // .then(function (data1) {
            console.log("This is the data of the geocodingApi", data1);

            if (data1.length == 0) {
                document.getElementById("alert").style.display = "flex";
                return;
            } else { document.getElementById("alert").style.display = "none"; }

            //name of search
            var name = data1[0].name;
            console.log(name)

            //longitude
            var lon = data1[0].lon;
            console.log(name + " is at " + lon + " lon");
            //latitude
            var lat = data1[0].lat;
            console.log(name + " is at " + lat + " lat");

            // getWeatherApi();


           
            // });
            // function getWeatherApi() {
                // var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5de4fe643c36c638596fa3acd666e2a7";
                // fetch(weatherApi)
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5de4fe643c36c638596fa3acd666e2a7",
                    method: 'GET',
                    dataType: 'JSON',
                })
                    .done(function (data2) {
                        console.log(data2)
                    // .then(function (response2) {
                        // console.log("This is the response of the weatherApi", response2);
                        // return response2.json();
                    // })
                    // .then(function (data2) {
                        console.log("This is the data of the weatherApi", data2);

                        //current
                        var current = data2.current;
                        console.log("current: ", current);
                        //daily for 8 days
                        var daily = data2.daily;
                        console.log("daily: ", daily);

                        //update container with the weather data and set visibility to visible
                        document.getElementById("hideAway").style.visibility    = "visible";
                        document.getElementById("currentName").innerHTML        = name;
                        document.getElementById("currentIcon").src              = "http://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png";
                        document.getElementById("currentIcon").style.width      = "100px";
                        document.getElementById("currentHumidity").innerHTML    = current.humidity;
                        document.getElementById("currentTemperature").innerHTML = current.temp;
                        document.getElementById("currentUVI").innerHTML         = current.uvi;

                        if (current.uvi < 3) {
                            console.log("green");
                            var color = "var(--mg)"
                        } else if (current.uvi < 6) {
                            console.log("yellow");
                            var color = "var(--y)"
                        } else if (current.uvi < 8) {
                            console.log("orange");
                            var color = "orange"
                        } else { console.log("red"); var color = "var(--r)" }

                        console.log(color);
                        document.getElementById("currentUVI").style.color = color;

                        //area for 5 day forecast
                        document.getElementById("currentDay").innerHTML = moment.unix(current.dt).format("YYYY, MMMM, dddd");

                        //loop for all the days I have displayed
                        for (n = 1; n < 6; n++) {

                            var dtime = "day" + n + "Time";
                            var dday = "day" + n + "Day";

                            document.getElementById(dtime).innerHTML = moment.unix(daily[n].dt).format("YYYY, MM, DD");
                            document.getElementById(dday).innerHTML = moment.unix(daily[n].dt).format("dddd");


                            var Icon = "day" + n + "Icon";
                            var Temp = "day" + n + "Temp";
                            var Humidity = "day" + n + "Humidity";

                            //gets average temperature instead of just the min or the max
                            var temperatureAverage = Math.trunc((daily[n].temp.max + daily[n].temp.min) / 2);
                            console.log("Temperature Average", temperatureAverage);

                            //using for loop, this updates the cards with content
                            document.getElementById(Temp).innerHTML = temperatureAverage
                            document.getElementById(Humidity).innerHTML = daily[n].humidity
                            document.getElementById(Icon).src = "http://openweathermap.org/img/wn/" + daily[n].weather[0].icon + "@2x.png";
                            document.getElementById(Icon).style.width = "50px";

                        }
                    // })
            });
        });
}


loadHistory()
function loadHistory() {
    arr = JSON.parse(localStorage.getItem("storedHistory"));
    if (arr === null) {
        var arr = ["", "", "", "", ""];
        return;
    }
    console.log("loading History")
    for (i = 0; i < arr.length; i++) {
        // console.log(arr.length)
        if (arr.length > 6) {
            arr.pop();
        };
        document.getElementById(i).innerHTML = arr[i];
    }
}



function appendHistory() {
    console.log("appending History")
    for (i = 0; i < arr.length; i++) {
        console.log(arr.length)
        if (arr.length > 6) {
            arr.pop();
        };
        document.getElementById(i).innerHTML = arr[i];
    }
}


function saveHistory() {
    console.log("Saving History")
    arra = [];
    for (x = 0; x < 6; x++) {
        arraysave = document.getElementById(x).innerHTML;
        arra.push(arraysave)
        localStorage.setItem("storedHistory", JSON.stringify(arra))
    }
}


