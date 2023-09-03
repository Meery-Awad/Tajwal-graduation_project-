import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink, Link } from 'react-router-dom';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SearchMap from './SearchMap';
import NotiAlert from '../NotiAlert/NotiAlert';
import './map.css'
// import InfoOfLoc from './infoOfLocation/infoOfLoc';
import { connect, useSelector } from 'react-redux';
import TodoItem from './products/TodoIitem';
import Rate from './Rate/rate';
import Shkoa from './Shkoa/shkoa';
import Rate1 from './Rate/rate1';
import MapBox from './mapBox/mapBox';
import { useBetween } from 'use-between';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FilterItems from '../../Buisness/components/BuisnessItems/FilterItems';

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const state = useSelector((state) => state.data);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [goToInfo, setGoToInfo] = useState(false);
  const { value, setInputValue, resStor, setStore } = useBetween(state.useShareState);
  const { isUserLogin, setisUserLogin } = useBetween(state.useShareState);
  const { dropdownOpenLogin, setdropdownOpenLogin } = useBetween(state.useShareState);
  const { idStore, setidStore } = useBetween(state.useShareState);
  // const {isUserLogin, setisUserLogin } = useBetween(state.useShareState);


  const { activeFiltra, setactiveFiltra, products
    , theProd, setTheProd, theNumProd, setTheNumProd, theNameProd, setNameProd } = useBetween(state.useShareState);

  // console.log(state);

  // const dropdownitem = products.length ? (
  //   products.map(item => {

  //     return (
  //       <div key={item.id}>

  //         <DropdownItem className='menu-item' onClick={() => goToTodoItem(item.list, item.type)} >
  //           <i className={item.icon}></i><span className='prodType'> {item.type} </span>
  //         </DropdownItem>

  //       </div>
  //     )
  //   })
  // ) : (<p className='NoProd'> </p>);
  useEffect(() => {

    setStore(resStor);

  }, [resStor.length])
  function toggle() {

    if (activeFiltra)
      setdropdownOpen(!dropdownOpen);
  }
  const HidFilter = () => {
    Array.from(document.querySelectorAll("div.Fltera"))
      .forEach(function (val) {
        val.style.display = 'none';
      });
  }

  const goToTodoItem = (list, type) => {
    setTheProd(list);
    setNameProd(type)
    setTheNumProd(list.length);
    HidFilter();
    document.querySelector("div.Fltera.TodoItem").style.display = 'block'

  }
  var arrow = true;
  if (theNumProd == 0) {
    arrow = false;
  }


  // *** (Rate Modal)
  const [showRate, setShowRate] = useState(false);

  const handleCloseRate = () => setShowRate(false);
  const handleShowRate = () => setShowRate(true);

  // *** (Feedback Modal)
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCloseFeedback = () => setShowFeedback(false);
  const handleShowFeedback = () => setShowFeedback(true);

  const [show, setShow] = useState(false);
  const [showTrueModal, setShowTrueModal] = useState(false);
  const handleCloseTrueModal = () => setShowTrueModal(false);
  const handleShowTrueModal = () => setShowTrueModal(true);
  const idS = useRef(0);

  const updateMessages = (id) => {

    //   const time = new Date().toLocaleTimeString();



    if (value != '' && isUserLogin == true) {
      handleCloseFeedback();
      handleShowTrueModal();

      //     const updatemess = [

      //       ...allMess,

      //       {

      //         idMess: allMess.length + 1,

      //         mess: value,

      //         time: time
      //       }
      //     ];

      //     setallMess(updatemess);
      setInputValue('');
      //     const element = $(`#${id}`);
      //     element.animate({
      //       scrollTop: element.prop("scrollHeight")
      //     }, 500);
      //backend
    }
    if (isUserLogin == false) {
      handleCloseFeedback();
      setdropdownOpenLogin(!dropdownOpenLogin)
    }
    // }

    // const mess = allMess.length && isUserLogin == true ? (

    // allMess.map(item => {
    //     //  if(item.id!=messages.length)
    //     //  return
    //     //  else
    //     return (
    //       <div className='mess' key={item.id}>
    //         <span className='messItem' dir='auto'>{item.mess}</span>
    //         <div className='timeItem'>{item.time}</div>
    //       </div>
    //     )
  }
  var cnt = 0;
  var stores = resStor;
  if (stores.length > 0) {
    for (const feature of stores) {
      if (idStore == feature._id)
        idS.current = cnt;
      cnt++;
    }
  }
  return (

    <><div >

      {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link> */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

      {/* <div class='goToInfo'>
        <InfoOfLoc />
      </div> */}
      <div className='col-lg-6 FilterMap GoogleMap'>
        <MapBox />
      </div>
      {/* <LoadScript

        googleMapsApiKey="AIzaSyAi7uRJxyXXhg6U2JULgnc00ZokaJWjUfI"
      >
        <GoogleMap mapContainerClassName='col-lg-6 FilterMap GoogleMap '
          center={center}
          zoom={10}
        >

        </GoogleMap>

      </LoadScript> */}


      {/* <div className='FilterMap Filter '></div> */}

      {/* <div className='location' onClick={goToInfoOfLoc} ></div>   */}





      {/* <div className='col-lg-6 Filter-list'>
        <div className='Filter-item Filtra'><bdi> بحث متقدم</bdi></div>
        <NavLink to='/MyItems' style={{ textDecoration: 'none' }}>
          <div className='Filter-item product'><bdi><i className='fil fas fa-clipboard-list'
           ></i>منتجات</bdi></div>
        </NavLink> */}



      {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}   >
          <DropdownToggle caret className='dropDown'>

            <span className='theProd' > {theNameProd} <span style={{ color: theNumProd == 0 ? 'rgb(228, 9, 9)' : 'rgb(26, 25, 25)', visibility: theNumProd >= 0 ? 'visible' : 'hidden' }}>( {theNumProd} )</span></span>


          </DropdownToggle>
          <DropdownMenu className='menu'>


            {dropdownitem}; */}

      {/* <DropdownItem disabled>{state.products[1]}</DropdownItem> */}
      {/* <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem> */}
      {/* </DropdownMenu>
        </Dropdown> */}

      {/* <div className='Filter-item shorPath'><bdi><i className="fas fa-walking"></i>اقصر طريق</bdi></div> */}
      {/* <div className='Filter-item rate' onClick={() => hidAndShow("div.Fltera.Rate")}> */}
      {/* <div className='Filter-item rate' onClick={handleShowRate}>
          <bdi><i className="fil fa fa-bar-chart" aria-hidden="true" ></i>احصائيات</bdi>
        </div> */}
      {/* <div className='Filter-item chat' >
          <bdi><i className="fil fas fa-comment-alt"></i>مراسلة</bdi></div> */}


      {/* <div className='Filter-item shkoa' >

          <bdi><i className="fil fas fa-frown"></i>شكوى</bdi>
        </div> */}image.png

      {/* <div className='resAndclo'>
          <i className="fil1 fa fa-cutlery" aria-hidden="true"></i> <i className="fil1 fas fa-tshirt"></i> <br />
          <span class="res" ><bdi>مطاعم</bdi></span>  <span className="clo"><bdi>ألبسة</bdi></span>
        </div> */}
      {/* <div className='Filter-item '>
          <bdi className='linkApp'>رابط التطبيق:</bdi>
        </div> */}
      {/* </div>*/}
    </div>


      <div className='Fltera Rate ' >

      </div>

      <NotiAlert></NotiAlert>
      {/* show Feedback */}
      <Modal show={showFeedback} onHide={handleCloseFeedback} size='lg'>
        <Modal.Header dir="auto">
          <Modal.Title>
            شكوى
            <h6 className='SubtitleSh'>قم بإرسال شكوى إلى المتجر حيث لن يتم إظهار اسم المرسل مع الشكوى</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><Shkoa /></Modal.Body>
        <Modal.Footer dir="auto">
          <Button variant="secondary" className="btn btn-calendar-modal-cancel"
            onClick={handleCloseFeedback}>
            إغلاق
          </Button>
          <Button variant="primary" className="btn btn-calendar-modal-save"
            onClick={() => updateMessages(idS.current)}>
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

      {/* show Rate */}
      <Modal show={showRate} onHide={handleCloseRate} size='lg'>

        <Modal.Body><Rate1 /></Modal.Body>
        <Modal.Footer dir="auto">
          <Button variant="primary" className="btn btn-calendar-modal-save"
            onClick={handleCloseRate}>
            حسناً
          </Button>
        </Modal.Footer>
      </Modal>

    </>



  )
}



export default Map;
