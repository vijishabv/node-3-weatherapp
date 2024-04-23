const request = require('request');
const geolocation = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibmVoYWpvc2h5MTIzIiwiYSI6ImNsdjUyMzBlZjBlcWoycW1uMzkybjZmZDQifQ.w76ulkCUXbf75K7sUQN25g'
    request({ url ,json:true}, (error, {body}) => {
    if (error) {
        callback('Unable to fetch tha api', undefined);
    } else if (body.features.length === 0) {
        callback('please provide a valid address', undefined);
    } else {
        callback(undefined,{
            latitude:body.features[0].properties.coordinates.longitude,
            longitude:body.features[0].properties.coordinates.latitude,
            location:body.features[0].properties.place_formatted
        });
    }
})
}



module.exports=geolocation;
