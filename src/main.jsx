
import ReactDOM from 'react-dom/client'
//import boststrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//impot firebase
import { FIRE_BASE_CONFIG } from '@/config/constant';
import { initializeApp } from 'firebase/app';

import {App} from './App';

initializeApp(FIRE_BASE_CONFIG);


ReactDOM.createRoot(document.getElementById("root")).render(
    <App componentId="root" />
);