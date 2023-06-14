import React, {useEffect, useState} from "react";
import './Modal.css';

export const AddEmployeeModal = ({closeModal, submitForm}) => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role');
    const dni = localStorage.getItem('dni');

    const [parkingInputIndex, setInputIndex] = useState('')
    const [parkings, setParkings] = useState([]);

    //to retrieve all parkings and select in dropdown
    useEffect(() => {
        if (role === "ADMIN") {
            fetch(`http://localhost:8080/api/user/admin/panel-parkings`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setParkings(data);
                })
                .catch(error => console.log(error));
        } else if (role === "EMPLOYEE") {
            fetch(`http://localhost:8080/api/user/employee/panel-parkings/${dni}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setParkings(data);
                })
                .catch(error => console.log(error));
        } else if (role === 'OWNER') {
            fetch(`http://localhost:8080/api/user/owner/panel-parkings/${dni}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setParkings(data);
                })
                .catch(error => console.log(error));
        } else {
            throw new Error("role not found");
        }
    }, [])

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const parkingId = parkings[parkingInputIndex].id;
        submitForm(event, parkingId);
    };


    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100' onSubmit={handleFormSubmit}>
                    <div>
                        <label className="m">Estacionamiento</label>
                        <select className="form-select" id='parking' name='parking' required onChange={event => {
                            console.log(event.target.selectedIndex)
                            setInputIndex(event.target.selectedIndex - 1)
                            console.log(parkingInputIndex);
                        }}>
                            <option value="">Seleccione un estacionamiento</option>
                            {parkings.map((parking, index) =>
                                <option key={index} value={parking}>
                                    {parking['id']} - {parking['address']}
                                </option>)}
                        </select>
                    </div>

                    <div>
                        <label>Nombre</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'/>
                    </div>

                    <div>
                        <label>Apellido</label>
                        <input required type='text' className='form-control' id='lastName' name='input_ownerlastname'/>
                    </div>

                    <div>
                        <label>DNI</label>
                        <input required type='number' className='form-control' id='dni' name='input_ownerdni'/>
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input required min='3' type='password' className='form-control' id='password'
                               name='input_ownerpassword'/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-success mt-4'>AGREGAR EMPLEADO</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
