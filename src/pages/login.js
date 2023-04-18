import { useState } from 'react';

function Login() {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({dni,password})
  }

  return (<div className="container vh-100 d-flex align-items-center justify-content-center">
            <form onSubmit="logIn(event)">
                <div className="text-center pb-3">
                    <div className="pb-3">
                        <h1>LotLogic</h1>
                    </div>
                    <img src='/resources/login.png' alt='login logo' width={80}/>
                </div>

                <div className="form-group pb-3">
                    <label>Usuario</label>
                    <input type="text" className="form-control" id="dni" name="input_user"/>
                </div>

                <div className="form-group pb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" id="password" name="input_password"/>
                </div>

                <div className="text-center pb-3">
                    <button type="submit" className="btn btn-dark">Login</button>
                </div>
            </form>
        </div>)
}

export default Login;
