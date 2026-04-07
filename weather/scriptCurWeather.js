htmlElement = document.getElementById("jsDiv");

let currentTemp = "Error: Not found";
let currentPrecipitation = "Error: Not found";
let currentWindSpeed = "Error: Not found";
let currentWindDirection = "Error: Not found";
let currentForecast = "Error: Not found";


async function fetchForecast () {
    let response = await fetch("https://api.weather.gov/gridpoints/GYX/33,80/forecast")
    try {
        if (response.status !== 200) {
            console.log(`error code found: ${response.status}`);
            return;
        }
        let data = await response.json();
        currentTemp = data["properties"]["periods"][0]["temperature"];
        currentPrecipitation = data["properties"]["periods"][0]
                                   ["probabilityOfPrecipitation"]["value"];
        currentWindSpeed = data["properties"]["periods"][0]["windSpeed"];
        currentWindDirection = data["properties"]["periods"][0]["windDirection"];
        currentForecast = data["properties"]["periods"][0]["shortForecast"];
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

async function buildHTML () {
    await fetchForecast();
    appendWindDir();
    htmlElement.innerHTML = `
        <div class="weatherReport">
            <img id="weatherImg" src="../pictures/temperatureIcon.png">

            <div class="weatherText">
                <div class="firstHalf">
                    <h2>Current Temperature:</h2>
                    <p>${currentTemp}${degreeSign}F</p>

                    <h2>Chance of Precipitation:</h2>
                    <p>${currentPrecipitation}%</p>
                </div>

                <div class="secondHalf">
                <h2>Wind:</h2>
                <p>${currentWindSpeed}</p>
                <p>${currentWindDirection}</p>

                <h2>Description:</h2>
                <p>${currentForecast}</p>
                </div>
            </div>
        </div>
    `
}

buildHTML();
