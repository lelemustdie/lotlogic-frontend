import React, { useState } from 'react';
import './Modal.css';
import * as PropTypes from "prop-types";

export class AddParkingModal extends React.Component {
    render() {
        let {closeModal, submitForm, setFloors, setFees, fees} = this.props;

        function handleFeeChange(event) {
            setFees([...fees, {feePrice: event.target.value, carType: event.target.name}])
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
                            {setFloors.map(floor =>
                                <div>
                                    <div>floor {floor.index}</div>

                                </div>)}

                            <div>Add new floor</div>
                        </div>

                        <div>
                            <div>Tarifas:</div>
                            <span>Auto</span><input required type='number' className='form-control' id='fees'
                                                    name='AUTO' onChange={handleFeeChange}/>
                            <span>Camioneta/PickUp</span><input required type='number' className='form-control'
                                                                id='fees' name='CAMIONETA' onChanget={handleFeeChange}/>
                            <span>Moto</span><input required type='number' className='form-control' id='fees'
                                                    name='MOTO' onChange={handleFeeChange}/>
                        </div>

                        <div>
                            <button type='submit' className='btn btn-dark mt-4'>AGREGAR ESTACIONAMIENTO</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

AddParkingModal.propTypes = {
    closeModal: PropTypes.any,
    submitForm: PropTypes.any,
    setFloors: PropTypes.any,
    setFees: PropTypes.any,
    fees: PropTypes.any
}
