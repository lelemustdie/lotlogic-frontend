import React from 'react';
import './Modal.css';

export const AddParkingModal = ({closeModal, submitForm}) => {

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
                        <input required type='text' className='form-control' id='address' name='input_ownername'/>
                    </div>

                    <div>
                        <label>Pisos</label>
                        <input required type='text' className='form-control' id='floors' name='input_ownerlastname'/>
                    </div>

                    <div>
                        <label>Tarifa</label>
                        <input required type='number' className='form-control' id='fees' name='input_ownerdni'/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-dark mt-4'>AGREGAR ESTACIONAMIENTO</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
