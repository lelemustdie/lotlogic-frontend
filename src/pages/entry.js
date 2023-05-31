import {useEffect, useState} from "react";
import Sidebar from '../components/sidebar';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('token');
const userDniFromLogin = 'ADMIN'; //TODO get dni from logged user
const parkingIdFromLogin = 1; //TODO get parking id previously from list or table*/

export default function Entry() {
    const [vehiclePlate, setPlate] = useState('');
    const [vehicleModel, setModel] = useState('');

    const [fees, setFees] = useState([]);
    const [floors, setFloors] = useState([]);
    const [vehicleFee, setVehicleFee] = useState(''); //input of array from selected in dropdown
    const [vehicleFloor, setVehicleFloor] = useState(); //input of array from selected in dropdown

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
            dni: userDniFromLogin,
            vehiclePlate: vehiclePlate,
            vehicleModel: vehicleModel,
            vehicleFee: fees[vehicleFee].feeType, //select the vehicleFee id from fees array
            floor: floors[vehicleFloor].floorId //select the floor
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
                    throw new Error('El piso ' + floors[vehicleFloor].floorId + ' esta lleno')
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
                <Sidebar/>
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
                            setVehicleFee(event.target.selectedIndex)
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
                            setVehicleFloor(event.target.selectedIndex)
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
