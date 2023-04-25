import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');

    const logInForm = {
        dni: dni,
        password: password,
    }

    const navigate = useNavigate();

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
                    throw new Error('Usuario Inválido');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
                // TODO: display an error message to the user
            });
    };

    return (<div className="container vh-100 d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
            <div className="text-center pb-3">
                <div className="pb-3">
                    <h1>LotLogic</h1>
                </div>
                <img src='/resources/login.png' alt='login logo' width={80}/>
            </div>

            <div className="form-group pb-3">
                <label>Usuario</label>
                <input type="text" className="form-control" id="dni" name="input_user" value={dni}
                       onChange={event => setDni(event.target.value)}/>
            </div>

            <div className="form-group pb-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" id="password" name="input_password" value={password}
                       onChange={event => setPassword(event.target.value)}/>
            </div>

            <div className="text-center pb-3">
                <button type="submit" className="btn btn-dark">Login</button>
            </div>
        </form>
    </div>)

}

export default Login;
