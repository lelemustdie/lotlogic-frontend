import { useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";


export default function Entry(){
    
    const[carPlate,setPlate] = useState('');
    const[carModel, setModel] = useState('');
    const[carType, setCarType] = useState('');
    const[floor, setFloor] = useState('');
    const[lot, setLot] = useState('');
    const[parkingId, setParkingId] = useState('');

    const floors = [50,100,75,81]
    const fees = [23,23,3]
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    

    const entryForm = {
        
        carPlate,
        carModel,
        carType,
        floor,
        lot,
        parkingId,
    }

    function handleSubmit(event) {
        event.preventDefault(); 
        fetch ('http://localhost:8080/api/user/employee/check-in-car', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(entryForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al ingresar vehículo');
                }
                alert('Vehículo ingresado correctamente');
                navigate('/home');
            })
            .catch(error => {
                alert(error.message);
            });

        }

        return (<div className="row w-100">
                <section className="col-3">
                    <Sidebar/>
                </section>
                <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Parking ID: </label>
                            <input required type="number" className="form-control" id="parkingId" name="input_id" value={parkingId} onChange={event=> setParkingId(event.target.value)}/>
                        </div>
                        
                        <div>
                            <label>Patente: </label>
                            <input required type="text" className="form-control" id="carPlate" name="input_plate" value={carPlate} onChange={event => setPlate(event.target.value)}/>
                        </div>
        
                        <div>
                            <label>Modelo: </label>
                            <input required type="text" className="form-control" id="carModel" name="input_model" value={carModel} onChange={event => setModel(event.target.value)}/>

                        </div>
                        <div>
                            <label className="m">Tipo de auto (TARIFA): </label>
                            <select required onChange={event =>setCarType(event.target.value)}>
                                <option value="TRUCK">Camioneta/Pick Up</option>
                                <option value="CAR">Auto</option>
                                <option value="MOTORCYCLE">Moto</option>
                            </select>

                        </div>
                        <div>
                            <label>Piso: </label>
                            <select>
                                {floors.map((floor,index) => <option>{index+1}</option>)}
                            </select>

                        </div>
                        <div>
                            <label>Nro Cochera: </label>
                            <input type="number" className="form-control" id="lot" name="input_lot" value={lot} onChange={event=> setLot(event.target.value)} />

                        </div>
                        <div>
                            <button type="submit" className='btn btn-dark'>INGRESAR AUTO</button>
                        </div>
                        
            
                    </form>
                </section>


            </div>)






    }

    

