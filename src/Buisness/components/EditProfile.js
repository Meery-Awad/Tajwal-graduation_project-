import React, { useRef, useState, useEffect } from 'react';
import '../../bootstrap/css/bootstrap.css';
import '../style/App.css';
import TempPicture from '../images/cava.jpg';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { NavLink } from "react-router-dom";
import WorkHours from './WorkHours';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useBetween } from 'use-between';
import MapBoxSignUp from '../../components/googleMaps/googleMaps';
import Axios from 'axios';
import FormData from 'form-data'


function EditProfile() {
    // for MapBoxSignUp
    const [optionStore, setOptionStore] = useState('مطاعم');
    const handleOptionChange = (e) => {
        setOptionStore(e.target.value)
    }

    // REFERENCE for input an image
    const inputRef = useRef();

    // dispatch for save edits
    const dispatch = useDispatch();

    const st = useSelector((state) => state.dataB);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);

    const { flagEditProfileBusi, setFlagEditProfileBusi } = useBetween(st.useSharingFilters);

    const schedules = st.workSchedule;

    // set TODAY WORK
    const { todayWork, setTodayWork } = useBetween(st.useSharingFilters);
    const [todayWorkTime, setTodayWorkTime] = useState(buisnessProfile.openOrclose);

    // MODAL SHOW FUNCTIONS
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // *** (Map Modal)
    const [showLocationOnMap, setShowLocationOnMap] = useState(false);

    const handleCloseLocationOnMap = () => {
        setShowLocationOnMap(false);
    }
    const handleShowLocationOnMap = () => {
        setShowLocationOnMap(true);
    }

    // state for editing information
    var newState = {
        WorkId: buisnessProfile.WorkId,
        WorkName: buisnessProfile.WorkName,
        WorkType: buisnessProfile.WorkType,
        openOrclose: todayWorkTime,
        workTime: buisnessProfile.workTime,
        workLocation: buisnessProfile.workLocation,
        long: buisnessProfile.long,
        lati: buisnessProfile.lati,
        workNumber: buisnessProfile.workNumber,
        WorkTypeId: buisnessProfile.WorkTypeId,
        workMail: buisnessProfile.workMail,
        workPassword: buisnessProfile.workPassword,
        workConPassword: buisnessProfile.workConPassword,
        workDescription: buisnessProfile.workDescription,
        workPicture: buisnessProfile.workPicture,
        nFollowers: buisnessProfile.nFollowers,
        nProducts: buisnessProfile.nProducts,
        nRaters: buisnessProfile.nRaters,
    }
    // temp work schedule
    const { workSchedule, setWorkSchedule } = useBetween(st.useSharingFilters);

    // const schedules = st.workSchedule;
    // const workScheduleDetails = workSchedule;
    var scheduleForApi = [];
    const weekDays = ['SUN', "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var workScheduleDetails = workSchedule;
    let length = workSchedule.length;
    //state for editing schedule

    const submitEditSchedule = () => {
        setWorkSchedule(workScheduleDetails)
        // dispatch({
        //     type: 'edit-schedule',
        //     state: workScheduleDetails
        // });
    }
    useEffect(() => {
        const workTime = buisnessProfile.workTime;
        var dayName;
        for (var i = 0; i < 7; i++) {
            dayName = weekDays[i];
            var flag = false;
            for (var j = 0; j < workTime.length; j++) {
                if (dayName === workTime[j].dayName) { // if shop is open in the day = dayName
                    flag = true;
                    workScheduleDetails[i].openOrclose = 'open';
                    workScheduleDetails[i].opened = 'مفتوح';
                    workScheduleDetails[i].timeMsFrom = workTime[j].openHour;
                    workScheduleDetails[i].timeMsTo = workTime[j].closeHour;

                    // OPEN
                    var hoursOpen = workTime[j].openHour / 3600000;
                    var minuOpen = (workTime[j].openHour % 3600000) / 1000;

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

                    workScheduleDetails[i].timeFrom = (hoursOpenString) + ':' + (minuOpenString)

                    // CLOSE
                    var hoursClose = workTime[j].closeHour / 3600000;
                    var minuClose = (workTime[j].closeHour % 3600000) / 1000;

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
                    workScheduleDetails[i].timeTo = (hoursCloseString) + ':' + (minuCloseString)
                    setWorkSchedule(workScheduleDetails)
                    // console.log(workScheduleDetails[i].timeTo)
                    break;
                }
            }
        }
    }, [workSchedule]);


    const editSchedule = (event) => {

        // for loop for synchronization
        for (let i = 0; i <= 7; i++) {
            if (i === 7) {
                submitEditSchedule();
            }
            else if ((workScheduleDetails[i].opened === 'مفتوح') && (i !== 7)) {
                // 19:00
                // 09:00
                const from = document.getElementById(schedules[i].timePickerFromId).value;
                const to = document.getElementById(schedules[i].timePickerToId).value;
                const fromHour = from[0] + from[1];
                const toHour = to[0] + to[1];
                const fromMinute = from[3] + from[4];
                const toMinute = to[3] + to[4];

                if (fromHour > toHour || ((fromHour === toHour) && fromMinute > toMinute)) {
                    console.log('error')
                }
                workScheduleDetails[i].timeFrom = from;
                workScheduleDetails[i].timeTo = to;
            }
        }
        handleClose();
    }

    const handleChangeName = (event) => {
        newState.WorkName = event.target.value;
    }
    const handleChangeType = (event) => {
        newState.WorkType = event.target.value;
    }
    const handleChangeOpenOrClose = (event) => {
        newState.openOrclose = event.target.value;
    }
    const handleChangeTime = (event) => {
        newState.workTime = event.target.value;
    }
    const handleChangeLocation = (event) => {
        newState.workLocation = event.target.value;
    }
    const handleChangeNumber = (event) => {
        newState.workNumber = event.target.value;
    }
    const handleChangeMail = (event) => {
        newState.workMail = event.target.value;
    }
    const handleChangePassword = (event) => {
        newState.workPassword = event.target.value;
    }
    const handleChangeConPassword = (event) => {
        newState.workConPassword = event.target.value;
    }
    const handleChangeDescription = (event) => {
        newState.workDescription = event.target.value;
    }
    const handleChangePicture = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (event) {
                newState.workPicture = event.target.result;//the new picture
                document.getElementById('buisness-picture').setAttribute('src', event.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);

            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            formData.append("fileName", event.target.files[0].name);
            formData.append("type", event.target.files[0].type);
            console.log(Array.from(formData))
            const headers = {
                'Authorization': 'Bearer ' + accessToken,
                "content-type": "application/json;"
            };
            Axios.post(
                "https://tajwal2.herokuapp.com/api/business/image",
                formData,
                { headers }
            ).then(res => {
                console.log(res.data);
                setFlagEditProfileBusi(!flagEditProfileBusi);
            })
                .catch(err => console.log(err))
        }
    }

    function focusOnInput() {
        inputRef.current.click();
    }

    //upload image to backend
    const handleFileUpload = (event) => {
        // const fd = new FormData();
        // fd.append('image', newState.workPicture, newState.workPicture.name)
        // axios.post('', fd, {
        //     // report the progress of the file upload
        //     onUploadProgress: ProgressEvent => {
        //         console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //     })
    }

    const updateInfoProfileBusiness = () => {
        for (var i = 0; i < 7; i++) {
            if (workSchedule[i].openOrclose === 'open') {
                scheduleForApi.push({
                    dayName: weekDays[i],
                    openHour: workSchedule[i].timeMsFrom,
                    closeHour: workSchedule[i].timeMsTo
                })
            }
        }
        // setBuisnessProfile(newState);
        const data = {
            // "_id": newState.WorkId,
            // "email": newState.workMail,
            "name": newState.WorkName,
            "phoneNumber": newState.workNumber,
            "description": newState.workDescription,
            // "password": newState.workPassword,
            "businessTypeId": newState.WorkTypeId,
            "location": {
                "address": newState.workLocation,
                "longitude": newState.long,
                "latitude": newState.lati
            },
            "workingHours": scheduleForApi
        };
        console.log(data)
        // console.log("name: "+ newState.WorkName)
        // console.log("phoneNumber: "+ newState.workNumber)
        // console.log("description: "+ newState.workDescription)
        // console.log("password: "+ newState.workPassword)
        // console.log("businessTypeId: "+ newState.WorkTypeId)
        // console.log("address: "+ newState.workLocation)
        // console.log("longitude: "+ newState.long)
        // console.log("latitude: "+ newState.lati)
        // console.log("workingHours: "+ scheduleForApi)


        Axios.patch("https://tajwal2.herokuapp.com/api/business", data, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8"
            }
        }
        )
            .then(res => {
                console.log("patching to :::: ", res.data);
            })
            .catch((err) => { console.log(err) });

        setFlagEditProfileBusi(!flagEditProfileBusi);
    }

    return (
        <div className='EditProfile'>

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
                    <div className="col">

                    </div>

                    {/**  Second Col **/}
                    <div className="col-8 align-items-start left-b-edit">
                        <div>
                            {/* Head */}

                            {/* List */}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.WorkName} dir="auto" onChange={handleChangeName} />
                                        <i className="bi bi-file-person icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.WorkType} dir="auto" onChange={handleChangeType} />
                                        <i className="fa fa-cutlery icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                {/* <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={st.buisnessProfile.openOrclose} dir="auto" onChange={handleChangeOpenOrClose} />

                                        <i className="bi bi-check-circle-fill icon-label-profile"></i>

                                    </span>
                                </li> */}
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <Button variant="primary" onClick={handleShow} className="calendar-icon">
                                            <i className="bi bi-calendar-week icon-label-profile"></i>
                                        </Button>

                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={todayWork}
                                            dir="auto" onChange={handleChangeTime} disabled />
                                        <i className="bi bi-clock-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <Button variant="primary" onClick={handleShowLocationOnMap} className="calendar-icon">
                                            <i className="bi bi-geo-alt icon-label-profile"></i>
                                        </Button>

                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workLocation} dir="auto" onChange={handleChangeLocation} />
                                        <i className="bi bi-geo-alt-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workNumber} dir="right" onChange={handleChangeNumber} />
                                        <i className="bi bi-telephone-fill icon-label-profile"></i>
                                    </span>
                                </li>
                                {/*<li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workMail} dir="auto" onChange={handleChangeMail} />
                                        <i className="fa fa-envelope icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>*/}
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="password" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workPassword} dir="auto" onChange={handleChangePassword} />
                                        <i className="bi bi-key-fill icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="password" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workConPassword} dir="auto" onChange={handleChangeConPassword} />
                                        <i className="bi bi-key-fill icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                                <li className="list-group-item prof-list-edit">
                                    <span>
                                        <input type="text" className="form-control mx-2 buisness-label-profile-edit"
                                            defaultValue={buisnessProfile.workDescription} dir="auto" onChange={handleChangeDescription} />
                                        <i className="fa fa-list-alt icon-label-profile" aria-hidden="true"></i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/** First Col **/}
                    <div className="col-2 left-b">

                        <input
                            type="file"
                            onChange={handleChangePicture}
                            ref={inputRef}
                            accept=".jpg,.jpeg,.png"
                            style={{ display: 'none' }}
                            id="upload-profile-pic"
                        />
                        <img src={newState.workPicture} id='buisness-picture' className="rounded-circle bu-image" alt="..." />
                        <div className="rounded-circle green-b"></div>
                        <button className='btn btn-edit btn-edit-inf' onClick={focusOnInput}>تغيير الصورة</button>

                    </div>
                </div>

                <NavLink to="/ProfileBuisness" exact="true" >

                    <button type='button' className='btn btn-edit' style={{ marginTop: '6em' }}
                        onClick={updateInfoProfileBusiness}>
                        حفظ التعديلات
                    </button>

                </NavLink>
            </div>




            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header dir="auto">
                    <Modal.Title>
                        أوقات الدّوام
                        <h6 className='subheading-work-hours'>حدّد أوقات دوامك وفقاً للأيام و السّاعات.</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><WorkHours /></Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleClose}>
                        إلغاء
                    </Button>
                    <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={editSchedule}>
                        حفظ البرنامج
                    </Button>
                </Modal.Footer>
            </Modal>

{/* Location */}
<Modal show={showLocationOnMap} onHide={handleCloseLocationOnMap} size='lg'>
                <Modal.Header dir="auto">
                    <Modal.Title>
                        الخريطة
                        <h6 className='subheading-work-hours'>حدّد موقع متجرك على الخريطة.</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    < MapBoxSignUp optionStore={optionStore} />
                </Modal.Body>
                <Modal.Footer dir="auto">
                    <Button variant="secondary" className="btn btn-calendar-modal-cancel"
                        onClick={handleCloseLocationOnMap}>
                        إلغاء
                    </Button>
                    <Button variant="primary" className="btn btn-calendar-modal-save"
                        onClick={handleCloseLocationOnMap}>
                        حفظ الموقع
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
export default EditProfile;

