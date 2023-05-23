import React, {useState, useEffect} from 'react';
import Sidebar from "../components/sidebar";
import "./carsview.css"

export default function ReservationsList() {
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem(`token`)

    useEffect(() => {
        fetch('http://localhost:8080/api/user/admin/panel-reservations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="row w-100">
            <section className="col-3">
                <Sidebar/>
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center">
                    <h2>AUTOS INGRESADOS/DESPACHADOS</h2>
                    <ul>
                        {reservations.map(reservation => (
                            <li key={reservation.id}>
                                <p>Reservation ID: {reservation.id}</p>
                                <p>Patente: {reservation.carPlate}</p>
                                <p>Modelo: {reservation.carModel}</p>
                                <p>Tipo de auto: {reservation.carType}</p>
                                <p>Fecha de ingreso: {reservation.entryDate}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
