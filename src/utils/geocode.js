const request = require('postman-request');


const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhc2hyZ293ZGEiLCJhIjoiY2s5aXNvbzh2MGEzODNvbWdjZG1hYjA1dCJ9.b3-HojlsMSEz2tQrBbXTbw&limit=1`;

    request({url, json: true}, (err, {body}) => {
        if(err){
            cb('Unable to connect to location services', undefined)
        } else if(body.message === 'Not Found'){
            cb('Unable to find location. Try another search', undefined)
        } else if(body.message === 'Not Authorized - No Token'){
            cb('Unable to find location. Try another search', undefined)
        } else if(body.message === 'Not Authorized - No Token' && body.features.length === 0){
            cb('Unable to find location. Try another search', undefined)
        } else if(body.features.length === 0){
            cb('Unable to find location. Try another search', undefined)
        } else {
            cb(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode