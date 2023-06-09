import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Entry from './pages/Entry';
import VehicleRegistry from './pages/VehicleRegistry'
import PanelOwners from './pages/PanelOwners'
import PanelEmployees from './pages/PanelEmployees'
import PanelParkings from './pages/PanelParkings'
import ModifyParking from './pages/modifyparking'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route exact path="/Home" element={<Home/>}/>
                        <Route exact path="/Entry" element={<Entry/>}/>
                        <Route exact path='/PanelOwners' element={<PanelOwners/>}/>
                        <Route exact path='/PanelEmployees' element={<PanelEmployees/>}/>
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
