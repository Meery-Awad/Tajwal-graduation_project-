
import NewMoon from '../photo/NewMoon.jpg';
import Img from '../photo/NewMoon.jpg';
import Cranchy from '../photo/cranshe.jpg';
import Gosto from '../photo/Gosto.jpg';
import She from '../photo/she.jpg';
import Bordo from '../photo/bordo.jpg';

import Pizza from '../photo/pizza1.jpg'
import Hamburger from '../photo/hamburger.jpg';
import Dr1 from '../photo/dr1.jpg';
import Dr2 from '../photo/dr2.jpg';
import Dr3 from '../photo/dr3.jpg';
import MinCheeseBer from '../photo/minCheeseBer.jpg';
import Moheto from '../photo/moheto.jpg';
import Iced_coffee from '../photo/iced_coffee.webp';
import Shauorma from '../photo/shauorma.webp';
import Jm from '../photo/Jm.jpg';
import fourSessisonPizza from '../photo/fourSessisonPizza.jpg';



import UserPhoto from '../photo/myPhoto.jpg'
import Img2 from '../photo/cranshe.jpg'
import useGeolocation from 'react-hook-geolocation'
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useBetween } from 'use-between';
import Axios from 'axios';
//step 3


const reminders = (state = [], action) => {

    //-----------------------<بيانات المستخدم>------------------------------

    const isUserLogin = false;
   


    //-----------------------</بيانات المستخدم>------------------------------

    //---------------------------<الاقتراحات>----------------------------------
    var NewSugg = 4;
    var NewNoti = 10;


   

    //---------------------------</الاقتراحات>----------------------------------




    //////////////////////////  for Front only /////////////////////////////////


    const useShareState = () => {

        const [selectMessId, setSelectMessId] = useState(-1);

        const [dropdownOpenLogin, setdropdownOpenLogin] = useState(false);

        // const [messStore, setMessStore] = useState(currentUser[0].messages);
        const [idStore, setidStore] = useState('meery');
        var [theProd, setTheProd] = useState([]);
        var [theNameProd, setNameProd] = useState('');
        var [theNumProd, setTheNumProd] = useState();
        const [dirWay, setDirWay] = useState('walking');
        const [value, setInputValue] = useState('');
        const [index, setIndex] = useState(0);
        const [flyTo, setFlyTo] = useState(false);
        const [allMess, setallMess] = useState([]);
        const [activeFiltra, setactiveFiltra] = useState(false);

        // if (isUserOrBuisness == 'business') {
        //     currentUser[0].userPhoto = Img;
        //     currentUser[0].userName = 'New Moon'
        // }
        // else {
        //     currentUser[0].userPhoto = UserPhoto;
        //     currentUser[0].userName = 'Meery-Awad'
        // }
        const [isUserLogin, setisUserLogin] = useState(false);
        var [isUserOrBuisness, setisUserOrBusisness] = useState('');

        /////////////////// My Location ////////////////////////

        const geolocation = useGeolocation();
        const lati = geolocation.latitude;
        const long = geolocation.longitude;

        const [latiLongSignUp, setilatiLongSignUp] = useState({});

        ///////////////////////////////////////////////////////

        ////////////////////////// city //////////////////////
        const city = [{ cityId: 1, cityName: 'حمص' }];
        ///////////////////////////////////////////////////////

        //////////////////////// street//////////////////////
        const street = [{ streetId: 1, streetName: 'الحضارة-العشاق' }]
        /////////////////////////////////////////////////////

        /////////////////////// store ///////////////////////
        const store = [{ storeId: 1, storeName: 'مطاعم', storeIcon: 'fa fa-cutlery' },
        { storeId: 2, storeName: 'ألبسة', storeIcon: 'fas fa-tshirt' }

        ]
        const [token, setToken] = useState("");
        const [resStor, setStore] = useState([]);

        // const [resStor,setResStor]=useState([]);
        if (resStor.length == 0) {


            Axios.get('https://tajwal2.herokuapp.com/api/business',{
                headers: {
                    // 'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    // handle success
                    setStore(response.data.data.buisnesses);
                    console.log(response.data.data.buisnesses)

                    // نحصل ع البيانات
                })
                .catch((err) => {
                    // handle error
                    console.log(err)
                   
                })

        }

        const [SuggPages1, setSuggPages] = useState([]);
        const [SuggProductss, setSuggProuducts] = useState([]);
        if (SuggPages1.length == 0 && token !="" && isUserOrBuisness=='user') {
            Axios.get('https://tajwal2.herokuapp.com/api/rec/business', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    // handle success
                    setSuggPages(response.data.data.businesses);


                    // نحصل ع البيانات
                })
                .catch((err) => {
                    // handle error
                  
                })
        }

        if (SuggProductss.length == 0 && token != "" && isUserOrBuisness=='user') {
            Axios.get('https://tajwal2.herokuapp.com/api/rec/products', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    // handle success
                    setSuggProuducts(response.data.data.products);
                   

                    // نحصل ع البيانات
                })
                .catch((err) => {
                    // handle error
                  
                })
        }
        const [rateBusi, setRateBusi] = useState({});
        const [cnt2, setCnt2] = useState(0);
        if (cnt2==0 && token != ""&&isUserOrBuisness=='business') {
            Axios.get('https://tajwal2.herokuapp.com/api/rates', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    // handle success
                    console.log(response.data);
                    setRateBusi(response.data.data);
                    
                    setCnt2(1);

                    // نحصل ع البيانات
                })
                .catch((err) => {
                    // handle error
                   
                })
        }
        

        const [profileData, setProfileData] = useState({});
        const [cnt10, setcnt10] = useState(0);
        if (cnt10 == 0 && token !="" && isUserOrBuisness=="user") {
            console.log(token)
            Axios.get('https://tajwal2.herokuapp.com/api/users', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    // handle success

                    setProfileData(response.data.data.user);
                    setcnt10(1);
                    console.log(response.data.data.user)
                    

                    // نحصل ع البيانات
                })
                .catch((err) => {
                    // handle error
                    // console.log(err)
                   
                })

        }


       
        var [currentRoot, setcurrentRoot] = useState('/Welcome');
        if (isUserOrBuisness == 'business') { setcurrentRoot('/ProductBusi') }
        else { setcurrentRoot('/Map') }
        ////////////////////////////////////////////////////

        return {
            dropdownOpenLogin,
            setdropdownOpenLogin,
            isUserOrBuisness,
            setisUserOrBusisness,
            isUserLogin,
            setisUserLogin,
            currentRoot,
            setcurrentRoot,
            //myLoc
            lati, long,
            //gatigory
            activeFiltra, setactiveFiltra,
            idStore, setidStore,
            index, setIndex,
            allMess, setallMess,
            theProd, setTheProd,
            theNameProd, setNameProd,
            theNumProd, setTheNumProd,
            selectMessId, setSelectMessId,
            dirWay, setDirWay,
            value, setInputValue,
            city, street, store,
            flyTo, setFlyTo,
            resStor, setStore,
            SuggPages1, setSuggPages,
            latiLongSignUp, setilatiLongSignUp,
            SuggProductss, setSuggProuducts,
            rateBusi, setRateBusi,
            profileData, setProfileData,
            token, setToken
        }
    }


    ////////////////////////// </for Front only> /////////////////////////////////


    // ----------------------------data----------------------------------------

    const data = {
        // بيانات المستخدم
       isUserLogin,


        // الاقتراحات
        NewSugg, NewNoti,
        // just for Front
        useShareState,
    }




    return data;

}

export default reminders