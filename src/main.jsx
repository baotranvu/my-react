import React from 'react'
import ReactDOM from 'react-dom/client'


import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import AppHeader from './modules/core/components/AppHeader';
import UserTable from './modules/user/pages';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppHeader/>
    <UserTable component="UserTable" />
  </React.StrictMode>,
)
