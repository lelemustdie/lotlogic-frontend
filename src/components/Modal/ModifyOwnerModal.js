import React, {useState} from 'react';
import './Modal.css';

export const ModifyOwnerModal = ({closeModal, submitForm, updateNewOwnerData}) => {

    const [newOwnerData, setNewOwnerData] = useState({
        firstName: '',
        lastName:'',
        dni:'',
        password:''
    });

    function editOwner(event) {
        event.preventDefault();
        return updateNewOwnerData(newOwnerData.firstName, newOwnerData.lastName, newOwnerData.dni, newOwnerData.password)
    }

    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container')
                closeModal();
        }}>
            <div className='modal1'>
                <form className='w-100' onSubmit={submitForm}>

                    <div>
                        <label>Nombre</label>
                        <input required type='text' className='form-control' id='firstName' name='input_ownername'
                               onChange={(event) => setNewOwnerData((prevState) => ({...prevState, firstName: event.target.value}))}/>
                    </div>

                    <div>
                        <label>Apellido</label>
                        <input required type='text' className='form-control' id='lastName' name='input_ownerlastname'
                               onChange={(event) => setNewOwnerData((prevState) => ({...prevState, lastName: event.target.value}))}/>
                    </div>

                    <div>
                        <label>DNI</label>
                        <input required type='number' className='form-control' id='dni' name='input_ownerdni'
                               onChange={(event) => setNewOwnerData((prevState) => ({...prevState, dni: event.target.value}))}/>
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input required min='3' type='password' className='form-control' id='password'
                               name='input_ownerpassword' onChange={(event) => setNewOwnerData((prevState) => ({...prevState, password: event.target.value}))}/>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-dark mt-4' onClick={(e) => editOwner(e)}>MODIFICAR DUEÑO
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};
