import { useState } from 'react';
import Sidebar from "../components/sidebar";
import {useNavigate} from 'react-router-dom';


export default function AddParking() {
    const [adress,setAdress]= useState('');
    const [dni, setDniOwner] = useState('');
    const [floors, setFloors] = useState([]);
    const [fees, setFees] = useState({
        car:0,
        truck:0,
        motorcycle:0,
    });
    

    const token = localStorage.getItem(`token`)
    const navigate = useNavigate();
    
    const newParkingForm = {
        adress,
        dni,
        floors,
        fees,
    
    }

    function handleSubmit  (event) {
        event.preventDefault();
        
        
            fetch ('http://localhost:8080/api/user/owner/add-parking', {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(newParkingForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar estacionamiento');
                }
                alert('Estacionamiento agregado correctamente');
                navigate('/home');
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
                            <label>Direccion del estacionamiento: </label>
                            <input required type="text" className="form-control" id="adress" name="input_adress" value={adress} onChange={event=> setAdress(event.target.value)}/>

                        </div>
                        <div>
                            <label>DNI/user/ID del Dueño: </label>
                            <input required type="text" className="form-control" id="dni" name="input_dni" value={dni} onChange={event=> setDniOwner(event.target.value)}/>

                        </div>
                        <div>
                            <label>Pisos del Estacionamiento: </label>
                            <input required type="number" className="form-control" id="floors" name="input_floors" value={floors} onChange={event=> setFloors(event.target.value)}/>
                            

                        </div>
                        <div>
                            <section>
                            <label>Tarifas: </label>
                            </section>
                            <label>Precio Auto: </label>
                            <input required type="number" className="form-control" id="car" name="input_carprice" value={fees.car} onChange={event => setFees({fees, auto: event.target.value })}/>

                            <label>Precio Moto: </label>
                            <input required type="number" className="form-control" id="motorcycle" name="input_motorcycleprice" value={fees.motorcycle} onChange={event => setFees({fees, moto: event.target.value })}/>

                            <label>Precio Camioneta: </label>
                            <input required type="number" className="form-control" id="truck" name="input_truckprice" value={fees.truck} onChange={event => setFees({fees, camioneta: event.target.value })}/>

                        </div>
                        
                        <div>
                            <button type="submit" className='btn btn-dark'>CREAR ESTACIONAMIENTO</button>
                        </div>

                    </form>
                </section>

    </div>

    )

    
}