import React from 'react';
import './Modal.css';

export const ModifyParkingModal = ({closeModal, submitForm}) => {

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100' onSubmit={submitForm}>

                    <div>
                        <label>Direccion</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'/>
                    </div>

                    <div>
                        <label>Pisos</label>
                        <input required type='text' className='form-control' id='lastName' name='input_ownerlastname'/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-dark mt-4'>MODIFICAR ESTACIONAMIENTO</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
