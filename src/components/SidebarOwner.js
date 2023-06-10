import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import {toast} from "react-toastify";

function SidebarOwner() {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('firstName')
    function handleLogout() {
        const tokenForm = {
            token: token
        }
        fetch('http://localhost:8080/api/auth/logout', {
            headers: {
                'Authorization': `Bearer ${tokenForm}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(tokenForm),
        })
            .then(response => {
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    return (
        <div className="container-fluid vh-100">
            <div className="row">
                <div className="bg-secondary col-auto min-vh-100 d-flex justify-content-between flex-column">
                    <div>
                        <a className="text-decoration-none text-white d-flex justify-content-center  mt-3">
                            <span className="ms-1 fs-4">LotLogic</span>
                        </a>
                        <hr className="text-secondary"></hr>
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/Entry" className="nav-link text-white fs-5"><i
                                    className="bi bi-box-arrow-right"></i><span className="ms-2">Ingreso</span></a>
                            </li>

                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/Exit" className="nav-link text-white fs-5"><i
                                    className="bi bi-box-arrow-left"></i><span className="ms-2">Egreso</span></a>
                            </li>

                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/VehicleRegistry" className="nav-link text-white fs-5"><i
                                    className="bi bi-car-front-fill"></i><span
                                    className="ms-2">Registro entrada</span></a>
                            </li>

                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/PanelEmployees" className="nav-link text-white fs-5" aria-current="page"><i
                                    className="bi bi-person"></i> <span className="ms-2">Empleados</span></a>

                            </li>
                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/PanelParkings" className="nav-link text-white fs-5"><i
                                    className="bi bi-building-fill"></i><span
                                    className="ms-2">Estacionamientos</span></a>

                            </li>
                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/ModifyParking" className="nav-link text-white fs-5"><i
                                    className="bi bi-pencil-square"></i><span
                                    className="ms-2">Modificar Estacionamiento</span></a>
                            </li>

                        </ul>
                    </div>
                    <div className="dropdown open">
                        <a className="text-decoration-none text-white p-3 dropdown-toggle fs-4" type="button"
                           id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            <i className="bi bi-person-circle"></i><span className="ms-2">{name}</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <a className="dropdown-item" href="/" onClick={handleLogout}>Cerrar Sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarOwner