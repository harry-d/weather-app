const request = require("request");

const forecastKey = "438cdfc1d01fc6816f53647bca3e046d";

function weather(lat, lng, callback){
    //make http request
    var forecastUrl = `https://api.forecast.io/forecast/${forecastKey}/${lat},${lng}`;
    request({
        url: forecastUrl,
        json: true
    }, (error, response, body) => {
        if (!error && 200 === response.statusCode){
            callback(undefined, {
                temperature: ((body.currently.temperature - 32) * 5 / 9).toFixed(2),
                apparentTemperature: ((body.currently.apparentTemperature - 32) * 5 / 9).toFixed(2)
            });
        }
        else{
            callback(`Error: ${error}`);
        }
    });
}

module.exports.getWeather = weather;
