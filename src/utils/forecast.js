const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url= 'https://api.darksky.net/forecast/165a0467214de4215f350c9f0ba0cda5/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect with weather services' , undefined)
        } else if(body.error){
            callback('Invalid Location, please re-check coordinates' , undefined)
        } else{
            callback(undefined , body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. There is '+body.currently.precipProbability+ '% chance of rain.')
        }
    })
}

module.exports = forecast