const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather.js");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address for weather",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

var address = argv.address;

geocode.geocodeAddress(address, (errorMessage, results) => {
    if (errorMessage){
        console.log(errorMessage);
    }
    else{
        // console.log(JSON.stringify(results, undefined, 4));
        console.log(`Address: ${results.address}`);
        console.log(`Latitude: ${results.lat}`);
        console.log(`Longitude: ${results.lng}`);

        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
            if (errorMessage){
                console.error(errorMessage);
            }
            else{
                console.log(`It's currently ${weatherResults.temperature} °C. It feels like ${weatherResults.apparentTemperature} °C.`);
            }
        });

    }
});


// api url: https://api.forecast.io/forecast/438cdfc1d01fc6816f53647bca3e046d/37.8134679,-122.307917
// 438cdfc1d01fc6816f53647bca3e046d
