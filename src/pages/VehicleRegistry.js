import React, {useState, useEffect} from 'react';
import Sidebar from "../components/sidebar";
import "./carsview.css"
import {TableCarsIn} from '../components/Table/TableCarsIn'

export default function ReservationsList() {
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem(`token`)

    useEffect(() => {
        fetch('http://localhost:8080/api/user/admin/panel-reservations-current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteReservation = (targetIndex) => {
        const reservationId = reservations[targetIndex].id;
        const parkingId = 1;

        const deleteReservationForm = {
            parkingId: parkingId
        }
        fetch(`http://localhost:8080/api/user/employee/check-out-car/${reservationId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify(deleteReservationForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new alert('Error al eliminar Estacionamiento');
                }
                alert('Estacionamiento eliminado correctamente');
                setReservations(reservations.filter((_, idx) => idx !== targetIndex))
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
                <div className="text-center">
                    <h2>AUTOS INGRESADOS</h2>
                    <TableCarsIn rows={reservations} deleteRow={handleDeleteReservation}></TableCarsIn>
                </div>
            </section>
        </div>
    )
}
