import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Rate1 from './components/map/Rate/rate1'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import stor from './components/redux/index'
import reducer from './Buisness/reducers/rootReducer'
import { BrowserRouter as Router, Routes, Route,HashRouter } from "react-router-dom";

const store= createStore(stor);
// const storeBuisness = createStore(reducer);

ReactDOM.render(
 <Provider store={store}>
  <Router >
  <App/>
  
  </Router>
  </Provider>
 ,
  document.getElementById('root'),
);
