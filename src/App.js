import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Entry from './pages/Entry';
import Exit from './pages/Exit';
import VehicleRegistry from './pages/VehicleRegistry'
import PanelOwners from './pages/PanelOwners'
import PanelEmployees from './pages/PanelEmployees'
import PanelParkings from './pages/PanelParkings'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


import {Ticket} from './components/Modal/Ticket'

function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route element={<PrivateRoute/>}>

                        <Route exact path='/TicketDev' element={<Ticket/>}/>

                        <Route exact path="/Home" element={<Home/>}/>
                        <Route exact path="/Entry" element={<Entry/>}/>
                        <Route exact path="/Exit" element={<Exit/>}/>
                        <Route exact path='/PanelOwners' element={<PanelOwners/>}/>
                        <Route exact path='/PanelEmployees' element={<PanelEmployees/>}/>
                        <Route exact path='/PanelParkings' element={<PanelParkings/>}/>
                        <Route exact path='/VehicleRegistry' element={<VehicleRegistry/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
