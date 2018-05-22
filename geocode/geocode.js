const request = require("request");

var makeRequest = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    console.log("Making request...");
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAdp88YCONLB0_-rHR7pAdfLovlCGjxdWw&address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(response, undefined, 4));
        if (error){
            callback("Couldn't connect to server");
            //throw "Invalid response received";
        }
        else if (body.status === "ZERO_RESULTS"){
            callback("Unable to find address provided");
        }
        else if (body.status === "OK"){
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        }
    });
};


module.exports = {
    geocodeAddress: makeRequest
};
