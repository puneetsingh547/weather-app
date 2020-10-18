request = require('request')
geoCode = (address , callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHVuZWV0c2luZ2g1NDciLCJhIjoiY2tmc2VwMXZmMXRseTJxczUwMWFjaHRwbiJ9.3tlxcuZ0XPFo7jn4HXHM9w';
    request({url, json: true}, (error , {body})=>{
        if(error){
            callback('Please Check your internet Connection!')
        }else if(body.features.length === 0){
            callback('Please Enter valid search', undefined)
        } else{
            callback(undefined , {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode