import {useEffect, useState} from 'react';
import {Table} from '../components/Table/Table'
import {AddOwnerModal} from '../components/Modal/AddOwnerModal';
import {ModifyOwnerModal} from "../components/Modal/ModifyOwnerModal";

export default function PanelOwners() {
    const token = localStorage.getItem('token')
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
                alert('Dueño eliminado correctamente');
                setRows(rows.filter((_, idx) => idx !== targetIndex))
            })
            .catch(error => {
                alert(error.message);
            });
    };

    //addOwner
    const handleAddOwner = (event) => {
        event.preventDefault();
        const newUserForm = {
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
                if (!response.ok) {
                    throw new Error('Error al agregar dueño');
                }
                alert('Dueño agregado correctamente');
            })
            .catch(error => {
                alert(error.message);
            });
    };

    const getModifyInputFromModal = (event) => {
        const editUserForm = {
            'dni': event.target.dni.value,
            'firstName': event.target.firstName.value,
            'lastName': event.target.lastName.value,
            'password': event.target.password.value
        }
        alert('input collected');
        return editUserForm;
    };

    const handleModifyOwner = (targetIndex) => {
        /*const id = rows[targetIndex].id;*/
        const id = 4;

        /*const editUserForm = getModifyInputFromModal();*/
        const editUserForm = {
            dni: 'xxxxxxx',
            firstName: 'x',
            lastName:'x',
            password: 'xxxx'

        }
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
                alert('Dueño modificado correctamente');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    return (
        <div className='App'>
            <Table rows={rows} deleteRow={handleDeleteOwner} modifyRow={handleModifyOwner}
                   openEditModal={setModifyOwnerModalOpen}></Table>
            <button className='btn btn-dark' onClick={() => setAddOwnerModalOpen(true)}>Añadir Dueño</button>
            {/*addOwner*/}
            {addOwnerModalOpen && <AddOwnerModal closeModal={() => {
                setAddOwnerModalOpen(false)
            }} submitForm={handleAddOwner}/>}

            {/*modifyOwner*/}
            {modifyOwnerModalOpen && <ModifyOwnerModal closeModal={() => {
                setModifyOwnerModalOpen(false)
            }} submitForm={handleModifyOwner}/>}
        </div>
    )
}
