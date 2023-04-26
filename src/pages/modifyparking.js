import React from 'react';
import {useState} from 'react';
import Sidebar from "../components/sidebar";
import {useNavigate} from 'react-router-dom';

export default function ModifyParking() {
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [fees, setFees] = useState('');
    const [floors, setFloors] = useState('');

    const token = localStorage.getItem(`token`)
    const navigate = useNavigate();

    const modifyParkingForm = {
        dni,
        address,
        floors: [],
        fees: []
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/api/user/admin/update-parking/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(modifyParkingForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al modificar estacionamiento');
                }
                alert('Estacionamiento modificado correctamente');
                navigate('/home');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    return (
        <div className="row w-100">
            <section className="col-3">
                <Sidebar/>
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className='w-50'>
                    <div>
                        <label>ID del Estacionamiento a MODIFICAR: </label>
                        <input required type="number" className="form-control" id="id" name="input_parkingid" value={id}
                               onChange={event => setId(event.target.value)}/>

                    </div>

                    <div>
                        <label>DNI/ID/user dueño: </label>
                        <input required type="text" className="form-control" id="name" name="input_dni" value={dni}
                               onChange={event => setDni(event.target.value)}/>

                    </div>
                    <div>
                        <label>Direccion del Estacionamiento: </label>
                        <input required type="text" className="form-control" id="address" name="input_parkingadress"
                               value={address} onChange={event => setAddress(event.target.value)}/>

                    </div>
                    <div>
                        <label>Pisos: </label>
                        <input required type="number" className="form-control" id="floors" name="input_parkingfloors"
                               value={floors} onChange={event => setFloors(event.target.value)}/>

                    </div>
                    <div>
                        <label>Tarifas: </label>

                    </div>
                    <div>
                        <label>Precio Auto: </label>
                        <input required type="number" className="form-control" id="fees" name="input_fees" value={fees}
                               onChange={event => setFees(event.target.value)}/>
                    </div>
                    <div>
                        <label>Precio Moto: </label>
                        <input required type="number" className="form-control" id="fees" name="input_fees" value={fees}
                               onChange={event => setFees(event.target.value)}/>

                    </div>
                    <div>
                        <label>Precio Camioneta: </label>
                        <input required type="number" className="form-control" id="fees" name="input_fees" value={fees}
                               onChange={event => setFees(event.target.value)}/>

                    </div>

                    <div>
                        <button type="submit" className='btn btn-dark'>MODIFICAR ESTACIONAMIENTO</button>
                    </div>

                </form>
            </section>
        </div>
    )
}
