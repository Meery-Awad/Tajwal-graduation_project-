import { React, useState, useRef, useEffect } from 'react';
import '../../bootstrap/css/bootstrap.css';
import '../style/App.css';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Rate1 from '../../components/map/Rate/rate1';
import Shkoa from '../../components/map/Shkoa/shkoa';
import { useBetween } from 'use-between';
import Axios from 'axios';



function Profile(props) {
    const st = useSelector((state) => state.dataB);
    const state = useSelector((state) => state.data);
    const { todayWork, setTodayWork } = useBetween(st.useSharingFilters);
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);
    const { value, setInputValue, token } = useBetween(state.useShareState);
    const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    let location = useLocation();
    var fromClient = {};
    var ByClientBuisnessProfile = {};
    var itemsFromClient = [];
    var workTypeId = '';
    if (isUserOrBuisness === 'user' || isUserOrBuisness === '') {
        fromClient = location.state.profileItem
        ByClientBuisnessProfile = {
            WorkId: fromClient._id,
            WorkName: fromClient.name,
            WorkType: fromClient.businessTypeName.name, // ألبسة مطاعم
            openOrclose: 'مفتوح الآن',
            workTime: fromClient.workingTime,
            workLocation: fromClient.location.address,
            long: 0,
            lati: 0,
            workNumber: fromClient.phoneNumber,
            WorkTypeId: fromClient.businessTypeId,
            workMail: fromClient.email,
            workPassword: '',
            workConPassword: '',
            workDescription: fromClient.description,
            workPicture: fromClient.image.url,
            showComment: true,
            nFollowers: fromClient.followersCount,
            nProducts: fromClient.productsCount,
            nRaters: fromClient.rateCount,
        }
        itemsFromClient = fromClient.products
        workTypeId = fromClient.businessTypeId
    }

    const Profile = (isUserOrBuisness === 'business') ? buisnessProfile : ByClientBuisnessProfile;
    // MODAL SHOW FUNCTIONS
    const [showStatistics, setShowStatistics] = useState(false);

    const handleCloseStatistics = () => setShowStatistics(false);
    const handleShowStatistics = () => setShowStatistics(true);

    // *** (Feedback Modal)
    const [showFeedback, setShowFeedback] = useState(false);
    const handleCloseFeedback = () => setShowFeedback(false);
    const handleShowFeedback = () => setShowFeedback(true);

    const [showTrueModal, setShowTrueModal] = useState(false);
    const handleCloseTrueModal = () => setShowTrueModal(false);
    const handleShowTrueModal = () => setShowTrueModal(true);

    const { isUserLogin, setisUserLogin } = useBetween(state.useShareState);
    const { dropdownOpenLogin, setdropdownOpenLogin } = useBetween(state.useShareState);
    const { flagEditProfileBusi, setFlagEditProfileBusi } = useBetween(st.useSharingFilters);

    const idS = useRef(0);

    const updateMessages = (id) => {
        if (value != '' && isUserLogin == true) {

            handleCloseFeedback();
            handleShowTrueModal();
            const data = {
                "businessId": id,
                "text": value
            };

            const headers = {
                'Authorization': 'Bearer ' + token,
                "content-type": "application/json;charset=UTF-8"
            };
            Axios.post("https://tajwal2.herokuapp.com/api/complains", data, { headers })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err));

        }
        setInputValue('');
        if (isUserLogin == false) {
            handleCloseFeedback();
            setdropdownOpenLogin(!dropdownOpenLogin)
        }
    }

    useEffect(() => {

        var workScheduleRandomly = Profile.workTime === undefined ? [] : Profile.workTime;

        // Get today
        const date1 = new Date();
        const weekday = date1.getDay();

        // console.log(weekday); // index of today starting from 0

        const options = { weekday: 'long' };
        const today = new Intl.DateTimeFormat('en-US', options).format(date1).slice(0, 3).toUpperCase(); // 3 characters MON
        // console.log(new Intl.DateTimeFormat('ar-AR', options).format(date1)); // الأحد


        for (let i = 0; i < workScheduleRandomly.length; i++) {
            const dayOpen = workScheduleRandomly[i].dayName;
            if (today === dayOpen) {
                const openHour = workScheduleRandomly[i].openHour;
                const closeHour = workScheduleRandomly[i].closeHour;

                var timePeriodFrom = 'AM';
                var timePeriodTo = 'AM';

                // OPEN
                var hoursOpen = openHour / 3600000;
                var minuOpen = (openHour % 3600000) / 1000;
                if (hoursOpen > 12) {
                    hoursOpen -= 12;
                    timePeriodFrom = 'PM';
                }

                // Formatting as 00:00
                var hoursOpenString;
                var minuOpenString;
                if (hoursOpen >= 10) {
                    hoursOpenString = String(hoursOpen);
                }
                else {
                    hoursOpenString = '0' + String(hoursOpen);
                }

                if (minuOpen >= 10) {
                    minuOpenString = String(minuOpen);
                }
                else {
                    minuOpenString = '0' + String(minuOpen);
                }


                // CLOSE
                var hoursClose = closeHour / 3600000;
                var minuClose = (closeHour % 3600000) / 1000;
                if (hoursClose > 12) {
                    hoursClose -= 12;
                    timePeriodTo = 'PM';
                }

                // Formatting as 00:00
                var hoursCloseString;
                var minuCloseString;
                if (hoursClose >= 10) {
                    hoursCloseString = String(hoursClose);
                }
                else {
                    hoursCloseString = '0' + String(hoursClose);
                }

                if (minuClose >= 10) {
                    minuCloseString = String(minuClose);
                }
                else {
                    minuCloseString = '0' + String(minuClose);
                }

                // ========> Open time STRING
                var openTimeString = hoursOpenString + ':' + minuOpenString + timePeriodFrom;
                // ========> Close time STRING
                var closeTimeString = hoursCloseString + ':' + minuCloseString + timePeriodTo;

                setTodayWork(openTimeString + ' - ' + closeTimeString)
                // console.log('open in ===> ' + openTimeString)
                // console.log('close in ===> ' + closeTimeString)
            }

        }

    }, []);
    useEffect(() => {
        console.log(isUserOrBuisness);
        if (isUserOrBuisness === 'business') {
            Axios.get("https://tajwal2.herokuapp.com/api/business/me", {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
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
                })
                .catch(err => console.log(err))
        }

    }, [flagEditProfileBusi])

    return (
        <div className='Profile'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <div className="container grid-profile mt-3">
                <div className="row text-end col-profile mt-2">
                    <div className='col-1'>
                        <span className='dots'>.........</span>
                        <span className='dots'>.........</span>
                        <span className='dots'>.........</span>
                        <span className='dots'>.........</span>
                        <span className='dots'>.........</span>
                    </div>

                    {/** Third Col **/}
                    <div className="col statistics-col">

                        {/* Followers */}
                        <div className='list-statistics'>
                            <div className="rounded-circle green-b-statistics" onClick={isUserOrBuisness == 'business' ? handleShowStatistics : handleShowFeedback}>
                                <div className="rounded-circle bu-statistics" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }} >{Profile.nFollowers}</div>
                                <div className="rounded-circle bu-statistics" style={{ display: isUserOrBuisness == 'business' ? 'none' : 'block' }}><i className="fa fa-paper-plane" aria-hidden="true"></i></div>
                            </div>
                            <span className='statistics-description' style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}>الإحصائيات</span>
                            <span className='statistics-description' style={{ display: isUserOrBuisness == 'business' ? 'none' : 'block' }} >ارسال شكوى</span>



                        </div>
                        <div className='list-statistics'>

                            <NavLink to='/ProductBusi' style={{ textDecoration: 'none' }} state={{ items: itemsFromClient, workTypeId: workTypeId }}>
                                <div className="rounded-circle green-b-statistics">
                                    <div className="rounded-circle bu-statistics" >{Profile.nProducts}</div>
                                </div>
                                <span className='statistics-description'>المـنتـجــات</span>
                            </NavLink>
                        </div>

                    </div>

                    {/**  Second Col **/}
                    <div className="col-6 align-items-start left-b">

                        <div>
                            {/* Head */}
                            <span className='Head'>
                                <label className="mx-2 work-name-label">{Profile.WorkName}</label>
                                <i className="bi bi-file-person icon-label-profile"></i>
                            </span>
                            {/* List */}
                            <div className='RatesCount'>
                                <span className='rateCount rateCount1'>{Profile.nRaters} <i class='fa fa-star' title='عدد المقيمين'></i> </span>
                                <span className='rateCount rateCount2'>{Profile.nFollowers} <i class="fa fa-users" aria-hidden="true" title='عدد المتابعين'></i></span>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-prof-item">
                                    <span>
                                        <label className="mx-2 buisness-label-profile">{Profile.WorkType}</label>
                                        <i className="fa fa-cutlery icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                {
                                    (todayWork !== 'مغلق اليوم') ? (
                                        <li className="list-group-item list-prof-item">
                                            <span>
                                                <label className="mx-2 buisness-label-profile">{Profile.openOrclose}</label>
                                                <i className="bi bi-check-circle-fill icon-label-profile"></i>
                                            </span>
                                        </li>
                                    ) : (<></>)
                                }

                                <li className="list-group-item list-prof-item">
                                    <span>
                                        <label className="mx-2 buisness-label-profile">{todayWork}</label>
                                        <i className="bi bi-clock-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item list-prof-item">
                                    <span>
                                        <label className="mx-2 buisness-label-profile">{Profile.workLocation}</label>
                                        <i className="bi bi-geo-alt-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item list-prof-item">
                                    <span>
                                        <label className="mx-2 buisness-label-profile">{Profile.workNumber}</label>
                                        <i className="bi bi-telephone-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item list-prof-item">
                                    <span>
                                        <label className="mx-2 buisness-label-profile">{Profile.workMail}</label>
                                        <i className="fa fa-envelope icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-lis list-prof-item">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" title={Profile.workDescription}>
                                        <label className="mx-2 buisness-label-profile">{(Profile.workDescription !== undefined) ? Profile.workDescription.slice(0, 70) : Profile.workDescription}...</label>
                                        <i className="fa fa-list-alt icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/** First Col **/}
                    <div className="col-2 left-b">
                        <img src={Profile.workPicture} className="rounded-circle bu-image" alt="..." />
                        <div className="rounded-circle green-b"></div>
                    </div>
                </div>
                <NavLink to="/editProfile" exact="true" style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none', width: 'max-content' }} >
                    <button type='button' className='btn btn-edit' style={{ marginTop: '5em' }} >
                        تعديل المعلومات
                    </button>
                </NavLink>
            </div>

            <Modal show={showStatistics} onHide={handleCloseStatistics} size='lg'>
                <Modal.Body><Rate1 /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseStatistics}>
                        إلغاء
                    </Button>
                    <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={handleCloseStatistics}>
                        إغلاق
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFeedback} onHide={handleCloseFeedback} size='lg'>
                <Modal.Header dir="auto">
                    <Modal.Title>
                        شكوى
                        <h6 className='SubtitleSh'>قم بإرسال شكوى إلى المتجر حيث لن يتم إظهار اسم المرسل مع الشكوى</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><Shkoa nameBusi={Profile.WorkName} photoBusi={Profile.workPicture} idBusi={Profile.WorkId} /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseFeedback}>
                        إغلاق
                    </Button>
                    <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={() => updateMessages(Profile.WorkId)}>
                        ارسال
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Correct feedback */}
            <Modal show={showTrueModal} onHide={handleCloseTrueModal} size='md'>
                <Modal.Header dir="auto">
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='true-add'>
                        <div><i className="bi bi-check-circle true-add-icon"></i></div>
                        <div className='true-add-line1'>تمّ إرسال الشكوى بنجاح</div>
                    </div>
                </Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="primary" className="btn btn-edit btn-add-item-modal"
                        onClick={handleCloseTrueModal} id="next-btn-add-item"
                    >
                        حسناً
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default Profile;

