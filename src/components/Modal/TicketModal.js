import './Ticket.css';
import {useEffect, useState} from "react";
import qrMP from '../../images/qr.png'
import parkingLogo from '../../images/ParkingIcon.png'

export const TicketModal = ({closeModal, reservationId}) => {
    const token = localStorage.getItem('token');

    const [plate, setPlate] = useState('');
    const [model, setModel] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/employee/reservation-ticket/${reservationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPlate(data.vehiclePlate);
                setModel(data.vehicleModel);
                setEntryDate(data.entryDate);
                setPrice(data.amount);
                setAddress(data.parkingReservationAddress);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}>
            <div className="parking-ticket">
                <div className="parking-header">
                    <img src={parkingLogo} alt="Parking Logo" className="parking-logo"/>
                    <h1 className="parking-name">{address}</h1>
                </div>
                <div className="parking-ticket-info">
                    <div className="parking-ticket-row">
                        <span className="parking-ticket-label">Patente</span>
                        <span className="parking-ticket-value">{plate}</span>
                    </div>
                    <div className="parking-ticket-row">
                        <span className="parking-ticket-label">Modelo</span>
                        <span className="parking-ticket-value">{model}</span>
                    </div>
                    <div className="parking-ticket-row">
                        <span className="parking-ticket-label">Ingreso</span>
                        <span className="parking-ticket-value">{entryDate}</span>
                    </div>
                    <div className="parking-ticket-row">
                        <span className="parking-ticket-label">Total</span>
                        <span className="parking-ticket-value">${price}</span>
                    </div>
                </div>
                <div className="parking-ticket-qr">
                    <img src={qrMP} alt='qr-atendido' className='qr-img'/>
                </div>
                <div className='parking-ticket-info'>Escanea y paga con tu aplicación de Mercado Pago</div>
            </div>
        </div>
    );
}
