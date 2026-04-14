htmlElement = document.getElementById("jsDiv");

let currentTemp = "Error: Not found";
let currentPrecipitation = "Error: Not found";
let currentWindSpeed = "Error: Not found";
let currentWindDirection = "Error: Not found";
let currentForecast = "Error: Not found";
let currentTime = "Error: Not found";


async function fetchForecast (day) {
    let response = await fetch("https://api.weather.gov/gridpoints/GYX/33,80/forecast")
    try {
        if (response.status !== 200) {
            console.log(`error code found: ${response.status}`);
            return;
        }
        let data = await response.json();
        if (day == 1) {
            //makes sure we are pulling tomorrow and not tonight
            let temp = data["properties"]["periods"][day]["name"];
            if (temp === "Tonight") {
                day = 2;
            }
        }
        currentTemp = data["properties"]["periods"][day]["temperature"];
        currentPrecipitation = data["properties"]["periods"][day]
                                   ["probabilityOfPrecipitation"]["value"];
        currentWindSpeed = data["properties"]["periods"][day]["windSpeed"];
        currentWindDirection = data["properties"]["periods"][day]["windDirection"];
        currentForecast = data["properties"]["periods"][day]["shortForecast"];
        currentTime = data["properties"]["periods"][day]["name"];
    } catch (err) {
        console.log(`error happened: ${err}`);
    }
}

let degreeSign = String.fromCharCode(176);

function appendWindDir() {
    switch (currentWindDirection) {
        case "N":
            currentWindDirection = "North";
        case "NW":
            currentWindDirection = "Northwest";
        case "NE":
            currentWindDirection = "Northeast";
        case "E":
            currentWindDirection = "East";
        case "W":
            currentWindDirection = "West";
        case "S":
            currentWindDirection = "South";
        case "SW":
            currentWindDirection = "Southwest";
        case "SE":
            currentWindDirection = "Southeast";
    }
}

async function buildHTML (day) {
    await fetchForecast(day);
    appendWindDir();
    htmlElement.innerHTML += `
        <div class="weatherReport">
            <img id="weatherImg" src="../pictures/temperatureIcon.png">

            <div class="weatherText">
                <div class="firstHalf">
                    <h1 id="title">${currentTime}</h1>
                    <h2>Current Temperature:</h2>
                    <p id="gapLeft">${currentTemp}${degreeSign}F</p>

                    <h2>% of Precipitation:</h2>
                    <p>${currentPrecipitation}%</p>
                </div>

                <div class="secondHalf">
                <h2>Wind:</h2>
                <p >${currentWindSpeed}</p>
                <p id="gapRight">${currentWindDirection}</p>

                <h2>Description:</h2>
                <p>${currentForecast}</p>
                </div>
            </div>
        </div>
    `
}

buildHTML(0);
buildHTML(1);
