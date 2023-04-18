import './App.css';
import Sidebar from './components/sidebar';
import CarsView from './pages/carsview';
import Home from './pages/home';
import Login from './pages/login';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/sidebar" element={<Sidebar/>}/>
        <Route exact path="/carsview" element={<CarsView/>}/>
        {//<Route exact path="/entry" element={<Entry/>}/>
        //<Route exact path="/carsin" element={<CarsIn/>}/>
        //<Route exact path="/myparkings" element={<MyParkings/>}/>
        //<Route exact path="/owners" element={<Owners/>}/>
      }
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
