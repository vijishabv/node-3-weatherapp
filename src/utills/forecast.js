const request = require('request');
const weatherapp = (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6b6787b01c9b05596adccd24a783be24&query='+longitude+','+latitude+'&units=f';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('could not fetch the API',undefined);
        }else if(body.error){
            callback('please provide a valid location',undefined);
        }else{
            callback(undefined,{
                temperature:body.current.temperature,
                weatherdescription:body.current.weather_descriptions[0],
                feelslike:body.current.feelslike
            })
        }
    });
}



module.exports=weatherapp;