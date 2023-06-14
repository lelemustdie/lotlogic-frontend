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
            <div className='modal1'>
                <form className='w-100 form' onSubmit={submitForm}>

                    <div>
                        <label>Dirección:</label>
                        <input required type='text' className='form-control' id='address' name='input_address'
                               onChange={event => handleAddressChange(event)}/>
                    </div>

                    <div>

                        {Object.values(floor)?.map(floor => (
                            <div key={floor.index}>
                                <div>Piso {floor.index}</div>
                                <input className='form-control'
                                       type="number"
                                       value={floor.slotsNumber}
                                       onChange={event => handleCocherasChange(event, floor.index)}
                                />
                                <button type="button" className='btn btn-danger mt-4'
                                        onClick={() => handleRemoveFloor(floor.index)}>
                                    Eliminar piso
                                </button>
                            </div>
                        ))}
                        <button type="button" className='btn btn-dark mt-4' onClick={handleAddFloor}>Añadir un piso (Máx
                            20)
                        </button>
                    </div>

                    <div>
                        <div>Tarifas:</div>
                        <span>Auto</span>
                        <input required type='number' className='form-control' id='fees'
                               name='AUTO' onChange={handleFeeChange}/>
                        <span>Camioneta/PickUp</span>
                        <input required type='number' className='form-control'
                               id='fees' name='CAMIONETA' onChange={handleFeeChange}/>
                        <span>Moto</span>
                        <input required type='number' className='form-control' id='fees'
                               name='MOTO' onChange={handleFeeChange}/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-success mt-4'>AGREGAR ESTACIONAMIENTO</button>
                    </div>
                </form>
            </div>
        </div>
    );
}