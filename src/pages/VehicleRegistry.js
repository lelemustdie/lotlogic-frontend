import React, {useState, useEffect} from 'react';
import {TableCarsIn} from '../components/Table/TableCarsIn'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const parkingId = 1; //get parking id from table in PanelParkings

export default function ReservationsList() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/employee/panel-reservations/${parkingId}`, {
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
        console.log('reservationId ' + reservationId)
        console.log('parkingId ' + parkingId)
        const deleteReservationForm = {
            parkingId: parkingId
        }
        fetch(`http://localhost:8080/api/user/employee/check-out-car/${reservationId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(deleteReservationForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar Estacionamiento');
                }
                toast.success('Estacionamiento eliminado correctamente');
                setReservations(reservations.filter((_, idx) => idx !== targetIndex))
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
                    <SidebarOwner/>
                ) : (
                    <SidebarEmployee/>
                )}
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center">
                    <h2>AUTOS INGRESADOS/EGRESADOS</h2>
                    <TableCarsIn rows={reservations} deleteRow={handleDeleteReservation}/>
                </div>
            </section>
        </div>

    )
}
