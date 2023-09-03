import 'bootstrap/dist/css/bootstrap.min.css';
//  import 'bootstrap/dist/js/bootstrap.bundle.min';
import './bootstrap/css/bootstrap.css';
import './bootstrap/css/animate.css';
import './components/css&scss_File/App.css'
import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
import bs_js1 from './bootstrap/js/bootstrap';
import Map from './components/map/map';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NavLink, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Rate1 from './components/map/Rate/rate1';
import LogIn from './components/LogIn/logIn';
import Profile from './components/profile/profile';
import Top10 from './components/Top10/Top10';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav } from 'reactstrap';
import { useBetween } from 'use-between';
import MyItems from './Buisness/components/BuisnessItems/MyItems';
import ItemInterface from './Buisness/components/BuisnessItems/ItemInterface';
import ProfileBusi from '../src/Buisness/components/Profile';
import EditProfileBusi from '../src/Buisness/components/EditProfile';
import NotificationBusi from '../src/Buisness/components/Notifications/BuisnessNotifications';
import ContactUs from './Buisness/components/ContactUs/ContactUs';
import Feedbacks from '../src/Buisness/components/Feedbacks/Feedbacks';
import ShkoaNavLink from './components/shkoaNavLink/shkoaNavLink';
import { Notifications } from 'react-push-notification';
import Sugg from './components/sugg/sugg';
import SignUp from './Buisness/components/SignUp/SignUp';
import FilterItems from './Buisness/components/BuisnessItems/FilterItems';
import OurServices from './components/ourSevices/ourServices';
import PrivacyPolicy from './components/PrivacyPolicy/privacyPolicy';
import AboutUs from './components/AboutUs/aboutUs';


