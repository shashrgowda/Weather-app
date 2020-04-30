const request = require('postman-request');

const forecast = (lat,long,cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=a07d2dd700d8d08b5b05160e6be152b2&query='+ lat + ',' + long;

    request({url, json: true}, (err, { body }) => {
        if(err){
            cb('Unable to connect to network', undefined)
        } else if(body.error){
            cb('Unable to find location', undefined)
        } else {
            cb(undefined, body.current)
        }
    })
}


module.exports = forecast;