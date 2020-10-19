const request = require('request')

forecast = (lat , long, callback)=>{
    url = 'http://api.weatherapi.com/v1/current.json?key=f989ce6dc9344a5bba7160229200110&q='+lat+','+long
    request({url, json:true}, (error , { body })=>{
        if(error){
            callback('Request is not completed due to Network Error', undefined)
        }
        else if(body.error != null){
            callback('Chose correct location', undefined)
        } 
        else{
            callback(undefined , "Temprature is "+body.current.temp_c+ " degree celsus and wind speed is "+ body.current.wind_kph+ " Km/h")
        }
    })
}
module.exports = forecast