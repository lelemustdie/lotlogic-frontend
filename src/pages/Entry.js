import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAdmin from '../components/SidebarAdmin';
import SidebarEmployee from "../components/SidebarEmployee";

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const dni = localStorage.getItem('dni');
const parkingIdFromLogin = 1; //TODO get parking id previously from list or table*/

export default function Entry() {
    const [vehiclePlate, setPlate] = useState('');
    const [vehicleModel, setModel] = useState('');

    const [fees, setFees] = useState([]);
    const [floors, setFloors] = useState([]);
    const [vehicleFeeIndex, setVehicleFeeIndex] = useState(''); //input of array from selected in dropdown
    const [vehicleFloorIndex, setVehicleFloorIndex] = useState(''); //input of array from selected in dropdown

    useEffect(() => {
        //getAllFees from current parking
        fetch(`http://localhost:8080/api/user/employee/fees/${parkingIdFromLogin}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFees(data);
            })
            .catch(error => console.log(error));

        //getAllFloors from current parking
        fetch(`http://localhost:8080/api/user/employee/floors/${parkingIdFromLogin}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFloors(data);
            })
            .catch(error => console.log(error));
    }, []);

    function handleEntry(event) {
        event.preventDefault();
        const entryForm = {
            parkingId: parkingIdFromLogin,
            dni: dni,
            vehiclePlate: vehiclePlate,
            vehicleModel: vehicleModel,
            vehicleFee: fees[vehicleFeeIndex].feeType, //select the vehicleFee id from fees array
            floor: floors[vehicleFloorIndex].floorId //select the floor
        }
        console.log(entryForm);
        fetch('http://localhost:8080/api/user/employee/check-in-car', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(entryForm),
        })
            .then(response => {
                if (response.status === 409) {
                    throw new Error('El piso ' + floors[vehicleFloorIndex].floorId + ' esta lleno')
                } else if (!response.ok) {
                    throw new Error('Error al ingresar vehículo');
                }
                toast.success('Vehículo ingresado correctamente');
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    return (
        <div className="row w-100">
            <ToastContainer position="top-right"/>
            <section style={{paddingLeft: 0}} className="col-3">
                {role === 'ADMIN' || role === 'OWNER' ? (
                    <SidebarAdmin/>
                ) : (
                    <SidebarEmployee/>
                )}
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleEntry}>
                    <div>
                        <label>Patente</label>
                        <input required type="text" className="form-control" id="carPlate" name="input_plate"
                               value={vehiclePlate} onChange={event => setPlate(event.target.value)}/>
                    </div>

                    <div>
                        <label>Modelo</label>
                        <input required type="text" className="form-control" id="carModel" name="input_model"
                               value={vehicleModel} onChange={event => setModel(event.target.value)}/>

                    </div>

                    <div>
                        <label className="m">Tarifas</label>
                        <select class="form-select" required onChange={event => {
                            console.log(event.target.value)
                            console.log(event.target.selectedIndex)
                            setVehicleFeeIndex(event.target.selectedIndex - 1)
                        }}>
                            <option value="">Seleccione una tarifa</option>
                            {fees.map((fee, index) =>
                                <option key={index} value={fee}>
                                    {fee['feeType']} ${fee['feePrice']}/h
                                </option>)}
                        </select>

                    </div>
                    <div>
                        <label>Piso</label>
                        <select class="form-select" required onChange={event => {
                            console.log(event.target.value)
                            console.log(event.target.selectedIndex)
                            setVehicleFloorIndex(event.target.selectedIndex - 1)
                        }}>
                            <option value="">Seleccione un piso</option>
                            {floors.map((floor, index) => <option>
                                {index + 1} - {floor['slotsNumber']} cocheras
                            </option>)}
                        </select>

                    </div>
                    <div>
                        <button type="submit" className='btn btn-dark'>INGRESAR AUTO</button>
                    </div>
                </form>
            </section>
        </div>
    )
}
