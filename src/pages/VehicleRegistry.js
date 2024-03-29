import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {VehicleRegistryTable} from '../components/Table/VehicleRegistryTable'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAdmin from "../components/SidebarAdmin";
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";

export default function ReservationsList() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dni = localStorage.getItem('dni');
    const employeeParkingId = localStorage.getItem('parkingId');

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        if (role === 'ADMIN') {
            fetch(`http://localhost:8080/api/user/admin/panel-reservations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 403) {
                        toast.error("Hubo un problema con la autenticación")
                        return navigate('/');
                    } else if (!response.ok) {
                        throw new Error();
                    } else {
                        return response.json();
                    }
                })
                .then(data => setReservations(data))
                .catch(error => {
                    if (error.message === 'Failed to fetch') {
                        toast.error("Hay un problema con la conexión al servidor");
                        navigate('/');
                        console.log(error)
                    } else {
                        console.log(error);
                    }
                });
            //TODO fix enters despite parkingId is NULL
        } else if (role === 'EMPLOYEE' && employeeParkingId !== null) {
            fetch(`http://localhost:8080/api/user/employee/panel-reservations/${employeeParkingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 403) {
                        toast.error("Hubo un problema con la autenticación")
                        return navigate('/');
                    } else if (!response.ok) {
                        throw new Error();
                    } else {
                        return response.json();
                    }
                })
                .then(data => setReservations(data))
                .catch(error => {
                    if (error.message === 'Failed to fetch') {
                        toast.error("Hay un problema con la conexión al servidor");
                        navigate('/');
                        console.log(error)
                    } else {
                        console.log(error);
                    }
                });
        } else if (role === 'OWNER') {
            fetch(`http://localhost:8080/api/user/owner/panel-reservations/${dni}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 403) {
                        toast.error("Hubo un problema con la autenticación")
                        return navigate('/');
                    } else if (!response.ok) {
                        throw new Error();
                    } else {
                        return response.json();
                    }
                })
                .then(data => setReservations(data))
                .catch(error => {
                    if (error.message === 'Failed to fetch') {
                        toast.error("Hay un problema con la conexión al servidor");
                        navigate('/');
                        console.log(error)
                    } else {
                        console.log(error);
                    }
                });
        }
    }, []);
    const exportToCSV = () => {
        if (role === 'ADMIN' || role === 'OWNER') {
        const csvRows = reservations.map((reservation) => [
            reservation.vehiclePlate,
            reservation.vehicleModel,
            reservation.entryDate,
            reservation.exitDate ?? "N/A",
            reservation.parkingReservationAddress,
        ]);
      
        const csvHeader = "Patente; Modelo; Ingreso; Egreso; Estacionamiento\n";
        const csvContent = csvRows.reduce((content, row) => {
          const csvRow = row.map((field) => `"${field}"`).join(";");
          return content + csvRow + "\n";
        }, csvHeader );
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Historial.csv");
        link.click();
        }
        else{
        const csvRows = reservations.map((reservation) => [
            reservation.vehiclePlate,
            reservation.vehicleModel,
            reservation.entryDate,
            reservation.exitDate ?? "N/A",
        ]);

        const csvHeader = "Patente; Modelo; Ingreso; Egreso\n";
        const csvContent = csvRows.reduce((content, row) => {
          const csvRow = row.map((field) => `"${field}"`).join(";");
          return content + csvRow + "\n";
        }, csvHeader );
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Historial.csv");
        link.click();

        }
      };
      

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
                } else if (response.status === 409) {
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
                {role === 'ADMIN' && <SidebarAdmin/>}
                {role === 'OWNER' && <SidebarOwner/>}
                {role === 'EMPLOYEE' && <SidebarEmployee/>}
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className="text-center">
                    <h2>AUTOS INGRESADOS/EGRESADOS</h2>
                    <VehicleRegistryTable rows={reservations} deleteRow={handleDeleteReservation} adminColumn={role === 'ADMIN' || role === 'OWNER'}/>
                    <button title='Descargar datos' type ="submit" className='btn btn-dark bi bi-download btn-sm' onClick={exportToCSV}> Descargar datos</button>
                </div>
            </section>
        </div>
    )
}
