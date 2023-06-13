import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ParkingTable} from '../components/Table/ParkingTable';
import {ModifyParkingModal} from "../components/Modal/ModifyParkingModal";
import SidebarAdmin from "../components/SidebarAdmin";
import AddParkingModal from '../components/Modal/AddParkingModal';

const token = localStorage.getItem('token');
const dni = localStorage.getItem('dni');

export default function PanelOwners() {
    const [addParkingModalOpen, setAddParkingModalOpen] = useState(false);
    const [modifyParkingModalOpen, setModifyParkingModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [fees, setFees] = useState({});
    const [floors, setFloors] = useState({});

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
        setFloors(floors.concat())

//        setFees(fees.concat({
//                feePrice: 1000,
//                carType: "AUTO"
//            },
//            {
//                feePrice: 700,
//                carType: "MOTO"
//            }));

        const newParkingForm = {
            'dni': dni,
            'address': event.target.address.value,
            'floors': floors,
            'fees': fees
        }
        console.log(fees)

//        fetch('http://localhost:8080/api/user/owner/add-parking', {
//            headers: {
//                'Authorization': `Bearer ${token}`,
//                'Content-Type': 'application/json'
//            },
//            method: 'POST',
//            body: JSON.stringify(newParkingForm),
//        })
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Error al crear el estacionamiento');
//                } else {
//                    toast.success('Estacionamiento agregado correctamente');
//                    return response.text();
//                }
//            })
//            .then(data => {
//                // Handle the response body as a string
//                newParkingForm.id = data;
//                setRows(rows.concat(newParkingForm));
//                setAddParkingModalOpen(false);
//            })
//            .catch(error => {
//                toast.error(error.message);
//            });
    };
    console.log(floors)

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
            <section style={{paddingLeft: 0}} className="col-3">
                <SidebarAdmin/>
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className='App'>
                    <h2>ESTACIONAMIENTOS</h2>
                    <ParkingTable rows={rows} deleteRow={handleDeleteParking} modifyRow={handleModifyParking}
                                  openEditModal={setModifyParkingModalOpen}></ParkingTable>
                    <button className='btn btn-success' onClick={() => setAddParkingModalOpen(true)}>AÑADIR ESTACIONAMIENTO
                    </button>

                    {/*addParking*/}
                    {addParkingModalOpen &&
                        <AddParkingModal floor={floors} setFloors={setFloors} setFees={setFees} fees={fees} closeModal={() => {
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
