import React from 'react';
import './Modal.css';

export const Modal = ({closeModal}) => {
    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}
        >
            <div className='modal1'>
                <form className='w-100'>

                    <div>
                        <label>Nombre</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'/>
                    </div>

                    <div>
                        <label>Apellido</label>
                        <input required type='text' className='form-control' id='lastName' name='input_ownerlastname'/>
                    </div>

                    <div>
                        <label>DNI</label>
                        <input required type='number' className='form-control' id='dni' name='input_ownerdni'/>
                    </div>

                    <div>
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
