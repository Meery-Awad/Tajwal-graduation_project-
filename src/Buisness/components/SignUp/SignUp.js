import React, { useState, useEffect } from 'react';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';

import SignUpBuisness from './SignUpBuisness';
import SignUpClient from './SignUpClient';

import signUpImg from '../../images/SignUp.png'
import shopImg from '../../images/shop.png'
import clientImg from '../../images/client.png'
import { useBetween } from 'use-between';
import { useSelector } from 'react-redux';




function SignUp() {

    const st = useSelector((state) => state.dataB);
    const [buisnessORclient, setBuisnessORclient] = useState('notSelected');
    const { signUpWelcome, setSignUpWelcome } = useBetween(st.useSharingFilters);

    const chooseBuisnessClient = (event) => { setBuisnessORclient(event.target.value) }
    const backToChooseBuisnessClient = () => {
        setSignUpWelcome('اكتشف الأماكن و قُم بالتسوّق و التجوّل من المنزل بكلّ بساطة.');
        setBuisnessORclient('notSelected')
    }


    return (
        <div className='SignUp row'>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>


            <div className='col signUpFormCol'>
                <div className='signup-form' dir="rtl">
                    {
                        (buisnessORclient === 'notSelected') ? (
                            <div className='signup-form-types-client-buisness'>
                                <div className='client-or-buisness-text' >هل ترغب بالانضمام لنا كَـ :</div>
                                <form className='client-or-buisness-question'>
                                    <div className='buisness-radio-box'>
                                        <label htmlFor="buisness"><img src={shopImg} alt='...' className='signup-shopImg' /></label>
                                        <div>
                                            <input className="form-check-input radio-buisness-input" type="radio"
                                                name="radio-buisness-client" id="buisness" value="buisness"
                                                onChange={(event) => chooseBuisnessClient(event)} />
                                            <label className="form-check-label radio-buisness-label" htmlFor="buisness" style={{ cursor: 'pointer' }}>متجر</label>
                                        </div>

                                    </div>

                                    <div className='client-radio-box'>
                                        <label htmlFor="client"><img src={clientImg} alt='...' className='signup-clientImg' /></label>
                                        <div>
                                            <input className="form-check-input radio-client-input" type="radio"
                                                name="radio-buisness-client" id="client" value="client"
                                                onChange={(event) => chooseBuisnessClient(event)} />
                                            <label className="form-check-label radio-client-label" htmlFor="client" style={{ cursor: 'pointer' }}>زبون</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (buisnessORclient === 'buisness') ? (
                            <>
                                <div className="signup-arrow-header" onClick={backToChooseBuisnessClient} dir="ltr">
                                    <i className='bi bi-arrow-left-circle fa-2x' />
                                    <span className='signup-arrow-header-text'>إنشاء حساب كَـ متجر</span>
                                </div>
                                <SignUpBuisness />
                            </>
                        ) : (
                            <>
                                <div className="signup-arrow-header" onClick={backToChooseBuisnessClient} dir="ltr">
                                    <i className='bi bi-arrow-left-circle fa-2x' />
                                    <span className='signup-arrow-header-text '>إنشاء حساب كَـ زبون</span>
                                </div>
                                <SignUpClient />
                            </>
                        )
                    }

                </div>
            </div>
            <div className='col signUpImgCol' dir="rtl">
                <div className='Img-Info'>أهلاً وسهلاً بك</div>
                <div className='Img-Info Img-Info-bold' id='SignUpText'>{signUpWelcome}</div>

                <img className='signUpImg' src={signUpImg} alt="..." />

            </div>

        </div>

    )
}
export default SignUp;

