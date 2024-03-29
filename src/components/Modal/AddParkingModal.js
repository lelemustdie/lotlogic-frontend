import React, {useState} from 'react';
import './Modal.css';

export default function AddParkingModal(props) {
    let {closeModal, submitForm, setFees, fees, setFloors, floor, setAddress} = props;


    function handleAddFloor() {
        if (Object.values(floor).length < 20) { // Verificar el límite de pisos (20)
            const newFloor = {index: Object.values(floor).length + 1, slotsNumber: 0};
            setFloors({...floor, [Object.values(floor).length + 1]: newFloor});
        }
    }

    function handleCocherasChange(event, floorIndex) {
        const updatedFloors = Object.values(floor).map(floor => {
            if (floor.index === floorIndex) {
                return {...floor, slotsNumber: parseInt(event.target.value)};
            }
            return floor;
        });
        setFloors(updatedFloors);
    }

    function handleRemoveFloor(floorIndex) {
        const updatedFloors = Object.values(floor).filter(floor => floor.index !== floorIndex);
        setFloors(updatedFloors);
    }

    function handleFeeChange(event) {
        setFees({...fees, [event.target.name]: {feePrice: event.target.value, feeType: event.target.name}})
    }

    function handleAddressChange(event) {
        setAddress(event.target.value)
    }

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}>
            <div className='modal3'>
                <form className='w-100 form' onSubmit={submitForm}>

                    <div>
                        <label>Dirección</label>
                        <input placeholder='Av. Cabildo 892' required type='text' className='form-control' id='address'
                               name='input_address'
                               onChange={event => handleAddressChange(event)}/>
                    </div>

                    <div>
                        {Object.values(floor)?.map(floor => (
                            <div key={floor.index}>
                                <div>Piso {floor.index} - Cantidad de cocheras (Máx. 250)</div>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={floor.slotsNumber > 250 ? 250 : floor.slotsNumber}
                                    onChange={event => handleCocherasChange(event, floor.index)}
                                    max={250}
                                />

                                <button type="button" className='btn btn-danger'
                                        onClick={() => handleRemoveFloor(floor.index)}>
                                    Eliminar piso
                                </button>
                            </div>
                        ))}
                        <button type="button" className='btn btn-dark' onClick={handleAddFloor}>Añadir un piso (Máx
                            20)
                        </button>
                    </div>

                    <div className='mt-4'>
                        <div >Tarifas (Precio/HS)</div>
                        <label className='mt-4'>Auto</label>
                        <input required type='number' className='form-control' id='fees'
                               name='AUTO' onChange={handleFeeChange}/>
                        <label>Camioneta</label>
                        <input required type='number' className='form-control'
                               id='fees' name='CAMIONETA' onChange={handleFeeChange}/>
                        <label>Moto</label>
                        <input required type='number' className='form-control' id='fees'
                               name='MOTO' onChange={handleFeeChange}/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-success'>AGREGAR ESTACIONAMIENTO</button>
                    </div>
                </form>
            </div>
        </div>
    );
}