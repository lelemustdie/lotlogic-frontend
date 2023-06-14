import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ParkingTable} from '../components/Table/ParkingTable';
import {ModifyParkingModal} from "../components/Modal/ModifyParkingModal";
import SidebarAdmin from "../components/SidebarAdmin";
import AddParkingModal from '../components/Modal/AddParkingModal';

export default function PanelOwners() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const dni = localStorage.getItem('dni');

    const [addParkingModalOpen, setAddParkingModalOpen] = useState(false);
    const [modifyParkingModalOpen, setModifyParkingModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [address, setAddress] = useState('');
    const [fees, setFees] = useState({});
    const [floors, setFloors] = useState({});

    /*modify*/
    const [indexFromTable, setIndexFromTable] = useState('')
    useEffect(() => {
        if (role === 'ADMIN') {
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
                    console.log(updatedRows)
                })
                .catch(error => console.log(error));
        } else if (role === 'OWNER') {
            fetch(`http://localhost:8080/api/user/owner/panel-parkings/${dni}`, {
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
                    console.log(updatedRows)
                })
                .catch(error => console.log(error));
        } else {
            throw new Error("role not found")
        }
    }, []);

    const handleAddParking = (event) => {
        event.preventDefault();
        //to avoid "fees":{"AUTO":{"feePrice":"1000","feeType":"AUTO"},"MOTO":{"feePrice":"700","feeType":"MOTO"},"CAMIONETA":{"feePrice":"1200","feeType":"CAMIONETA"}}}
        const feesArray = Object.values(fees).map(({feePrice, feeType}) => ({feePrice, feeType}));
        const newParkingForm = {
            dni: dni,
            address: address, //get from add modal
            floors: floors,
            fees: feesArray
        }

        console.log(JSON.stringify(newParkingForm))
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
                /*                //Handle the response body as a string
                                newParkingForm.id = data;
                                setRows(rows.concat(newParkingForm));
                                setAddParkingModalOpen(false);*/
            })
            .catch(error => {
                toast.error(error.message);
            });
    };
    console.log(floors)
    console.log(fees)

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
        event.preventDefault();
        const editParkingForm = {
            dni: dni,
            address: event.target.address.value,
/*            floors: event.target.floors.value,
            fees: event.target.fees.value*/
        }
        console.log(editParkingForm)

    };

    const openModifyParkingModal = (isOpen, idx) => {
        console.log(idx)
        setIndexFromTable(idx);
        setModifyParkingModalOpen(isOpen);
    };

    const closeModifyParkingModal = () => {
        setModifyParkingModalOpen(false);
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
                                  openEditModal={openModifyParkingModal}></ParkingTable>
                    <button className='btn btn-success' onClick={() => setAddParkingModalOpen(true, )}>AÑADIR
                        ESTACIONAMIENTO
                    </button>

                    {/*addParking*/}
                    {addParkingModalOpen &&
                        <AddParkingModal floor={floors} setFloors={setFloors} setFees={setFees} fees={fees}
                                         setAddress={setAddress}
                                         closeModal={() => {
                                             setAddParkingModalOpen(false)
                                         }} submitForm={handleAddParking}/>}

                    {/*modifyParking*/}
                    {modifyParkingModalOpen && <ModifyParkingModal parkingId={rows[indexFromTable].id} closeModal={closeModifyParkingModal} />}
                </div>
            </section>
        </div>
    )
}
