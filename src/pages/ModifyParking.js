import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import SidebarAdmin from "../components/SidebarAdmin";
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const dni = localStorage.getItem('dni');
const parkingIdFromLogin = 1; //TODO get parking id previously from list or table*/

export default function ModifyParking() {
    const [address, setAddress] = useState('');
    const [fees, setFees] = useState('');
    const [floors, setFloors] = useState('');
    const navigate = useNavigate();

    const modifyParkingForm = {
        userDniFromLogin: dni,
        address,
        floors: [],
        fees: []
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/api/user/admin/update-parking/${parkingIdFromLogin}`, {
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
            <section style={{paddingLeft: 0}} className="col-3">
                {role === 'ADMIN' && <SidebarAdmin />}
                {role === 'OWNER' && <SidebarOwner />}
                {role === 'EMPLOYEE' && <SidebarEmployee />}
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className='w-50'>
                    <div>
                        <label>Dirección del Estacionamiento: </label>
                        <input required type="text" className="form-control" id="address" name="input_parkingadress"
                               value={address} onChange={event => setAddress(event.target.value)}/>

                    </div>
                    <div>
                        <label>Pisos</label>
                        <input required type="number" className="form-control" id="floors" name="input_parkingfloors"
                               value={floors} onChange={event => setFloors(event.target.value)}/>

                    </div>

                    <div>
                        <label>Precio Auto</label>
                        <input required type="number" className="form-control" id="fees" name="input_fees" value={fees}
                               onChange={event => setFees(event.target.value)}/>
                    </div>
                    <div>
                        <label>Precio Moto</label>
                        <input required type="number" className="form-control" id="fees" name="input_fees" value={fees}
                               onChange={event => setFees(event.target.value)}/>

                    </div>
                    <div>
                        <label>Precio Camioneta</label>
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
