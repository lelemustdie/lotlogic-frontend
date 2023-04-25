import { useState } from 'react';
import Sidebar from "../components/sidebar";


export default function Owners() {
    const [name,setName]= useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    



    const newUserForm = {
        dni,
        name,
        lastName,
        password,
    
    }

    function handleSubmit  (event) {
        event.preventDefault();
        
        fetch ('http://localhost:8080/api/user/admin/add-owner', {
        headers: {
            "Authorization": 'bearer ${token}',
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(newUserForm),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar dueño');
            }
            alert('Dueño agregado correctamente');
        })
        .catch(error => {
            alert(error.message);
        });

    }

    

    

    return(<div className="row w-100">
                <section className="col-3">
                    <Sidebar/>
                </section>
                <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                    <form onSubmit={handleSubmit} className='w-50'>
                        <div>
                            <label>Nombre del Dueño: </label>
                            <input required type="text" className="form-control" id="name" name="input_ownername" value={name} onChange={event=> setName(event.target.value)}/>

                        </div>
                        <div>
                            <label>Apellido del Dueño: </label>
                            <input required type="text" className="form-control" id="lastName" name="input_ownerlastname" value={lastName} onChange={event=> setLastName(event.target.value)}/>

                        </div>
                        <div>
                            <label>DNI/ID/user: </label>
                            <input required type="number" className="form-control" id="dni" name="input_ownerdni" value={dni} onChange={event=> setDni(event.target.value)}/>

                        </div>
                        <div>
                            <label>Contraseña: </label>
                            <input required  type="password" className="form-control" id="password" name="input_ownerpassword" value={password} onChange={event=> setPassword(event.target.value)}/>

                        </div>
                        
                        <div>
                            <button type="submit" className='btn btn-dark'>AGREGAR DUEÑO</button>
                        </div>

                    </form>
                    

                </section>

    </div>

    )

    
}