import React, { useState, useEffect } from 'react';
// import '../../style/bootstrap.min.css';
import '../../../bootstrap/css/bootstrap.css'
import '../../style/App.css';
import { useSelector } from 'react-redux';
import imgContact from '../../../components/photo/contactUs.jpg';

function ContactUs() {
    useEffect(() => {
        document.body.style.background = "url('http://atozgaragedoor.com/img/contact-us-banner.jpg')";
    document.body.style.backgroundSize='cover';
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition='top 260px'
   
    })
    return (
        <div className='ContactUs' dir='auto'>
             {/* <img src='http://atozgaragedoor.com/img/contact-us-banner.jpg' className='ImgContact1'/>  */}
            <h3 className='contact-header'>تواصل معنا</h3>
            <div className='row'>
         
            <span className='col-lg-6 contact-subheading'><bdi>هل لديك استفسار معيّن؟ نحن هنا للاستماع لك, فقط اترك رسالتك و سنكون سعداء لمساعدتك.</bdi></span>
            {/* <img src={imgContact} className='col-lg-6 ImgContact'/> */}
            </div>
            <textarea placeholder='اترك رسالتك هنا..' className='textarea-contactUs' rows='10'></textarea>
            <button type='button' className='btn btn-edit btn-contactUs' >
                        إرسال
            </button>
        </div>

    )
}
export default ContactUs;

