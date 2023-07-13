import React, {useEffect, useState} from 'react';
import './Modal.css';
import {toast} from "react-toastify";

export const ModifyParkingModal = ({closeModal, parkingId}) => {
    const token = localStorage.getItem('token');
    const dni = localStorage.getItem('dni');

    const [address, setAddress] = useState('')
    const [fees, setFees] = useState({});
    const [floors, setFloors] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/user/owner/get-parking/${parkingId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setAddress(data.address)
                setFees(data.fees)
                setFloors(data.floors)
            })
            .catch(error => console.log(error));
    }, []);

    const handleModifyParking = (event) => {
        event.preventDefault();
        const editParkingForm = {
            dni: dni,
            address: address,
            floors: floors,
            fees: fees
        }
        console.log(editParkingForm)
        console.log(parkingId)
        fetch(`http://localhost:8080/api/user/owner/update-parking/${parkingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(editParkingForm)
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Estacionamiento modificado correctamente');
                    //eslint-disable-next-line no-restricted-globals
                    location.reload();
                }

            })
            .catch(error => console.log(error));
    };

    function handleAddFloor() {
        if (Object.values(floors).length < 20) { // Verificar el límite de pisos (20)
            const newFloor = {index: Object.values(floors).length + 1, slotsNumber: 0};
            setFloors({...floors, [Object.values(floors).length + 1]: newFloor});
        }
    }

    function handleCocherasChange(event, floorIndex) {
        console.log(floorIndex)
        const updatedFloors = Object.values(floors).map((floor, index) => {
            if (index === floorIndex) {
                return {...floor, slotsNumber: parseInt(event.target.value)};
            }
            return floor;
        });
        setFloors(updatedFloors);
    }

    function handleFeeChange(event, feeIndex) {
        console.log(feeIndex)
        const updatedFees = Object.values(fees).map((fee, index) => {
            if (index === feeIndex) {
                return {...fee, feePrice: parseInt(event.target.value)};
            }
            return fee;
        });
        setFees(updatedFees);
    }

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100'>

                    <div>
                        <label>Dirección</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'
                               defaultValue={address} onChange={event => setAddress(event.target.value)}/>
                    </div>

                    <div>
                        {Object.values(floors)?.map((floor, index) => (
                            <div key={index}>
                                <div>Piso {floor.index}</div>
                                <input className='form-control'
                                       type="number"
                                       defaultValue={floor.slotsNumber}
                                       onChange={event => handleCocherasChange(event, index)}
                                />
                            </div>
                        ))}
                        <button type="button" className='btn btn-dark mt-4' onClick={handleAddFloor}>Añadir un piso
                        </button>
                    </div>

                    {Object.values(fees)?.map((fee, index) => (
                        <div key={index}>
                            <div>Tarifa {fee.feeType}</div>
                            <input className='form-control'
                                   type="number"
                                   defaultValue={fee.feePrice}
                                   onChange={event => handleFeeChange(event, index)}
                            />
                        </div>
                    ))}

                    <div>
                        <button type='submit' className='btn btn-dark mt-4' onClick={handleModifyParking}>MODIFICAR
                            ESTACIONAMIENTO
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
