
//showing the map
//refer to the installation guide mapbox-gl
//this is initially in the detail.ejs page but for simplicity of adding js code we moved it to a separate js file.

mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [2.3522, 48.8566], // starting position [lng, lat], we need data(geoJSON) from our specific campgound in the detail.ejs script
    zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());
map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('photoData', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        data: photoData,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'photoData',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#e56b6f',
                100,
                '#e56b6f',
                750,
                '#e56b6f'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'photoData',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'photoData',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#e56b6f',
            'circle-radius': 5,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('photoData').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        //edited the provious code from mapbox. we just added.popUpMarkup(created in PhotoSchema.virtual)that creates a link using .title  at the end and saved it to a variable so we can pass it to the .setHTML
        const popUpText = e.features[0].properties.popUpMarkup;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setHTML(popUpText)
            .setLngLat(coordinates)
            .addTo(map);

    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});
