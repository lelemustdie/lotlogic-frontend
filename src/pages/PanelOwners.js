import React, {useEffect, useState} from 'react';
import {UserTable} from '../components/Table/UserTable'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddOwnerModal} from '../components/Modal/AddOwnerModal';
import {ModifyOwnerModal} from "../components/Modal/ModifyOwnerModal";
import SidebarAdmin from "../components/SidebarAdmin";
import SidebarOwner from "../components/SidebarOwner";
import SidebarEmployee from "../components/SidebarEmployee";

export default function PanelOwners() {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role');

    const [addOwnerModalOpen, setAddOwnerModalOpen] = useState(false);
    const [modifyOwnerModalOpen, setModifyOwnerModalOpen] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/admin/panel-owners', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const updatedRows = data.map(item => {
                    return {
                        'id': item.id,
                        'dni': item.dni,
                        'firstName': item.firstName,
                        'lastName': item.lastName
                    }
                });
                setRows(updatedRows);
            })
            .catch(error => console.log(error));
    }, []);

    const handleAddOwner = (event) => {
        event.preventDefault();
        const newUserForm = {
            'id': '',
            'dni': event.target.dni.value,
            'firstName': event.target.firstName.value,
            'lastName': event.target.lastName.value,
            'password': event.target.password.value
        }

        fetch('http://localhost:8080/api/user/admin/add-owner', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newUserForm),
        })
            .then(response => {
                if (response.status === 403) {
                    throw new Error("La contraseña no cumple los requisitos");
                } else if (response.status === 409) {
                    throw new Error("El dueño ya existe");
                } else {
                    toast.success('Dueño agregado correctamente');
                    return response.text();
                }
            })
            .then(data => {
                // Handle the response body as a string
                newUserForm.id = data;
                setRows(rows.concat(newUserForm));
                setAddOwnerModalOpen(false);
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleDeleteOwner = (targetIndex) => {
        const id = rows[targetIndex].id;
        fetch(`http://localhost:8080/api/user/admin/delete-owner/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar dueño');
                }
                toast.success('Dueño eliminado correctamente');
                setRows(rows.filter((_, idx) => idx !== targetIndex))
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleModifyOwner = (editedOwner) => {
        //get index toModified from table
        const modifiedIndex = 0;
        const id = rows[modifiedIndex].id;
        const editUserForm = {
            dni: editedOwner.dni,
            firstName: editedOwner.firstName,
            lastName: editedOwner.lastName,
            password: editedOwner.password
        };
        console.log(id)
        console.log(editUserForm)

        fetch(`http://localhost:8080/api/user/admin/update-owner/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(editUserForm),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al modificar dueño');
                }
                toast.success('Dueño modificado correctamente');
                // Create a new array with the modified user data
                const modifiedRow = {
                    id: id,
                    dni: editUserForm.dni,
                    firstName: editUserForm.firstName,
                    lastName: editUserForm.lastName
                };

                // Update the rows array by replacing the modified user
                setRows(prevRows => {
                    const updatedRows = [...prevRows];
                    updatedRows[modifiedIndex] = modifiedRow;
                    return updatedRows;
                });
                setModifyOwnerModalOpen(false);
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const closeModal = () => {
        setAddOwnerModalOpen(false)
    };

    return (
        <div className="row w-100">
            <ToastContainer position="top-right"/>
            <section style={{paddingLeft: 0}} className="col-3">
                {role === 'ADMIN' && <SidebarAdmin />}
                {role === 'OWNER' && <SidebarOwner />}
                {role === 'EMPLOYEE' && <SidebarEmployee />}
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <div className='App'>
                    <h2>DUEÑOS</h2>
                    <UserTable rows={rows} deleteRow={handleDeleteOwner} modifyRow={handleModifyOwner}
                               openEditModal={setModifyOwnerModalOpen}></UserTable>
                    <button className='btn btn-dark' onClick={() => setAddOwnerModalOpen(true)}>Añadir Dueño</button>

                    {/*addOwner*/}
                    {addOwnerModalOpen && <AddOwnerModal closeModal={closeModal} submitForm={handleAddOwner}/>}

                    {/*modifyOwner*/}
                    {modifyOwnerModalOpen &&
                        <ModifyOwnerModal updateNewOwnerData={handleModifyOwner} closeModal={() => {
                            setModifyOwnerModalOpen(false)
                        }}/>}
                </div>
            </section>
        </div>
    )
}
