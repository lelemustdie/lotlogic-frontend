import React, {useEffect, useState} from 'react';
import {TableParking} from '../components/Table/TableParking';
import {AddParkingModal} from '../components/Modal/AddParkingModal';
import Sidebar from "../components/sidebar";
import {ModifyParkingModal} from "../components/Modal/ModifyParkingModal";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userDniFromLogin = 'ADMIN';
export default function PanelOwners() {
    const token = localStorage.getItem('token')
    const [addParkingModalOpen, setAddParkingModalOpen] = useState(false);
    const [modifyParkingModalOpen, setModifyParkingModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [fees, setFees] = useState([]);
    const [floors, setFloors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/admin/panel-parkings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const updatedRows = data.map(item => {
                    return {
                        'id': item.id,
                        'address': item.address,
                        'floors': item.floors.length,
                        'fees': item.fees.length
                    }
                });
                setRows(updatedRows);
            })
            .catch(error => console.log(error));
    }, []);

    const handleAddParking = (event) => {
        event.preventDefault();
        setFloors(floors.concat({
                slotsNumber: 3
            },
            {
                slotsNumber: 33
            }))

        setFees(fees.concat({
                feePrice: 1000,
                carType: "AUTO"
            },
            {
                feePrice: 700,
                carType: "MOTO"
            }));

        const newParkingForm = {
            'dni': userDniFromLogin,
            'address': event.target.address.value,
            'floors': floors,
            'fees': fees
        }

        fetch('http://localhost:8080/api/user/owner/add-parking', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newParkingForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear el estacionamiento');
                } else {
                    toast.success('Estacionamiento agregado correctamente');
                    return response.text();
                }
            })
            .then(data => {
                // Handle the response body as a string
                newParkingForm.id = data;
                setRows(rows.concat(newParkingForm));
                setAddParkingModalOpen(false);
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleDeleteParking = (targetIndex) => {
        const id = rows[targetIndex].id;
        fetch(`http://localhost:8080/api/user/owner/delete-parking/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar estacionamiento');
                }
                toast.success('Estacionamiento eliminado correctamente');
                setRows(rows.filter((_, idx) => idx !== targetIndex))
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleModifyParking = (event) => {
    };

    return (
        <div className="row w-100">
            <ToastContainer position="top-right"/>
            <section className="col-3">
                <Sidebar/>
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className='App'>
                    <TableParking rows={rows} deleteRow={handleDeleteParking} modifyRow={handleModifyParking}
                                  openEditModal={setModifyParkingModalOpen}></TableParking>
                    <button className='btn btn-dark' onClick={() => setAddParkingModalOpen(true)}>Añadir
                        Estacionamiento
                    </button>

                    {/*addParking*/}
                    {addParkingModalOpen && <AddParkingModal closeModal={() => {
                        setAddParkingModalOpen(false)
                    }} submitForm={handleAddParking}/>}

                    {/*modifyParking*/}
                    {modifyParkingModalOpen && <ModifyParkingModal closeModal={() => {
                        setModifyParkingModalOpen(false)
                    }} submitForm={handleModifyParking}/>}
                </div>
            </section>
        </div>
    )
}