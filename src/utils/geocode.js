const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2F4ZW5hMTFhc2hpc2giLCJhIjoiY2p4a2F4Z2t2MjZxbzN6bnp5bGhjbHd2cSJ9.U6r2bUVnbWhd75dgiUD96Q&limit=1'
    request({url , json : true},(error, {body}) => {
        
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location,try another search', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode 