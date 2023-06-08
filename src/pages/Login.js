import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');

    const logInForm = {
        dni: dni,
        password: password
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            localStorage.removeItem('token')
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(logInForm),
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Usuario o contraseña invalida");
                    } else if (response.status === 404) {
                        throw new Error("No pudimos encontrar tu cuenta de LotLogic");
                    }
                }
                return response.json();
            })
            .then((data) => {
                toast.success("Sesion iniciada");
                localStorage.setItem('token', data.tokenResponse.token);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(error.message);
            });
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <ToastContainer position="top-right"/>
            <form onSubmit={handleSubmit}>
                <div className="text-center pb-3">
                    <div className="pb-3">
                        <h1>LotLogic</h1>
                    </div>
                    <img src='/resources/login.png' alt='login logo' width={80}/>
                </div>

                <div className="form-group pb-3">
                    <label>Usuario</label>
                    <input required type="text" className="form-control" id="dni" name="input_user" value={dni}
                           onChange={event => setDni(event.target.value)}/>
                </div>

                <div className="form-group pb-3">
                    <label>Contraseña</label>
                    <input required type="password" className="form-control" id="password" name="input_password"
                           value={password}
                           onChange={event => setPassword(event.target.value)}/>
                </div>

                <div className="text-center pb-3">
                    <button type="submit" className="btn btn-dark">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;