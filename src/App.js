import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Sidebar from './components/sidebar';
import CarsView from './pages/carsview';
import Entry from './pages/entry';
import Home from './pages/home';
import Lele from './pages/lele';
import Login from './pages/login';
import Addowners from './pages/addowners';
import Modifyowners from './pages/modifyowners'
import Delowners from './pages/delowners'
import AddParking from './pages/addparking';
import DelParking from './pages/delparking';
import CarsIn from './pages/carsin';
import CheckOut from './pages/checkout';
import ModifyParking from './pages/modifyparking';
import NotFound from './pages/NotFound'
import PanelOwners from './pages/PanelOwners'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/home" element={<Home/>}/>
                    <Route exact path="/sidebar" element={<Sidebar/>}/>
                    <Route exact path="/carsview" element={<CarsView/>}/>
                    <Route exact path="/entry" element={<Entry/>}/>
                    <Route exact path="/lele" element={<Lele/>}/>
                    <Route exact path='/modifyowners' element={<Modifyowners/>}/>
                    <Route exact path="/addowners" element={<Addowners/>}/>
                    <Route exact path='/delowners' element={<Delowners/>}/>
                    <Route exact path='/addparking' element={<AddParking/>}/>
                    <Route exact path='/delparking' element={<DelParking/>}/>
                    <Route exact path="/carsin" element={<CarsIn/>}/>
                    <Route exact path="/checkout" element={<CheckOut/>}/>
                    <Route exact path="/carsin" element={<CarsIn/>}/>
                    <Route exact path="/modifyparking" element={<ModifyParking/>}/>
                    <Route exact path='/PanelOwners' element={<PanelOwners/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
