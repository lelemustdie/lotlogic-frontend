import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAdmin from '../components/SidebarAdmin';
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";
import {TicketModal} from "../components/Modal/TicketModal";

export default function Exit() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dni = localStorage.getItem('dni');

    //from fetch when render
    const [parkings, setParkings] = useState([]);

    //from user input
    const [parkingInputIndex, setParkingInputIndex] = useState('');
    const [reservations, setReservations] = useState([]);
    const [reservationsInputIndex, setReservationsInputIndex] = useState(-1);
    const [parkingAddress, setParkingAddress] = useState('');
    const [ticketModalOpen, setTicketModalOpen] = useState(false);

    useEffect(() => {
        if (role === "ADMIN") {
            fetch(`http://localhost:8080/api/user/admin/panel-parkings`, {
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
                .then(data => {
                    console.log(data);
                    setParkings(data);

                })
                .catch(error => {
                    if (error.message === 'Failed to fetch') {
                        toast.error("Hay un problema con la conexión al servidor");
                        navigate('/');
                        console.log(error)
                    } else {
                        console.log(error);
                    }
                });
        } else if (role === "EMPLOYEE") {
            fetch(`http://localhost:8080/api/user/employee/panel-parkings/${dni}`, {
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
                .then(data => {
                    console.log(data);
                    setParkings(data);
                    if (data.length > 0) {
                        setParkingAddress(data[0].address);
                        setParkingInputIndex(0);
                    }
                })
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
            fetch(`http://localhost:8080/api/user/owner/panel-parkings/${dni}`, {
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
                .then(data => {
                    console.log(data);
                    setParkings(data);
                })
                .catch(error => {
                    if (error.message === 'Failed to fetch') {
                        toast.error("Hay un problema con la conexión al servidor");
                        navigate('/');
                        console.log(error)
                    } else {
                        console.log(error);
                    }
                });
        } else {
            console.log("role not found");
        }
    }, [])

    useEffect(() => {
        //to avoid error when selects default input option
        if (parkingInputIndex === -1) {
            setReservations([]);
        } else if (parkingInputIndex !== '') {
            fetchReservations();
        }
    }, [parkingInputIndex]);

    const fetchReservations = () => {
        fetch(`http://localhost:8080/api/user/employee/panel-reservations-current/${parkings[parkingInputIndex].id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setReservations(data);
            })
            .catch(error => console.log(error));
    };

    function handleExit() {
        const reservationEditForm = {
            parkingId: parkings[parkingInputIndex].id
        }
        fetch(`http://localhost:8080/api/user/employee/check-out-car/${reservations[reservationsInputIndex].id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(reservationEditForm),
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Vehiculo egresado correctamente");
                } else if (response.status === 409) {
                    toast.error("El vehiculo ya fue despachado")
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    const closeTicketModal = () => {
        setTicketModalOpen(false)
    };

    return (
        <div className="row w-100">
            <ToastContainer position="top-right"/>
            <section style={{paddingLeft: 0}} className="col-3">
                {role === 'ADMIN' && <SidebarAdmin/>}
                {role === 'OWNER' && <SidebarOwner/>}
                {role === 'EMPLOYEE' && <SidebarEmployee/>}
            </section>
            <section className="col-7 d-flex flex-column justify-content-center">

                {(ticketModalOpen && reservationsInputIndex !== -1) &&
                    <TicketModal reservationId={reservations[reservationsInputIndex].id} closeModal={closeTicketModal}
                                 onSubmit={handleExit}/>}

                <div>
                    <label>Estacionamiento</label>
                    {role === 'ADMIN' || role === 'OWNER' ? (
                        <select className="form-select" id='parking' name='parking' required onChange={event => {
                            console.log(event.target.selectedIndex);
                            setParkingInputIndex(event.target.selectedIndex - 1);
                            console.log(parkingInputIndex);
                        }}>
                            <option value="">Seleccione un estacionamiento</option>
                            {parkings.map((parking, index) => (
                                <option key={index} value={parking}>
                                    {parking['id']} - {parking['address']}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <div>
                            <input disabled type="text" className="form-control" value={parkingAddress}/>
                        </div>
                    )}

                    <div>
                        <label className="mt-3">Reservas</label>
                        <select className="form-select" id='reservations' name='reservations' required
                                onChange={event => {
                                    console.log(event.target.selectedIndex)
                                    setReservationsInputIndex(event.target.selectedIndex - 1)
                                    console.log(reservationsInputIndex)
                                }}>
                            <option value="">Seleccione una reserva</option>
                            {reservations.map((reservations, index) =>
                                <option key={index} value={reservations}>
                                    {reservations['vehiclePlate']} - {reservations['vehicleModel']}
                                </option>)}
                        </select>
                    </div>
                    <button className='btn btn-success mt-2' type='submit'
                            onClick={() => setTicketModalOpen(true)}>COBRAR
                    </button>
                </div>
            </section>
        </div>
    )
}
