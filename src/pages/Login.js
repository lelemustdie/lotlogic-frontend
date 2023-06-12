import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //from user input
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            localStorage.clear()
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const logInForm = {
            dni: dni,
            password: password
        }

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
                    } else {
                        throw new Error(response.statusMessage)
                    }
                }
                return response.json();
            })
            .then((data) => {
                toast.success("Sesión iniciada");
                localStorage.setItem('token', data.tokenResponse.token);
                localStorage.setItem('dni', data.dni);
                localStorage.setItem('firstName', data.firstName);
                localStorage.setItem('role', data.role);
                localStorage.setItem('parkingId', data.parkingId);
                navigate('/Home')
            })
            .catch(error => {
                if (error.message === 'Failed to fetch') {
                    toast.error("Hay un problema con la conexión al servidor");
                    navigate('/');
                    console.log(error);
                } else {
                    toast.error(error.message)
                    console.log(error);
                }
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
