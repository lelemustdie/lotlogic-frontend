import './Ticket.css';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export const Ticket = ({closeModal, submitForm}) => {
    const token = localStorage.getItem('token');

    const reservationId = 1; //get from table
    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [price, setPrice] = useState(' ');

    useEffect(() => {
        console.log(reservationId)
        fetch(`http://localhost:8080/api/user/employee/reservation-ticket/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'GET',
        }).then(response => {
            return response.text();
        })
            .then(data => {
                console.log(data);
                setPlate(data.vehiclePlate);
                setModel(data.vehicleModel);
                setEntryDate(data.entryDate);
                setPrice(data.price);
                console.log(data.vehiclePlate)
                console.log(plate)
            })
            .catch(error => {
                toast.error(error.message);
            });
    }, [])

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100' onSubmit={submitForm}>
                    <div>
                        <h1>Información de la reserva</h1>
                    </div>

                    <div>
                        <label>PATENTE: {plate}</label>
                    </div>

                    <div>
                        <label>MODELO: {model}</label>
                    </div>
                    <div>
                        <label>FECHA DE INGRESO: {entryDate}</label>
                    </div>

                    <div>
                        <label>PRECIO: ${price}</label>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-dark mt-4'>COBRAR</button>
                    </div>
                </form>
            </div>
        </div>
    );

};
