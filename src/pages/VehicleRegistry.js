import React, {useState, useEffect} from 'react';
import {VehicleRegistryTable} from '../components/Table/VehicleRegistryTable'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAdmin from "../components/SidebarAdmin";
import SidebarEmployee from "../components/SidebarEmployee";

export default function ReservationsList() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const parkingId = 1; //TODO get parking id from table in PanelParkings

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (role === 'ADMIN') {
            fetch(`http://localhost:8080/api/user/admin/panel-reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setReservations(data))
                .catch(error => console.error(error));
        } else if (role === 'EMPLOYEE') {
            fetch(`http://localhost:8080/api/user/employee/panel-reservations/${parkingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setReservations(data))
                .catch(error => console.error(error));
        } else {
            //TODO owner
        }
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
                if (response.ok) {
                    toast.success("Vehiculo egresado correctamente");
                    const currentDate = new Date();
                    const formattedDate = currentDate.toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3/$1/$2');

                    const updatedReservations = reservations.map((reservation, index) => {
                        if (index === targetIndex) {
                            return {
                                ...reservation,
                                exitDate: formattedDate
                            };
                        }
                        return reservation;
                    });
                    setReservations(updatedReservations);
                } else if (response.status === 409){
                    toast.error("El vehiculo ya fue despachado")
                }
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
                <div className="text-center">
                    <h2>AUTOS INGRESADOS/EGRESADOS</h2>
                    <VehicleRegistryTable rows={reservations} deleteRow={handleDeleteReservation}/>
                </div>
            </section>
        </div>

    )
}
