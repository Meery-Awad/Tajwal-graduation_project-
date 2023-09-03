import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Component, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import mapboxgl from 'mapbox-gl';
import '../map/mapBox/mapBox.scss';
import './googleMap.scss'

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
// mapboxgl.setRTLTextPlugin(
//     'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
//     null,
//     true // Lazy load the plugin
// );

const MapBoxSignUp = (props) => {
    const mapContainerRef = useRef(null);
    const state = useSelector((state) => state.data);
    const { lati, long } = useBetween(state.useShareState);
    const [lng, setLng] = useState(long);
    const [lat, setLat] = useState(lati);
    const [zoom, setZoom] = useState(15.4);
    const { latiLongSignUp, setilatiLongSignUp } = useBetween(state.useShareState);
    var stores = state.stores;
    useEffect(() => {
        setLng(long);
        setLat(lati);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [long, lati],
            zoom: 15.2
        });

        // Add navigation control (the +/- zoom buttons) new mapboxgl.NavigationControl(), 'top-right'
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        }));
        map.on('load', function () {
            ////// my Location///////////////////////////////
            const myLoc = document.createElement('div');
            myLoc.className = 'myLoc';

            const youAreHear = document.createElement('div');
            youAreHear.className = 'youAreHear';
            youAreHear.innerHTML = 'انت هنا'
            const myLocCont = document.createElement('div');
            myLocCont.appendChild(youAreHear);
            myLocCont.appendChild(myLoc);
            myLocCont.className = 'myLocCont';
            new mapboxgl.Marker(myLocCont)

                .setLngLat([long, lati])
                .addTo(map);
            //   new mapboxgl.Popup()
            //   .setLngLat([long, lati])
            //   .setHTML(`<div> <div class="youAreHear1">انت هنا</div> <div>`)
            //   .addTo(map);

            ////////////////////////////////////////////////////////////////////////////////
            map.on('click', function (e) {
                var coordinates = e.lngLat;
                // alert(coordinates.lng);
                // alert(coordinates.lat);
                setilatiLongSignUp({long: coordinates.lng, lati: coordinates.lat})
                // alert(latiLongSignUp.long);
                // alert(latiLongSignUp.lati)
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`متجرك هنا
                <div class="marker ${props.optionStore == 'مطعم' ? "fa fa-cutlery" : "fas fa-tshirt"}"></div>`)
                    .addTo(map);
            });


        });


    }, [])
    return (
        <div className='MapBoxSignUp'>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
            <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>
            <div className='MapLoad'>
                <span className="box-3">
                    <div className="loader-3">
                        <div className="pulse"></div>
                        <div className="pulse"></div>
                        <div className="pulse"></div>
                    </div>
                </span>
                <span>يتم تحميل الخريطة , الرجاء الانتظار قليلاً</span> </div>
            <div className='map-container' ref={mapContainerRef} style={{ width: '100%', height: '350px' }} />

        </div>
    );
};
export default MapBoxSignUp;