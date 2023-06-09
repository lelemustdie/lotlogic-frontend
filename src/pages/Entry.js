import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAdmin from '../components/SidebarAdmin';
import SidebarEmployee from "../components/SidebarEmployee";

export default function Entry() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dni = localStorage.getItem('dni');

    //from fetch
    const [parkings, setParkings] = useState([]);
    const [fees, setFees] = useState([]);
    const [floors, setFloors] = useState([]);
    //from user input

    const [parkingInputIndex, setParkingInputIndex] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [feeInputIndex, setFeeInputIndex] = useState(''); //input of array from selected in dropdown
    const [floorInputIndex, setFloorInputIndex] = useState(''); //input of array from selected in dropdown

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
        } else {
            //TODO owner
        }
    }, [])

    useEffect(() => {
        //when user selects default input option
        if (parkingInputIndex === -1){
            setFees([]);
            setFloors([]);
        }
        else if (parkingInputIndex !== '') {
            fetchData();
        }
    }, [parkingInputIndex]);

    const fetchData = () => {
        // getAllFees from the current parking
        fetch(`http://localhost:8080/api/user/employee/fees/${parkings[parkingInputIndex].id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFees(data);
            })
            .catch(error => console.log(error));

        // getAllFloors from the current parking
        fetch(`http://localhost:8080/api/user/employee/floors/${parkings[parkingInputIndex].id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFloors(data);
            })
            .catch(error => console.log(error));
    };

    function handleEntry(event) {
        event.preventDefault();
        const entryForm = {
            parkingId: parkings[parkingInputIndex].id,
            employeeDni: dni,
            vehiclePlate: vehiclePlate,
            vehicleModel: vehicleModel,
            floor: floors[floorInputIndex].floorId, //select the floor
            fee: fees[feeInputIndex].feeId //select the vehicleFee id from fees array
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
                    throw new Error('El piso ' + floors[floorInputIndex].floorId + ' esta lleno')
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
                        <label className="m">Estacionamiento</label>
                        <select className="form-select" id='parking' name='parking' required onChange={event => {
                            console.log(event.target.selectedIndex)
                            setParkingInputIndex(event.target.selectedIndex - 1)
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
                        <label>Patente</label>
                        <input required type="text" className="form-control" id="vehicle_plate" name="vehicle_plate"
                               value={vehiclePlate} onChange={event => setVehiclePlate(event.target.value)}/>
                    </div>

                    <div>
                        <label>Modelo</label>
                        <input required type="text" className="form-control" id="vehicle_model" name="vehicle_model"
                               value={vehicleModel} onChange={event => setVehicleModel(event.target.value)}/>

                    </div>

                    <div>
                        <label className="m">Tarifas</label>
                        <select className="form-select" id='fee' name='fee' required onChange={event => {
                            console.log(event.target.value)
                            console.log(event.target.selectedIndex)
                            setFeeInputIndex(event.target.selectedIndex - 1)
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
                        <select className="form-select" id='floor' name='floor' required onChange={event => {
                            console.log(event.target.value)
                            console.log(event.target.selectedIndex)
                            setFloorInputIndex(event.target.selectedIndex - 1)
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
