import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { useState } from "react";


export default function CheckOut() {
    const[reservationId, setReservationId] = useState('');
    const[parkingId, setParkingId] = useState('');

    const token = localStorage.getItem(`token`)
    const navigate = useNavigate();

    const checkOutForm = {
        reservationId,
        parkingId,

    }
    
    

    function handleSubmit  (event) {
        event.preventDefault();
        
            fetch (`http://localhost:8080/api/user/employee/check-out-car`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "put",
            body: JSON.stringify(checkOutForm),
            
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al despachar/cobrar vehiculo');
                }
                alert('Vehiculo despachado/cobrado correctamente');
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
                        <label>ID del TICKET a DESPACHAR: </label>
                        <input required type="number" className="form-control" id="reservationId" name="input_reservationid" value={reservationId} onChange={event=> setReservationId(event.target.value)}/>
                        </div>
                        <div>
                        <label>ID del PARKING donde esta estacionado: </label>
                        <input required type="number" className="form-control" id="parkingId" name="input_parkingid" value={parkingId} onChange={event=> setParkingId(event.target.value)}/>
                        </div>
                        <button type="submit" className='btn btn-dark'>DESPACHAR/COBRAR</button>
                        
                    </form>
                </section>

    </div>

    )

    
}
