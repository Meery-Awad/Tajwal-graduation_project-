/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import Button from 'react-bootstrap/Button';
import imagePlaceholder from '../../images/imagePlaceholder.png';
import { useBetween } from 'use-between';
import Axios from 'axios'

function SignUpClient() {
    // dispatch for save edits
    const dispatch = useDispatch();
    const [signUpStepNumberClient, setSignUpStepNumberClient] = useState("signup-client-1");
    const st = useSelector((state) => state.dataB);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    // User Type
    const { userType, setUserType } = useBetween(st.useSharingFilters);

    //** New Account Data
    const [clientType, setClientType] = useState("مطعم");// ما طبيعة المتجر الذي تملكه ؟
    const [clientName, setClientName] = useState("");// اسمه 
    const [clientDescription, setClientDescription] = useState("");// وصفه 
    const [clientPlaceManually, setClientPlaceManually] = useState("");// مكان يدوي
    // **************
    const [clientLocation, setClientLocation] = useState("");// مكان خريطة
    const [clientImage, setClientImage] = useState(imagePlaceholder);// صورة للمتجر 
    const [clientWorkTime, setClientWorkTime] = useState();// أوقات الدوام 
    // **************
    const [clientPhoneNumber, setClientPhoneNumber] = useState("");// رقم هاتف 
    const [clientEmail, setClientEmail] = useState("");// بريدك الالكتروني 
    const [clientPassword, setClientPassword] = useState("");// كلمة السر 
    const [clientConfirmPassword, setClientConfirmPassword] = useState("");// تأكيد كلمة السر
    // **************
    const { signUpWelcome, setSignUpWelcome } = useBetween(st.useSharingFilters);
    useEffect(() => {
        setSignUpWelcome('عالم جديد من التّجول و التّسوق.');
    });

    const clickField = (event, id) => {
        document.getElementById(id).classList.remove('is-invalid');
    }

    const checkCurrentStepList = async (event, currentStep) => {

        var tmp = true;
        if (currentStep === "signup-client-1") {
            if (document.getElementById("email-client").value === "") {
                tmp = false;
                document.getElementById("email-client").classList.add('is-invalid');
            }
            if (document.getElementById("name-client").value === "") {
                tmp = false;
                document.getElementById('name-client').classList.add('is-invalid');
            }

            if (tmp) {
                document.getElementById("step-1-log-in-bar").classList.remove('current-item-sign-up');// remove current step tab
                document.getElementById("step-2-log-in-bar").classList.add('current-item-sign-up');// switch to back step tab

                document.getElementById("step-1-log-in").classList.remove('current-list-log-in');// remove current step list
                document.getElementById("step-2-log-in").classList.add('current-list-log-in');// switch to back step list

                document.getElementById("next-btn-log-in").textContent = "إنشاء";
                setSignUpStepNumberClient("signup-client-2");
            }
        }
        else if (currentStep === "signup-client-2") {

            if (document.getElementById("password-client").value === "") {
                tmp = false;
                document.getElementById('password-client').classList.add('is-invalid');
            }
            if (document.getElementById("confirm-password-client").value === "") {
                tmp = false;
                document.getElementById('confirm-password-client').classList.add('is-invalid');
            }
            // if (document.getElementById("img-log-in").src === imagePlaceholder) {
            //     tmp = false;
            //     document.getElementById('img-input-log-in').style.visibility = "visible";
            // }

            if (tmp) {

                // connect with api || sign up new user Account
                const data = {
                    'email': clientEmail,
                    'name': clientName,
                    'password': clientPassword,
                    'passwordConfirmation': clientConfirmPassword,
                };

                const sessionData = {
                    'email': clientEmail,
                    'password': clientPassword
                }
                const headers = {
                    // 'Authorization': 'Bearer my-token',
                    "content-type": "application/json;charset=UTF-8"
                };
                await Axios.post("https://tajwal2.herokuapp.com/api/users", data, { headers })
                    .then(res => {
                        console.log(res.data)
                        Axios.post("https://tajwal2.herokuapp.com/api/sessions", sessionData, { headers })
                            .then(resSession => {
                                setAccessToken(resSession.data.accessToken)
                                setUserType(resSession.data.userType)
                                // console.log(resSession.data.userType)
                            })
                            .catch(err => console.log("session error: " + err))
                    })
                    .catch(err => console.log(err));

                // dispatch({
                //     type: 'new-client-account',
                //     state: {
                //         clientType, clientName, clientDescription, clientPlaceManually,
                //         clientLocation, clientImage, clientWorkTime, clientPhoneNumber,
                //         clientEmail, clientPassword, clientConfirmPassword
                //     }
                // });
            }

        }
    }

    const switchBackStep = (event, currentStep) => {
        if (currentStep === "signup-client-2") {
            document.getElementById("step-2-log-in-bar").classList.remove('current-item-sign-up');// remove current step tab
            document.getElementById("step-1-log-in-bar").classList.add('current-item-sign-up');// switch to back step tab

            document.getElementById("step-2-log-in").classList.remove('current-list-log-in');// remove current step list
            document.getElementById("step-1-log-in").classList.add('current-list-log-in');// switch to back step list

            document.getElementById("next-btn-log-in").textContent = "التالي";
            setSignUpStepNumberClient("signup-client-1");
        }
    }
    const switchStep = (event, id) => {

        if (id === "next") {
            checkCurrentStepList(event, signUpStepNumberClient);
        }
        else if (id === "previous") {
            switchBackStep(event, signUpStepNumberClient)
        }
    }


    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                setClientImage(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        document.getElementById("signup-upload-img-client").value = '';
        document.getElementById('img-input-log-in').style.visibility = "hidden";
    }

    const changeField = (event, id) => {
        if (id === 'client-name') {
            setClientName(event.target.value);
        }
        else if (id === 'client-email') {
            setClientEmail(event.target.value);
        }
        else if (id === 'client-password') {
            setClientPassword(event.target.value);
        }
        else if (id === 'client-confirm-password') {
            setClientConfirmPassword(event.target.value);
        }
    }

    return (
        <div className='SignUpClient'>
            <section className="step-wizard-sign-up">
                <ul className="step-wizard-sign-up-list" dir="rtl">
                    <li className="step-wizard-sign-up-item current-item-sign-up" id="step-1-log-in-bar">
                        <span className="progress-count-sign-up">
                            1
                        </span>
                    </li>
                    <li className="step-wizard-sign-up-item" id="step-2-log-in-bar">
                        <span className="progress-count-sign-up">
                            2
                        </span>
                    </li>
                </ul>
            </section>

            {/* First Step Log in */}
            <ul className="list-group list-group-flush list-edit-item-step-1 list-sign-up current-list-log-in" id="step-1-log-in">
                <li className="input-field-add-item required-input input-field-signup ">
                    <label htmlFor="name-client" className='label-edit-modal'>اسم المستخدم:</label>
                    <input type="text" id="name-client" className='form-control input-signup'
                        onChange={(event) => changeField(event, "client-name")}
                        onClick={(event) => clickField(event, 'name-client')}
                        placeholder='اسم المستخدم' required />

                    <div className="invalid-feedback">يرجى إدخال اسم للمتجر</div>
                </li>
                <li className="input-field-add-item required-input input-field-signup">
                    <label htmlFor="email-client" className='label-edit-modal'>بريدك الالكتروني:</label>
                    <input type="email" id="email-client" className='form-control input-signup'
                        onChange={(event) => changeField(event, "client-email")}
                        onClick={(event) => clickField(event, 'email-client')}
                        placeholder='freshMap@hotmail.com' required />

                    <div className="invalid-feedback">يرجى إدخال بريدك الالكتروني</div>
                </li>


            </ul>


            {/* Second Step Log in */}
            <ul className="list-group list-group-flush list-edit-item-step-1 list-sign-up" id="step-2-log-in">

                {/*<li className="input-field-add-item input-field-signup" style={{ marginTop: '20px' }}>
                    <label htmlFor="signup-upload-img-client" className='label-edit-modal required-input-after-span'>
                        <span>صورة البروفايل:</span>
                        <img src={clientImage} alt='...' className='pro-image-signup' id="img-log-in" />
                    </label>
                    <div className="invalid-feedback" id="img-input-log-in"
                        style={{ display: "inline", marginRight: "10px", visibility: "hidden" }}>
                        يرجى إدخال صورة خاصة بالمتجر
                    </div>
                    <input
                        id="signup-upload-img-client"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </li>*/}
                <li className="input-field-add-item required-input input-field-signup">
                    <label htmlFor="password-client" className='label-edit-modal'>كلمة السّر:</label>
                    <input type="password" id="password-client" className='form-control input-signup'
                        onChange={(event) => changeField(event, "client-password")}
                        onClick={(event) => clickField(event, 'password-client')}
                        placeholder='********' required />

                    <div className="invalid-feedback">يرجى إدخال كلمة السّر</div>
                </li>
                <li className="input-field-add-item required-input input-field-signup">
                    <label htmlFor="confirm-password-client" className='label-edit-modal'>تأكيد كلمة السّر:</label>
                    <input type="password" id="confirm-password-client" className='form-control input-signup'
                        onChange={(event) => changeField(event, "client-confirm-password")}
                        onClick={(event) => clickField(event, 'confirm-password-client')}
                        placeholder='********' required />

                    <div className="invalid-feedback">يرجى تأكيد كلمة السّر</div>
                </li>
            </ul>

            {/* Buttons Log in */}
            <div className='div-buttons-sign-up'>
                <Button variant="secondary" className="btn btn-edit btn-sign-up-previous"
                    onClick={(event) => switchStep(event, "previous")} id="back-btn-log-in"
                >
                    العودة
                </Button>
                <Button variant="primary" className="btn btn-edit btn-sign-up-next"
                    onClick={(event) => switchStep(event, "next")} id="next-btn-log-in"
                >
                    التالي
                </Button>
            </div>
        </div >

    )
}
export default SignUpClient;