const request = require("request");

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        console.log("Making request...");
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAdp88YCONLB0_-rHR7pAdfLovlCGjxdWw&address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            //console.log(JSON.stringify(response, undefined, 4));
            if (error){
                reject("Couldn't connect to server");
            }
            else if (body.status === "OK"){
                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
            }
            console.log(response);
            reject("No results");
        });
    });
};

geocodeAddress("").then(
    (location) => console.log(location, undefined, 2),
    (errorMessage) => console.log(errorMessage)
);

module.exports.geocodeAddress = geocodeAddress;
