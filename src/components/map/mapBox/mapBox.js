import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './mapBox.scss';
import StartRate from '../startRate/startRate';
import TodoItem from '../products/TodoIitem';
import { useSelector } from 'react-redux';
import { useBetween } from 'use-between';
import { NavLink, Link } from 'react-router-dom';
import * as ReactDOMServer from 'react-dom/server';
import SearchMap from '../SearchMap'
import $ from 'jquery';
import '../SearchMap.scss'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Meery from '../../photo/meery.jpg'
import Axios from 'axios';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    null,
    true // Lazy load the plugin
);

const MapBox = () => {

    const mapContainerRef = useRef(null);

    const state = useSelector((state) => state.data);
    const { lati, long } = useBetween(state.useShareState);

    const [mapLoad, setLoad] = useState(false);
    const lazyRoute = useRef('walking');
    const { dropdownOpenLogin, setdropdownOpenLogin, resStor, setStore } = useBetween(state.useShareState);
    const { idStore, setidStore, allMess, setallMess, dirWay, setDirWay } = useBetween(state.useShareState);
    const wayRoute = useRef('walking');
    const lazyWay = useRef(false);
    const id = useRef(0);
    const timeW = useRef([]);
    const disRef = useRef([]);
    const feat = useRef({});
    const geometry = useRef([]);
    const [indexFoll, setFollIndex] = useState(600);
    const [lazyFoll, setLazyFoll] = useState(false);
    const { isUserLogin, setisUserLogin, profileData, setProfileData,token } = useBetween(state.useShareState);
    const [lng, setLng] = useState(long);
    var follows = useRef([]);
    const [lat, setLat] = useState(lati);

    const [zoom, setZoom] = useState(15.4);

    const [dropdownStoresOpen, setdropdownStoresOpen] = useState(false);
    const {
        selectMessId, setSelectMessId, messStore, setMessStore } = useBetween(state.useShareState);
    const element = $(`#${'selectMess'}`);
    element.animate({
        scrollTop: element.prop("scrollHeight")
    }, 500);

    for (var i = 0; i <= 600; i++) {
        follows.current.push({ followId: 0, stateFollow: false, NumId: i });
    }
    useEffect(() => {
        // new WOW.WOW({
        //     live: false
        // }).init();

       
        if (profileData.followedBusiness != undefined) {
            var cnt = 0;
            stores.map(item => {
                follows.current[cnt].followId = item._id;
                cnt++;

            })
            profileData.followedBusiness.map(item => {
                follows.current.map(item1 => {

                    if (item._id == item1.followId) {
                        item1.stateFollow = true;
                    }

                })
            })
        }



        setProfileData(profileData);
    }, [profileData,follows.current])
    // stores.features.forEach((store, i) => {
    //     store.properties.id = i + 1;
    // });


    function foll(item) {

        if (isUserLogin == false)
            setdropdownOpenLogin(!dropdownOpenLogin)
        else {
            var cnt = 0;
            follows.current.map(item1 => {
                if (item._id == item1.followId) {
                    item1.stateFollow = !item1.stateFollow;
                    if(item1.stateFollow === true){
                        const data = {
                            "businessId": item._id
                        };
        
                        const headers = {
                            'Authorization': 'Bearer ' + token,
                            "content-type": "application/json;charset=UTF-8"
                        };
                        Axios.post("https://tajwal2.herokuapp.com/api/follow", data, { headers })
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(err => console.log(err));
                    }
                    else{
                       
        
                        const headers = {
                            'Authorization': 'Bearer ' + token,
                            "content-type": "application/json;charset=UTF-8"
                        };
                        Axios.delete(`https://tajwal2.herokuapp.com/api/follow/${item._id}`, { headers })
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(err => console.log(err));

                    }
                    //back
                    setLazyFoll(!lazyFoll)

                }
                cnt++;


            })





        }
    }
    const stores = resStor;


    if (disRef.current[0] != undefined) {
       
        stores.map(item => {
           
              for(var i=0;i<disRef.current.length ; i++){
                if (item._id == disRef.current[i].id) {

                    item.distance = disRef.current[i].num;
                    item.timeWalk = timeW.current[i].num;
                }
            }
           
            // alert(item.distance)
        })

    }

    var cnt1 = -1;
    const storCont = stores.length ? (

        stores.sort((a, b) => a.timeWalk - b.timeWalk).map(item => {
            // if(item.distance!=undefined)
            var index = 600;
            for (var i = 0; i < follows.current.length; i++) {
                if (item._id == follows.current[i].followId)
                    index = follows.current[i].NumId;

            }

            return (
                <div className='item' key={item._id} id='item'>
                    <div className='linkCont'>
                        <img src={item.image.url} className='photoStor'></img>
                        <a className='title' id='title' href='#'><bdi>{item.name}</bdi></a>
                        <div className='follow' onClick={() => foll(item)}
                            style={{
                                color: follows.current[index].stateFollow == true && isUserLogin == true ? '#FFFFFF' : '#525151',
                                backgroundColor: follows.current[index].stateFollow == true && isUserLogin == true ? '#47A851' : '#FFFFFF'
                            }}>متابعة</div>
                    </div>
                    <div className='detailsCont'>
                        <i className={`${item.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`}></i>
                        <span className={`details ${item.businessTypeName.name == 'مطاعم' ? "cutlery" : "tshirt"}`}><bdi>{item.businessTypeName.name}</bdi></span>
                        <div className='starStores' >  <StartRate id={item._id} /></div>

                    </div>
                    <div className='disWay'><bdi>  <i className={`${dirWay == 'walking' ? "fas fa-walking" : "fas fa-car"}`}></i><span className='time'>{item.timeWalk} دقيقة </span></bdi></div>

                    {/* <div className='disStore' id='disStore'><bdi> يبعد <span className='disNum'>{item.properties.distance} </span>  كم </bdi></div> */}
                    <NavLink to='/ProfileBuisness' state={{profileItem:item}} style={{ textDecoration: 'none' }}> <div className='goToMoreDetails'>تفاصيل</div></NavLink>



                </div>
            )
        })) : (<p><bdi>لا توجد متاجر حتى الآن!!</bdi></p>)




    useEffect(() => {
        setLng(long);
        setLat(lati);
        setStore(resStor);


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
            // trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            // showUserHeading: true
        }));
        // map.addControl(
        //     new MapboxDirections({
        //     accessToken: mapboxgl.accessToken,
        //     unit: 'metric',
        //     }),
        //     'top-right'
        //     );
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
        ;

        map.on('load', () => {
            /**
            * This is where your '.addLayer()' used to be, instead
            * add only the source without styling a layer
            */
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

            // new mapboxgl.Popup()
            //     .setLngLat([long, lati])
            //     .setHTML(`<div><div class=youAreHear1>انت هنا</div></div>`)
            //     .addTo(map);


            ////////////////////////////////////////////////////////////////////////////////
            document.getElementsByClassName('MapLoad').display = 'none'
            map.addSource('places', {
                'type': 'geojson',
                'data': stores
            });

            var cntTime = 0;
            for (const store of stores) {
                var coordinates5 = [ store.location.longitude,store.location.latitude]
                // var coordinates5 = [36.7194282, 34.722394]
                getTime(store, coordinates5, cntTime);
                cntTime++;



            }

            buildLocationList(stores);
            // map.addControl(geocoder, 'top-left');
            addMarkers();
            setLoad(true);

            if (idStore != 'meery') {
                var cnt = 0;
                for (const feature of stores) {

                    if (idStore === feature._id) {
                        flyToStore(feature);
                        createPopUp(feature);
                    }
                    cnt++;
                    // getRoute(2, state.stores.features[2].geometry.coordinates)
                }
            }

            /* Get the coordinate of the search result */
            // const searchResult = event.result.geometry;




            /**
            * Sort stores by distance from closest to the `searchResult`
            * to furthest.
            */


            /**
* Rebuild the listings:
* Remove the existing listings and build the location
* list again using the newly sorted stores.
*/


            buildLocationList(stores);

            /* Open a popup for the closest store. */
            createPopUp(stores[0]);

            /** Highlight the listing for the closest store. */
            const activeListing = document.getElementById(
                `listing-${stores[0]._id}`
            );
            activeListing.classList.add('active');

            /**
            * Adjust the map camera:
            * Get a bbox that contains both the geocoder result and
            * the closest store. Fit the bounds to that bbox.
            */
            // const bbox = getBbox(stores, 0, searchResult);
            // map.fitBounds(bbox, {
            //     padding: 100
            // });

        });

        /**
        * Using the coordinates (lng, lat) for
        * (1) the search result and
        * (2) the closest store
        * construct a bbox that will contain both points
        */


        function addMarkers() {
            /* For each feature in the GeoJSON object above: */

            for (const marker of stores) {
                /* Create a div element for the marker. */

                const el = document.createElement('i');
                //    const name=el.appendChild(document.createElement('div'));

                /* Assign a unique `id` to the marker. */
                el.id = `marker-${marker._id}`;
                /* Assign the `marker` class to each marker for styling. */

                el.className = `marker  ${marker.businessTypeName.name == 'مطاعم' ? "fa fa-cutlery" : "fas fa-tshirt"}`;
                // el.src="https://pic.onlinewebfonts.com/svg/img_465785.png"



                /**
                * Create a marker using the div element
                * defined above and add it to the map.
                **/
                
                var coordinates = [marker.location.longitude, marker.location.latitude]
                // var coordinates = [36.7194282, 34.722394]
                new mapboxgl.Marker(el, { offset: [0, -23] })
                    .setLngLat(coordinates)
                    .addTo(map);

                /**
                * Listen to the element and when it is clicked, do three things:
                * 1. Fly to the point
                * 2. Close all other popups and display popup for clicked store
                * 3. Highlight listing in sidebar (and remove highlight for all other listings)
                **/
                el.addEventListener('click', (e) => {
                    // activFiltra(marker.properties.id);
                    /* Fly to the point */
                    flyToStore(marker);
                    /* Close all other popups and display popup for clicked store */

                    createPopUp(marker);
                    id.current = marker._id;
                    var coordinates7 = [ marker.location.longitude,marker.location.latitude,]
                    geometry.current = coordinates7;
                    feat.current = marker;
                    lazyWay.current = true;
                    /* Highlight listing in sidebar */
                    const activeItem = document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(
                        `listing-${marker.properties.id}`
                    );
                    listing.classList.add('active');
                });

            }


        }



        const disWalk = document.getElementById('disWalk');
        const disDrive = document.getElementById('disDrive');
        var cntTime1 = 0;
        disWalk.addEventListener('click', () => {
            wayRoute.current = 'walking';
            cntTime1 = 0;
            for (const store of stores) {
                var coordinates1 = [store.location.longitude,store.location.latitude]
                // var coordinates1 = [36.7194282, 34.722394]

                getTime(store, coordinates1, cntTime1);
                cntTime1++;


            }

            if (lazyWay.current == true) {
                getRoute(id.current, geometry.current);
                createPopUp(feat.current);
            }

        })
        disDrive.addEventListener('click', () => {
            wayRoute.current = 'driving'
            cntTime1 = 0;

            document.getElementById('disDrive').style.color = 'red';
            for (const store of stores) {
                var coordinates2 = [ store.location.longitude,store.location.latitude]
                // var coordinates2 = [36.7194282, 34.722394]

                getTime(store, coordinates2, cntTime1);
                cntTime1++;



            }

            if (lazyWay.current == true) {
                getRoute(id.current, geometry.current);
                createPopUp(feat.current);

            }

        })

        async function getRoute(item, end) {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/${wayRoute.current}/${long},${lati};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );
            const json = await query.json();
            const data = json.routes[0];
            const route = data.geometry.coordinates;
            // alert(route);

            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: []
                },

            };
            // if the route already exists on the map, we'll reset it using setData
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);

            }
            // otherwise, we'll make a new request
            else {

                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',

                        'line-width': 5,
                        'line-opacity': 0.75,
                        // 'line-gradient': [
                        //     'interpolate',
                        //     ['linear'],
                        //     ['line-progress'],
                        //     0, "blue",
                        //     0.1, "royalblue",
                        //     0.3, "cyan",
                        //     0.5, "lime",
                        //     0.7, "yellow",
                        //     1, "red"
                        // ]
                    }
                });
            }
            // Create a GeoJSON source with an empty lineString.

            var speedFactor = 100 // number of frames per longitude degree

            var diffX = end[0] - long;
            var diffY = end[1] - lati;

            var sfX = diffX / speedFactor;
            var sfY = diffY / speedFactor;


            var lineCoordinates = [];

            for (var i = 0; i < route.length; i++) {

                lineCoordinates.push([route[i][0], route[i][1]]);


            }



            var animationCounter = 0;

            function animateLine() {

                if (animationCounter < lineCoordinates.length) {

                    geojson.geometry.coordinates.push(lineCoordinates[animationCounter]);

                    map.getSource('route').setData(geojson);

                    requestAnimationFrame(animateLine);
                    animationCounter = animationCounter + 1;
                }
                // else {
                //     var coord = geojson.geometry.coordinates;
                //     coord.shift();


                //     if (coord.length > 0) {
                //         geojson.geometry.coordinates = coord;
                //         map.getSource('route').setData(geojson);

                //         //-------------- Point2 Animation End ---------------
                //         // requestAnimationFrame(animateLine);
                //     }
                // }

            }

            animateLine();





        }


        async function getTime(store, end, cntTime) {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            //   alert(cntTime);
            

            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/${wayRoute.current}/${long},${lati};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            )


            const json = await query.json();
            const data = json.routes[0];
            //  if(cntTime==stores.length - 1)
            //  {
            //     timeW.current=[];
            //     disRef.current=[];

            //  }
            if (lazyRoute.current != wayRoute.current && cntTime == 0) {


                lazyRoute.current = wayRoute.current;
                timeW.current = [];
                disRef.current = [];
               
                

            }

            timeW.current.push({ id: store._id, num: (Math.round(data.duration / 60)) });
           
            if (data.distance >= 1000) {
                store.distance =
                    `${Math.round(data.distance) / 1000} كيلومتر`;
                    console.log(store.distance)
            }
            else {
                store.distance =
                    `${data.distance} متر`;
            }
            

            disRef.current.push({ id: store._id, num: Math.round(data.distance) / 1000 });





            // store.distance = store.distance.toFixed(3);
            // alert(store.distance);



        }

        /**
        * Add a listing for each store to the sidebar.
        **/
        function buildLocationList(stores) {
            let suggestions = [


            ];
            for (let i = 1; i <= stores.length; i++) {
                // stores.features[i - 1].properties.id = i;
                // alert(stores.features[i - 1].properties.id);
                // alert(stores.features[i - 1].properties.name);

                const obj = {
                    'storeId': stores[i - 1]._id, 'name': stores[i - 1].name,
                    'photo': stores[i - 1].image.url,
                    'geo': stores[i - 1]
                }

                suggestions.push(obj)

            }


            for (const store of stores) {
                /* Add a new listing section to the sidebar. */
                const link = document.getElementById('title');

                link.id = `link-${store._id}`;


                link.addEventListener('click', function () {
                    var cnt = 0;

                    for (const feature of stores) {


                        // alert(this.id);
                        // alert(`link-${feature._id}`);
                        if (this.id === `link-${feature._id}`) {

                            setidStore(feature._id)

                            flyToStore(feature);
                            var coordinates2 = [ feature.location.longitude,feature.location.latitude]


                            getRoute(feature, coordinates2);
                            getTime(feature, coordinates2, -1)
                            id.current = feature._id;
                            geometry.current = coordinates2;
                            feat.current = feature;

                            lazyWay.current = true;
                            createPopUp(feature);

                            // activFiltra(feature.properties.id);






                        }
                        cnt++;
                    }


                    document.querySelector('.dropDown').style.backgroundColor = 'rgb(228, 226, 226)';
                    const activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    this.parentNode.classList.add('active');
                });
            }
            //////////////////////////////////////Search/////////////////////////////////////////////



            // fetch("https://vinote.herokuapp.com/users", requestOptions)
            //     .then(response => response.text())
            //     .then(result => {
            //         for (let i = 0; i < (JSON.parse(result).users).length; i++) {
            //             suggestions[i] = JSON.parse(result).users[i].userName
            //         }
            //     })
            //     .catch(error => console.log('error', error));



            // getting all required elements
            const searchWrapper = document.querySelector(".search-input");
            const inputBox = searchWrapper.querySelector("input");
            const suggBox = searchWrapper.querySelector(".autocom-box");
            const icon = searchWrapper.querySelector(".iconSe");
            let linkTag = searchWrapper.querySelector("a");
            let webLink;

            // if user press any key and release
            inputBox.onkeyup = (e) => {

                let userData = e.target.value; //user enetered data
                // this.props.handleName(e.target.value);
                let emptyArray = [];
                if (userData) {
                    icon.onclick = () => {

                        linkTag.setAttribute("href", webLink);
                        linkTag.click();
                    }

                    emptyArray = suggestions.filter((data) => {
                        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                        return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                    });
                    emptyArray = emptyArray.map((data) => {
                        // passing return data inside li tag

                        return data = `<div> <img src=${data.photo}/><li><bdi>${data.name}<bdi></li><h1 class='h1Data'>${data.storeId}</h1></div>`

                    });

                    searchWrapper.classList.add("active"); //show autocomplete box
                    showSuggestions(emptyArray);
                    let allList = suggBox.querySelectorAll("li");
                    let idList = suggBox.querySelectorAll("h1");

                    for (let i = 0; i < allList.length; i++) {
                        //adding onclick attribute in all li tag

                        allList[i].onclick = function () { id.current = idList[i].textContent; select(this); };


                    }
                } else {
                    searchWrapper.classList.remove("active"); //hide autocomplete box
                }


            }


            function select(element) {
                lazyWay.current = true;
                let selectData = element.textContent;
                inputBox.value = selectData;

                var idSugg = id.current;

                for (const feature of stores) {
                    if (idSugg == feature._id) {
                        flyToStore(feature);
                        id.current = feature._id;
                        // alert(id.current)
                        var coordinates3 = [ feature.location.longitude,feature.location.latitude]
                        // var coordinates3 = [36.7194282, 34.722394]
                        geometry.current = coordinates3;
                        getRoute(feature._id, geometry.current);
                        createPopUp(feature);

                    }
                }



                let b = false;
                setSelectMessId(state.currentUser[0].messages.length);
                setallMess([]);
                messStore.map((item, i) => {

                    if (item._id == idStore) {
                        setallMess(item.allMess); setSelectMessId(i);
                        b = true
                    }
                    // else if (item.storeId != idStore && b == false) {

                    //     setallMess([]);
                    //     setSelectMessId(state.currentUser[0].messages.length);



                    // }


                })
                searchWrapper.classList.remove("active");
                // flyToStore([36.7542 , 34.7271])
            }

            function showSuggestions(list) {
                let listData;
                if (!list.length) {

                    listData = '<li>' + inputBox.value + '</li>';
                } else {
                    listData = list.join('');
                }

                suggBox.innerHTML = listData;

            }

            /////////////////////////////////////////////////////////////////////////////////////////

        }

        /**
        * Use Mapbox GL JS's `flyTo` to move the camera smoothly
        * a given center point.
        **/
        function flyToStore(currentFeature) {
            // alert(currentFeature.geometry.coordinates)
            var coordinates3 = [currentFeature.location.longitude,currentFeature.location.latitude]
            // var coordinates3 = [36.7194292, 34.722356];
            map.flyTo({
                center: coordinates3,
                zoom: 15.2,
                bearing: 0,

                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                speed: 0.1, // make the flying slow
                curve: 1, // change the speed at which it zooms out

                // This can be any easing function: it takes a number between
                // 0 and 1 and returns another number between 0 and 1.
                easing: (t) => t,

                // this animation is considered essential with respect to prefers-reduced-motion
                essential: true
            });

        }
        <div className='searchMap'>
            <SearchMap flyToStore={flyToStore} />
        </div>
        /**
        * Create a Mapbox GL JS `Popup`.
        **/
        function createPopUp(currentFeature) {
            // alert(currentFeature.geometry.coordinates)

            const popUps = document.getElementsByClassName('mapboxgl-popup');
            if (popUps[0]) popUps[0].remove();
            var coordinates4 = [ currentFeature.location.longitude,currentFeature.location.latitude]
            // var coordinates4 = [36.7194292, 34.722356]
            const popup = new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat(coordinates4)
                .setHTML(
                    `<div>
                    <div class='currentNmaeLoc'><img src=${currentFeature.image.url} class='currentFeatureImg' />
                        ${currentFeature.name}</div>
                    <div class="PopUp">
                        <div class='disPopUp'>${currentFeature.distance}</div>
                        <i class='fa fa-clock-o'></i>
                        <span>مفتوح الان</span>
                       
                         
                        </div>
                    </div>
                `


                )
                .addTo(map);
            getRoute(currentFeature, coordinates4);

        }

        // Clean up on unmount
        return () => { map.remove(); clearInterval(getTime); }


    }, [long, lati, resStor.length]); // eslint-disable-line react-hooks/exhaustive-deps
    function toggle() {

        if (mapLoad)
            setdropdownStoresOpen(!dropdownStoresOpen);
        //  document.querySelector('.dropDownStore').style.background = '#47A851';



    }


    var cnt = 0;
    const hidAndShowSearch = () => {

        if (cnt == 0) {
            document.querySelector('.searchInput').style.width = '32%';
            document.querySelector('.searchInput').style.backgroundColor = '#fff';
            document.querySelector('.searchInput').style.boxShadow = '0px 1px 5px 3px rgba(0,0,0,0.12)';
            document.querySelector('.autocom-box').style.display = 'block';
            cnt = 1;
        }
        else {
            document.querySelector('.searchInput').style.width = '0%';
            document.querySelector('.searchInput').style.backgroundColor = 'transparent'
            document.querySelector('.searchInput').style.boxShadow = 'none';
            document.querySelector('.autocom-box').style.display = 'none';
            cnt = 0;
        }

    }

    return (
        <div className='mapBox'>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"></link>
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
            <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>

            <div className='searchMap'>

                <div className="wrapperSe">

                    <div className="search-input">


                        <input type="text" placeholder="بحث..." id='s' dir="right" className='searchInput'  ></input>
                        <div className="autocom-box">
                            {/* <!-- here list are inserted from javascript --> */}
                        </div>
                        <div className="iconSe" onClick={hidAndShowSearch}><i className="fa fa-search"></i></div>
                    </div>

                </div>
            </div>
            <Dropdown isOpen={dropdownStoresOpen} onClick={toggle}  >
                <DropdownToggle caret className='dropDownStore'>
                    <div className='allStore'><bdi> المتاجر الحالية <span className='storSort'>(بدءاً من الأقرب إليك) </span></bdi></div>
                </DropdownToggle>

            </Dropdown>
            <div onClick={() => { setDirWay('walking'); setdropdownStoresOpen(false) }} id='disWalk'><i className=" inMap fas fa-walking" title='go walk'
                style={{
                    backgroundColor: dirWay == 'walking' ? "#47A851" : "#fff"
                    , color: dirWay == 'walking' ? "#fff" : "#333"
                }

                }
            ></i></div>
            <div onClick={() => { setDirWay('driving'); setdropdownStoresOpen(false) }} id='disDrive' className='disDrive'><i className=' inMap fas fa-car' title='go by car'
                style={{
                    backgroundColor: dirWay == 'driving' ? "#47A851" : "#fff"
                    , color: dirWay == 'driving' ? "#fff" : "#333"
                }}></i></div>
            <div className='sidebar'>


                <div className="listings" id='listings'
                    style={{ display: dropdownStoresOpen == true ? 'block' : 'none' }}>

                    {storCont}
                </div>


            </div>

            <div className='MapLoad'>
                <span className="box-3">
                    <div className="loader-3">
                        <div className="pulse"></div>
                        <div className="pulse"></div>
                        <div className="pulse"></div>
                    </div>
                </span>
                <span>يتم تحميل الخريطة , الرجاء الانتظار قليلاً</span> </div>
            <div className='map-container' ref={mapContainerRef} style={{ width: '100%', height: '530px' }} />
            {/* <div>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            {/* <div className='Fltera TodoItem'>
                <TodoItem />
            </div> */}
            <footer style={{ position: 'relative' }}>
                <div className="footer1" style={{ position: 'relative' }}>
                    <div className="row1">
                        <ul>
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        </ul>
                    </div>

                    <div className="row1 footerWord">
                        <ul>

                            <NavLink to='/ContactUs' style={{ textDecoration: 'none' }}>
                                <li><a href="#">تواصل معنا</a></li>
                            </NavLink>
                            <NavLink to='/ourServices' style={{ textDecoration: 'none' }}>
                                <li><a href="#">خدماتنا</a></li>
                            </NavLink>
                            <NavLink to='/PrivacyPolicy' style={{ textDecoration: 'none' }}>
                                <li><a href="#">سياسة الخصوصية</a></li>
                            </NavLink>
                            <NavLink to="/AboutUs" style={{ textDecoration: 'none' }}>
                                <li><a href="#">من نحن؟</a></li>
                            </NavLink>
                        </ul>
                    </div>

                    <div className="row1">
                        <ul className='FootDes'>
                            <div className='footerWord first'>
                                {/* <bdi>
                  Tajwal
                </bdi> */}
                                <bdi>
                                    حقوق الطبع و النشر
                                </bdi>
                                <bdi> - 2022 © </bdi>
                                <bdi>جميع الحقوق محفوظة || تصميم: ميري عوض </bdi>
                                <bdi>  &  جويل الياس</bdi>
                            </div>
                        </ul>
                    </div>
                    <div className='row1 footerWord'>
                        <ul>
                            <bdi>
                                <b></b>
                                يمكنك تحميل التطبيق من خلال الرابط: <a href='#' className='linkApp' style={{ color: 'rgb(242, 241, 241)' }}>من هنا</a>
                            </bdi>
                        </ul>
                    </div>


                </div>

            </footer >
        </div >
    );
};

export default MapBox;
