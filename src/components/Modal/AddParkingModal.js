import React, { useState } from 'react';
import './Modal.css';

export const AddParkingModal = ({closeModal, submitForm, setFloors, setFees, fees}) => {

    

    function handleFeeChange(event){
        
        if (fees.include(event.target.name)){
            const feeswithoutactual = fees.filter(fee=>fee.carType!== event.target.name)
            setFees([...feeswithoutactual,{feePrice:event.target.value, carType:event.target.name}])
        }
        else {
            setFees([...fees,{feePrice:event.target.value,carType:event.target.name}])

        }
        
    }

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100' onSubmit={submitForm}>

                    <div>
                        <label>Dirección</label>
                        <input required type='text' className='form-control' id='address' name='input_address'/>
                    </div>

                    <div>
                        <label>Pisos</label>
                        <input required type='text' className='form-control' id='floors' name='input_floors'/>
                    </div>

                    <div>
                        <div>Tarifas:</div>
                        <span>Auto</span><input required type='number' className='form-control' id='fees' name='AUTO' onSubmit={handleFeeChange}/>
                        <span>Camioneta/PickUp</span><input required type='number' className='form-control' id='fees' name='CAMIONETA'onSubmit={handleFeeChange}/>
                        <span>Moto</span><input required type='number' className='form-control' id='fees' name='MOTO'onSubmit={handleFeeChange}/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-dark mt-4'>AGREGAR ESTACIONAMIENTO</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
