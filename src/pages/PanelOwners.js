import {useState, useEffect} from 'react';
import {Table} from '../components/Table/Table'
import {Modal} from '../components/Modal/Modal';

export default function PanelOwners() {
    const token = localStorage.getItem('token')
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/admin/panel-owners', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const updatedRows = data.map(item => {
                    return {
                        id: item.id,
                        dni: item.dni,
                        firstName: item.firstName,
                        lastName: item.lastName
                    }
                });
                setRows(updatedRows);
            })
            .catch(error => console.log(error));
    }, []);

    const handleDeleteRow = (targetIndex) => {
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

    return (
        <div className='App'>
            <Table rows={rows} deleteRow={handleDeleteRow}></Table>
            <button className='btn btn-dark' onClick={() => setModalOpen(true)}>Añadir Dueño</button>
            {modalOpen && <Modal closeModal={() => {
                setModalOpen(false)
            }}/>}
        </div>
    )
}
