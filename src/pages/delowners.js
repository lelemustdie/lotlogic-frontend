import {useNavigate} from "react-router-dom";
import Sidebar from "../components/sidebar";
import {useState} from "react";

export default function DelOwners() {

    const [id, setId] = useState('');

    const token = localStorage.getItem(`token`)
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/api/user/admin/delete-owner/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method: "delete",

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar dueño');
                }
                alert('Dueño eliminado correctamente');
                navigate('/home');
            })
            .catch(error => {
                alert(error.message);
            });
    }

    return (
        <div className="row w-100">
            <section className="col-3">
                <Sidebar/>
            </section>
            <section className="col-9 fs-4 d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className='w-50'>
                    <div>
                        <label>ID del dueño a ELIMINAR: </label>
                        <input required type="number" className="form-control" id="id" name="input_ownerid" value={id}
                               onChange={event => setId(event.target.value)}/>
                    </div>
                    <button type="submit" className='btn btn-dark'>ELIMINAR DUEÑO</button>

                </form>
            </section>
        </div>
    )
}
