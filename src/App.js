import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import SidebarAdmin from './components/sidebarAdmin';
import Main from './pages/main';
import Login from './pages/login';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
