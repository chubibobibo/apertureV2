
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

//adding a custom marker
//refer to the mapbox gl docs
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
    .setLngLat(photoData.geometry.coordinates)
    .addTo(map)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h5>${photoData.title}</h5> <p>${photoData.description}</p>`
    )
    )