function App() {
  const state = useSelector((state) => state.data);
  const st = useSelector((state) => state.dataB);

  // Access Token
  const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

  const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);

  const { dropdownOpenLogin, setdropdownOpenLogin, profileData, setProfileData } = useBetween(state.useShareState);
  const [urlImage, setImage] = useState('');


  const { isUserOrBuisness, setisUserOrBusisness } = useBetween(state.useShareState);
  const { isUserLogin, setisUserLogin } = useBetween(state.useShareState);

  useEffect(() => {

    if (accessToken !== '') { setisUserLogin(true) }
    else { setisUserLogin(false) }
  }, [accessToken]);
  useEffect(() => {
    // new WOW.WOW({
    //     live: false
    // }).init();

    setProfileData(profileData);
    if (profileData.image != undefined) {
      setImage('http://localhost:1337/image_clsm3xbb4a.png');
      // alert(urlImage)
    }

    // if (buisnessProfile.workPicture !== ''&& isUserOrBuisness=='business')
    //   {setImage(buisnessProfile.workPicture);  }
    //   console.log(urlImage)
    // setBuisnessProfile(buisnessProfile)


  }, [profileData, urlImage])


  const { currentRoot, setcurrentRoot } = useBetween(state.useShareState);
  const [noti, setNoti] = useState('#');
  const [shkoa, setShkoa] = useState('#');
  const [NewNoti, setNewNoti] = useState(state.NewNoti);
  const [NewFeed, setNewFeed] = useState(state.NewNoti);
  const [NewSugg, setNewSugg] = useState(state.NewSugg);


  var profile = ''

  if (isUserOrBuisness == 'user' || isUserOrBuisness == '') {
    profile = '/Profile';


  }
  else {
    profile = '/ProfileBuisness'

  }


  // alert(currentRoot);
  const [dropdownOpenUser, setdropdownOpenUser] = useState(false);
  const [dropdownOpenNotif, setdropdownOpenNotif] = useState(false);
  const [dropdownOpenFeed, setdropdownOpenFeed] = useState(false);
  function toggleNotif() {
    // dropdownOpenNotif=true;
    setNewNoti(0);
    setdropdownOpenNotif(!dropdownOpenNotif);
  }
  function toggleFeed() {
    // dropdownOpenNotif=true;
    setNewFeed(0);
    setdropdownOpenFeed(!dropdownOpenFeed);
  }


  document.body.style.background = 'none'
  function activeNow(a) {
    const active = document.querySelector(a);
    document.body.style.background = 'none'
    Array.from(document.querySelectorAll("a.nav-link"))
      .forEach(function (val) {
        val.style.borderBottom = "none";
        // val.style.fontSize = '0.81rem;';
      });
    // active.style.fontSize = '0.83rem;';
    active.style.borderBottom = "thin solid #8cb590";
    if (a == '.Prof' || a == '.ContUs' || a == '.signup')
      active.style.borderBottom = "none";

    if (a == '.Noti') {
      // if (isUserLogin == true)
      // setNoti('/NotificationBusi')
      // else {
      //   setdropdownOpenLogin(!dropdownOpenLogin);
      //   setNoti('#')
      //   // active.style.fontSize = '0.81rem;';
      //   active.style.borderBottom = "none";

      // }
      setNewNoti(0);
    }
    if (a == '.Req') {
      setNewSugg(0);
    }


  }

  const LogOut = (a) => {
    const active = document.querySelector(a);
    Array.from(document.querySelectorAll("a.nav-link"))
      .forEach(function (val) {
        val.style.borderBottom = "none";
        val.style.fontSize = '0.95em';
      });
    active.style.fontSize = '14px';
    active.style.borderBottom = "thin solid #8cb590";
    setisUserLogin(false);
    setisUserOrBusisness('');
  }

  function toggleLogin() {

    setdropdownOpenLogin(!dropdownOpenLogin);
  }
  function toggleUser() {

    setdropdownOpenUser(!dropdownOpenUser);
  }

  return (

    <div className="App" >
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      {/* Required meta tags 
        <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>*/}


      {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/> */}
      {/* <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="Templete.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossOrigin="anonymous"/> 
 <link rel="stylesheet" href="../css/animate.css"/>
     <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  /> */}


      {/* Bootstrap js  */}
      {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script> */}

      {/*---------------------------------------Main Bage Code------------------------------------------------ */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
      <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script>

      {/* ---------------------------------------Navbar------------------------------------------------------- */}

      <nav className="navbar navbar-expand navbar-light">

        <div className="container">

          <div className='Logo'>
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <span className='WebSite_Name'>Taj<span className="WebSite_Name map">wal</span></span>
          </div>
          <Notifications />
          <div className="row">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav navbar-right">


                <NavLink to='/Top10' style={{ textDecoration: 'none' }}>
                  <li><a className="nav-link Top " onClick={() => activeNow('.Top')}><i className='fas fa-medal' title='تقييمات'></i></a></li>
                </NavLink>
                <NavLink to='/sugg' style={{ textDecoration: 'none', display: isUserOrBuisness == 'business' || isUserOrBuisness == '' ? 'none' : 'block' }}>
                 
                
                  <li><a className="nav-link Req" onClick={() => activeNow('.Req')}><i className="fa fa-lightbulb-o" aria-hidden="true" title='اقتراحات'></i></a></li>
                </NavLink>
                <Dropdown isOpen={dropdownOpenFeed} toggle={toggleFeed} style={{ display: isUserOrBuisness == 'user' || isUserOrBuisness == '' ? 'none' : 'block' }}>
                  <DropdownToggle className="dropdown-notification-navbar nav-link" >

                    {/* <span className='NewNoti' style={{
                      display: NewFeed > 9 && NewFeed != 0 ? 'block' : 'none'
                    }} >+9</span>
                    <span className='NewNoti' style={{
                      display: NewFeed > 9 || NewFeed == 0 ? 'none' : 'block',
                      paddingLeft: '6px'
                    }}>{NewNoti}</span> */}
                    <li><a className="nav-link FedB"
                    ><i className="fas fa-frown" aria-hidden="true" title='شكاوي'></i></a></li>

                  </DropdownToggle>
                  <DropdownMenu end>
                    <Feedbacks />
                  </DropdownMenu>
                </Dropdown>

                {/* <NavLink to='/NotificationBusi' style={{ textDecoration: 'none' }}>
                  <span className='NewNoti' style={{
                    display: NewNoti > 9 && NewNoti != 0 ? 'block' : 'none'
                  }} >+9</span>
                  <span className='NewNoti' style={{
                    display: NewNoti > 9 || NewNoti == 0 ? 'none' : 'block',
                    paddingLeft: '6px'
                  }}>{NewNoti}</span>
                  <li><a className="nav-link Noti"
                    onClick={() => activeNow('.Noti')}><i className="fa fa-bell-o" aria-hidden="true" title='اشعارات'></i></a></li>
                </NavLink> */}
                <Dropdown isOpen={dropdownOpenNotif} toggle={toggleNotif} style={{ display: isUserOrBuisness == '' ? 'none' : 'block' }}>
                  <DropdownToggle className="dropdown-notification-navbar nav-link" >

                    {/* <span className='NewNoti' style={{
                      display: NewNoti > 9 && NewNoti != 0 ? 'block' : 'none'
                    }} >+9</span>
                    <span className='NewNoti' style={{
                      display: NewNoti > 9 || NewNoti == 0 ? 'none' : 'block',
                      paddingLeft: '6px'
                    }}>{NewNoti}</span> */}
                    <li><a className="nav-link Noti"
                      onClick={() => activeNow('.Noti')}><i className="fa fa-bell-o" aria-hidden="true" title='اشعارات'></i></a></li>

                  </DropdownToggle>
                  <DropdownMenu end>
                    <NotificationBusi></NotificationBusi>
                  </DropdownMenu>
                </Dropdown>

                {/* <NavLink to={shkoa} style={{ textDecoration: 'none' }}>
                  <li><a className="nav-link Mess" onClick={() => activeNow('.Mess')}> شكاوي</a></li>
                </NavLink> */}

                <NavLink to='/Welcome' style={{ textDecoration: 'none' }}><li><a className="nav-link Maps"
                  onClick={() => activeNow('.Maps')} style={{ display: isUserOrBuisness == 'business' ? 'none' : 'block' }}><i className='fas fa-route' title='الخريطة'></i></a></li>
                </NavLink>
                <NavLink to='/ProductBusi' style={{ textDecoration: 'none' }}><li><a className="nav-link Products"
                  onClick={() => activeNow('.Products')} style={{ display: isUserOrBuisness == 'business' ? 'block' : 'none' }}><i className="fas fa-clipboard-list" aria-hidden="true" title='منتجاتي'></i></a></li>
                </NavLink>

                <Dropdown isOpen={dropdownOpenLogin} toggle={toggleLogin}
                  style={{ visibility: isUserLogin == false ? 'visible' : 'hidden' }}   >
                  <DropdownToggle className='dropDown-Login' >
                    <li><a className="nav-link login">تسجيل دخول</a></li>
                  </DropdownToggle>
                  <DropdownMenu className='menu-Login'>

                    <LogIn />

                  </DropdownMenu>
                </Dropdown>
                <NavLink to='/SignUp' style={{ textDecoration: 'none' }}>
                  <li>
                    <div className="nav-link signup" style={{ visibility: isUserLogin == false ? 'visible' : 'hidden' }}
                      onClick={() => activeNow('.signup')}><bdi> إنشاء حساب</bdi></div>
                  </li>
                </NavLink>
                <div className='nav-link photoAndName' style={{ visibility: isUserLogin == false ? 'hidden' : 'visible' }}>
                  <img src={(isUserOrBuisness === 'business') ? buisnessProfile.workPicture : urlImage} className='nav-link userPhoto' ></img>
                  <Dropdown isOpen={dropdownOpenUser} toggle={toggleUser}>
                    <DropdownToggle className='dropDown-user' caret>

                      <span className='nav-link userName' >{(isUserOrBuisness === 'business') ? buisnessProfile.WorkName : profileData.name}</span>

                    </DropdownToggle>
                    <DropdownMenu className='menu-user' onClick={toggleUser} end>
                      <NavLink to={profile} style={{ textDecoration: 'none' }}>
                        <div className='profileIcon' onClick={() => activeNow('.Prof')}><bdi><i className="fa fa-user" aria-hidden="true"></i> الصفحة الشخصية</bdi></div>
                      </NavLink>
                      {/* <div><bdi><i className="fa fa-cog" aria-hidden="true"></i> الاعدادات</bdi></div> */}
                      <NavLink to={'./ContactUs'} style={{ textDecoration: 'none' }}>
                        <div className='profileIcon' onClick={() => activeNow('.ContUs')}><bdi><i className="fa fa-phone" aria-hidden="true"></i> تواصل معنا</bdi></div>
                      </NavLink>
                      <NavLink to='/Welcome' style={{ textDecoration: 'none' }}><div className='profileIcon' onClick={() => {
                        setAccessToken('');
                        LogOut('.Maps')
                      }}><bdi><i className="fa fa-sign-out" aria-hidden="true"></i> تسجيل الخروج</bdi></div>
                      </NavLink>
                    </DropdownMenu>
                  </Dropdown>

                </div>






              </ul>

            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Navigate replace to={'/Welcome'} />} />
        <Route exact path='/Welcome' element={<Map />} />
        {/* <Route exact path='/Welcome' element={isUserOrBuisness == 'user' || isUserOrBuisness==''? <Map /> : <MyItems/>} /> */}
        <Route exact path='/ProductBusi' element={<MyItems />} />
        <Route exact path='/Rate1' element={<Rate1 />} />
        <Route exact path='/Rate2' element={<Rate1 />} />
        <Route exact path='/Top10' element={<Top10 />} />
        <Route exact path="/Shkoa" element={<ShkoaNavLink />} />
        <Route exact path='/Profile' element={<Profile />} />
        <Route exact path='/ProfileBuisness' element={<ProfileBusi />} />
        <Route exact path="/editProfile" element={<EditProfileBusi />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route path="/itemInterface" element={<ItemInterface />} />
        <Route path="/sugg" element={<Sugg />} />
        <Route path="/MyItems" element={<MyItems />} />
        <Route path="/ourServices" element={<OurServices />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/AboutUs" element={<AboutUs />} />




      </Routes>
      {/*  ------------------------------------------------------footer-------------------------------------------- */}
      <footer >
        <div className="footer"  >
          <div className='footerLine'></div>
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
                <li onClick={() => { window.scrollTo(0, 0) }}><a href="#">تواصل معنا</a></li>
              </NavLink>
              <NavLink to='/ourServices' style={{ textDecoration: 'none' }}>
                <li onClick={() => { window.scrollTo(0, 0) }}><a href="#">خدماتنا</a></li>
              </NavLink>
              <NavLink to='/PrivacyPolicy' style={{ textDecoration: 'none' }}>
                <li onClick={() => { window.scrollTo(0, 0) }}><a href="#">سياسة الخصوصية</a></li>
              </NavLink>
              <NavLink to="/AboutUs" style={{ textDecoration: 'none' }}>
                <li onClick={() => { window.scrollTo(0, 0) }}><a href="#">من نحن؟</a></li>
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
    </div>




  );
}

export default App;