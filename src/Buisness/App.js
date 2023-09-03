import React from 'react';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import TodoItems from './components/BuisnessItems/TodoItems';
import FilterItems from './components/BuisnessItems/FilterItems';
import MyItems from './components/BuisnessItems/MyItems';
import BuisnessNotifications from './components/Notifications/BuisnessNotifications';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Switch, Link, NavLink } from "react-router-dom";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const pageNotFound = () =>{
  // <i class="bi bi-bug"></i>
  <div>404!</div>
}
function App() {
  return (
    <BrowserRouter>

      <div className='App1'>
        
        <Routes>
          <Route path="/" element={<Profile/>} exact="true" />
          <Route path="/editProfile" element={<EditProfile/>} exact="true" />
          <Route path="/profile" element={<Profile/>} exact="true" />
          <Route path="/todoItems" element={<TodoItems />} exact="true" />
          <Route path="/filterItems" element={<FilterItems />} exact="true" />
          <Route path="/myItems" element={<MyItems />} exact="true" />
          <Route path="/buisnessNotifications" element={<BuisnessNotifications />} exact="true" />
          <Route element={<div>404!</div>} exact="true" />
        </Routes>
        
      </div>
    </BrowserRouter>

  )
}

export default App;

