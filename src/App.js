import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Sidebar from './components/sidebar';
import Entry from './pages/entry';
import Home from './pages/home';
import Login from './pages/login';
import Modifyowners from './pages/modifyowners'
import ModifyParking from './pages/modifyparking'
import NotFound from './pages/NotFound'
import PanelOwners from './pages/PanelOwners'
import PanelParkings from './pages/PanelParkings'
import Privateroute from './components/privateroutes';
import VehicleRegistry from './pages/VehicleRegistry'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route element={<Privateroute/>}>
                        <Route exact path="/home" element={<Home/>}/>
                        <Route exact path="/sidebar" element={<Sidebar/>}/>
                        <Route exact path="/entry" element={<Entry/>}/>
                        <Route exact path='/modifyowners' element={<Modifyowners/>}/>
                        <Route exact path='/PanelOwners' element={<PanelOwners/>}/>
                        <Route exact path='/PanelParkings' element={<PanelParkings/>}/>
                        <Route exact path='/modifyparking' element={<ModifyParking/>}/>
                        <Route exact path='/VehicleRegistry' element={<VehicleRegistry/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;