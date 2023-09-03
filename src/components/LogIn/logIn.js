import { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { useBetween } from 'use-between';
import './/LogIn.scss'
import Axios from 'axios';

function LogIn() {

    const dispatch = useDispatch();
    const state = useSelector((state) => state.data);
    const st = useSelector((state) => state.dataB);
    var { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
    const { isUserLogin, setisUserLogin } = useBetween(state.useShareState);
    const { currentRoot, setcurrentRoot } = useBetween(state.useShareState);
    const { businessMe, setBusinessMe } = useBetween(st.useSharingFilters);
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);
    const { items, setItems } = useBetween(st.useSharingFilters);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);
    const { token, setToken } = useBetween(state.useShareState);

    // User Type
    const { userType, setUserType } = useBetween(st.useSharingFilters);

    // business work type
    const { businessWorkType, setBusinessWorkType } = useBetween(st.useSharingFilters);

    const { workTypeId, setWorkTypeId } = useBetween(st.useSharingFilters);

    // temp work schedule
    const { workSchedule, setWorkSchedule } = useBetween(st.useSharingFilters);
    const weekDays = ['SUN', "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var workScheduleDetails = workSchedule;

    useEffect(() => {
        if (isUserOrBuisness === 'business') {
            document.getElementById('LogtoProductBusi').click();
            setcurrentRoot('/ProductBusi')

        }
        else if (isUserOrBuisness === 'user') {
            document.getElementById('LogtoMap').click();
            setcurrentRoot('/Welcome')
        }
    }, [isUserOrBuisness, businessMe]);


    const users = state.users;

    const [inputtext, setinputtext] = useState({
        email: "",
        password: ""
    });
    const [warnemail, setwarnemail] = useState(false);
    const [warnpassword, setwarnpassword] = useState(false);
    const [correctInfo, setCorrectInfo] = useState(false);



    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);

    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setinputtext((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });

    }
    const submitForm = (e) => {
        e.preventDefault();
        // setwarnemail(false);
        // setwarnpassword(false);
        // setCorrectInfo(false);

        // users.map(item => {
        //     if (item.email == inputtext.email && item.password == inputtext.password) {
        //         setCorrectInfo(true);
        //         //send true to backEnd;

        //     }

        //     if (inputtext.email == 'jawel@hotmail.com') {
        //         setisUserOrBusisness('buisness');
        //          setcurrentRoot('/ProductBusi');
        //         setisUserLogin(true);

        //     }
        //     else if(inputtext.email=='meeryawad@hotmail.com') {
        //         setisUserOrBusisness('user');
        //         setisUserLogin(true);
        //          setcurrentRoot('/Map');


        //     }
        // })


        if (inputtext.email == "") {
            setwarnemail(true);

        }

        else if (inputtext.password == "") {
            setwarnpassword(true);

        }
        // else {
        //     alert("form submitted");
        // }


        // connect with Api || log in === create session

        const sessionData = {
            'email': inputtext.email,
            'password': inputtext.password
        };

        const headers = {
            // 'Authorization': 'Bearer '+ accessToken,
            "content-type": "application/json;charset=UTF-8"
        };
        Axios.post("https://tajwal2.herokuapp.com/api/sessions", sessionData, { headers })
            .then(resSession => {
                setAccessToken(resSession.data.accessToken)
                setToken(resSession.data.accessToken)
                setUserType(resSession.data.userType)
                setisUserOrBusisness(resSession.data.userType)
                // setisUserLogin(true)

                console.log(resSession.data.accessToken + " " + resSession.data.userType)

                if (resSession.data.userType === 'business') {
                    Axios.get("https://tajwal2.herokuapp.com/api/business/me", {
                        headers: {
                            'Authorization': 'Bearer ' + resSession.data.accessToken,
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                    })
                        .then(resBusinessMe => {
                            setBuisnessProfile({
                                WorkId: resBusinessMe.data.data.business._id,
                                WorkName: resBusinessMe.data.data.business.name,
                                WorkType: resBusinessMe.data.data.business.businessTypeName.name,
                                openOrclose: buisnessProfile.openOrclose,// check
                                workTime: resBusinessMe.data.data.business.workingHours,
                                workLocation: resBusinessMe.data.data.business.location.address,
                                long: resBusinessMe.data.data.business.location.longitude,
                                lati: resBusinessMe.data.data.business.location.latitude,
                                workNumber: resBusinessMe.data.data.business.phoneNumber,
                                WorkTypeId: resBusinessMe.data.data.business.businessTypeId,
                                workMail: resBusinessMe.data.data.business.email,
                                workPassword: buisnessProfile.workPassword,// check
                                workConPassword: buisnessProfile.workConPassword,// check
                                workDescription: resBusinessMe.data.data.business.description,
                                workPicture: resBusinessMe.data.data.business.image.url,
                                nFollowers: resBusinessMe.data.data.business.followersCount,
                                nProducts: resBusinessMe.data.data.business.productsCount,
                                nRaters: resBusinessMe.data.data.business.rateCount,
                            })
                            // console.log(resBusinessMe.data.data.business.businessTypeId)
                            setWorkTypeId(resBusinessMe.data.data.business.businessTypeId)
                            setBusinessMe(resBusinessMe.data.data.business)
                            setBusinessWorkType(resBusinessMe.data.data.business.businessTypeName.name)
                            var itemsArray = [];
                            for (let i = 0; i < resBusinessMe.data.data.business.products.length; i++) {
                                const item = resBusinessMe.data.data.business.products[i];
                                console.log(item)
                                var imagesArray = [];
                                // get images of item
                                for (let j = 0; j < item.images.length; j++) {
                                    const img = item.images[j].url;
                                    imagesArray.push(img);
                                }
                                var commentsArray = [];
                                // get comments of item
                                for (let j = 0; j < item.comments.length; j++) {
                                    const comment = item.comments[j];
                                    var commentInfo = {
                                        commentNumber: j,
                                        id: comment.id,
                                        clientName: comment.userName,
                                        clientPhoto: comment.userImage,
                                        date: '27/11/2021',
                                        text: comment.text,
                                        repliesVisibility: false,
                                        replies: [
                                            {
                                                id: 1,
                                                name: buisnessProfile.WorkName,
                                                photo: buisnessProfile.workPicture,
                                                date: '28/11/2021',
                                                text: 'شكرا لدعمكم .. منتمنى دائما نكون عند حسن ظنك'
                                            }
                                        ]
                                    }
                                    commentsArray.push(commentInfo);
                                }

                                itemsArray.push({
                                    itemNumber: i,
                                    itemId: item.id,
                                    itemStoreName: item.businessName,
                                    itemStorePicture: item.images[0].url,// channnnnnge
                                    itemName: item.name,
                                    itemPhotos: imagesArray,
                                    itemCategory: (item.categories.length > 0) ? item.categories[0].categoryName : [],
                                    itemType: (item.types.length > 0) ? item.types[0].typeName : [],
                                    itemText: item.description,
                                    itemPrice: item.price,
                                    itemRate: item.rateValue.toFixed(2),
                                    itemDate: item.createdAt,
                                    itemCommentsDetails: commentsArray
                                })

                            }
                            setItems(itemsArray);
                        })
                        .catch((err) => { console.log(err) });
                }

            })
            .catch(err => console.log("session error: " + err))

    }

    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }


    return (
        <div className='LogIn'>
            <div className="dropdown-menu" >
                <NavLink to='/ProductBusi'><div id='LogtoProductBusi' style={{ display: 'none' }}></div></NavLink>
                <NavLink to='/Welcome'><div id='LogtoMap' style={{ display: 'none' }}></div></NavLink>
                <form className="px-4 py-3" >
                    <div className='trin'></div>
                    <div className="form-group">
                        {/* <label for="exampleDropdownFormEmail1">البريد الالكتروني</label> */}
                        <div className='LoginBy'><bdi> تسجيل الدخول الى <b className='name'>Tajwal </b>عبر</bdi> </div>
                        <button type="submit" className="btn facebook"> <i className='fa fa-facebook'></i> Facebook</button>

                        <div className="or">أو</div>

                        <input type="email" className="form-control" placeholder="البريد الالكتروني"
                            value={inputtext.email} onChange={inputEvent} name="email" />
                    </div>
                    <div className="form-group">
                        {/* <label for="exampleDropdownFormPassword1">كلمة السر</label> */}
                        <input type={password} className="form-control" placeholder="كلمة المرور" dir='left'
                            value={inputtext.password} onChange={inputEvent} name="password" />
                        <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`} ></i>
                    </div>


                    <button type="submit" className="btn login" onClick={submitForm}>
                        تسجيل الدخول</button>

                </form>
                {/* <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">هل نسيت كلمة السر؟</a> */}
            </div>
        </div>
    )
}

export default LogIn;