import React from 'react';
import './Modal.css';

export const AddOwnerModal = ({closeModal, submitForm}) => {

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal2'>
                <form className='w-100' onSubmit={submitForm}>

                    <div>
                        <label>Nombre</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'/>
                    </div>

                    <div className='mt-3'>
                        <label>Apellido</label>
                        <input required type='text' className='form-control' id='lastName' name='input_ownerlastname'/>
                    </div>

                    <div className='mt-3'>
                        <label>DNI</label>
                        <input required type='number' className='form-control' id='dni' name='input_ownerdni'/>
                    </div>

                    <div className='mt-3'>
                        <label>Contraseña</label>
                        <input required min='3' type='password' className='form-control' id='password'
                               name='input_ownerpassword'/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-dark mt-4'>AGREGAR DUEÑO</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
