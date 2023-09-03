import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useBetween } from 'use-between';
import NewMoon from '../../../Buisness/images/NewMoon.jpg';
import $ from 'jquery';
import './shkoa.css'

function Shkoa(props) {

  const state = useSelector((state) => state.data);
  const { isUserLogin, setisUserLogin ,resStore} = useBetween(state.useShareState);
  const { dropdownOpenLogin, setdropdownOpenLogin } = useBetween(state.useShareState);
  const { idStore, setidStore } = useBetween(state.useShareState);

  const { allMess, setallMess } = useBetween(state.useShareState);
 


  const {value, setInputValue} = useBetween(state.useShareState);
  const { index, setIndex } = useBetween(state.useShareState);
  const idS = useRef(0);

  // const element = $(`#${'messCont'}`);
  // element.animate({
  //   scrollTop: element.prop("scrollHeight")
  // }, 500);


  const updateValue = ({ target }) => {setInputValue(target.value); }



  

  const hid = () => {

    document.querySelector('.Shkoa').style.display = 'none';
  }
  var cnt = 0;


  // for (const feature of resStore) {
  //   if (idStore == feature._id)
  //     idS.current = cnt;
  //   cnt++;
  // }

  return (
    <div   >

      <div className='shkoaCont' id='shkoaCont'>
        {/* <div className='close' onClick={hid}>&times;</div> */}
        {/* <div className='title'><bdi>قم بإرسال شكوى إلى المتجر حيث لن يتم إظهار اسم المرسل مع الشكوى</bdi></div> */}

        <div className='forStor'>
          <span className='for' >الى</span>
          <div className='storeSendhkoa'>
            {/* <div>{idS.current}</div> */}
            <img src={props.photoBusi} className='imgLog' />
            <span className='titleShkoa'>{props.nameBusi}</span>
          </div>
        </div>
        {/* <div className='messCont' id='messCont'>
          {mess}
        </div> */}
        <div>
          <textarea placeholder='اكتب شكوى...' className='textarea-shkoa' rows='6' onChange={updateValue} value={value} ></textarea>
        </div>
        {/* <input type='text' onChange={updateValue} placeholder="كتابة شكوى جديدة..." value={value} /> */}
        <div className='btn'>
          {/* <button className="btn--submit" onClick={() => updateMessages()}   >ارسال</button>

        <button className="btn--close" onClick= {hid} >اغلاق</button> */}
        </div>


      </div>

    </div>
  )
}
export default Shkoa;