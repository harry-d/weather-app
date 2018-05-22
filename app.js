const yargs = require("yargs");

const geocode = require("./geocode/geocode.js");

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
        console.log(JSON.stringify(results, undefined, 4));
        console.log(`Address: ${results.address}`);
        console.log(`Latitude: ${results.lat}`);
        console.log(`Longitude: ${results.lng}`);
    }
});
