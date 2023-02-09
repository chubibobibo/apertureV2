
//showing the map
//refer to the installation guide mapbox-gl
//this is initially in the detail.ejs page but for simplicity of adding js code we moved it to a separate js file.

mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: photoData.geometry.coordinates, // starting position [lng, lat], we need data(geoJSON) from our specific campgound in the detail.ejs script
    zoom: 9, // starting zoom
});


    //then we need to 