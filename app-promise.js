const yargs = require("yargs");
const axios = require("axios");

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if ("ZERO_RESULTS" === response.data.status){
        throw new Error("Unable to find that address");
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    console.log(response.data.results[0].formatted_address);
    var weatherUrl = `https://api.forecast.io/forecast/438cdfc1d01fc6816f53647bca3e046d/${lat},${lng}`;
    return axios.get(weatherUrl);
})
.then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch((e) =>{
        console.log("Error: ", e.message);

});
