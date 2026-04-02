htmlElement = document.getElementById("jsDiv");

htmlElement.innerHTML = '<p>test123</p>';

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

async function buildHTML () {
    await fetchForecast();
    htmlElement.innerHTML = `
        <div id="temperature">
        <p>${currentTemp}</p>
        <p>${currentPrecipitation}</p>
        <p>${currentWindSpeed}</p>
        <p>${currentWindDirection}</p>
        <p>${currentForecast}</p>
        </div>
    `
}

buildHTML();
