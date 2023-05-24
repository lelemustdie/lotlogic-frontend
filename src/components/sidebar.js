import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
function Sidebar(){

    return (
        <div className="container-fluid vh-100">
            <div className="row">
                <div className="bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column">
                    <div>
                        <a className="text-decoration-none text-white d-flex justify-content-center  mt-3">
                            <span className="ms-1 fs-4">LotLogic</span>
                        </a>
                        <hr className="text-secondary"></hr>
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/carsview" class="nav-link text-white fs-5" aria-current="page"><i class="bi bi-grid-3x2"></i> <span className="ms-2">Vista Cocheras</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/entry" class="nav-link text-white fs-5"><i class="bi bi-box-arrow-right"></i><span className="ms-2">Ingreso</span></a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/checkout" class="nav-link text-white fs-5"><i class="bi bi-box-arrow-left"/><span className="ms-2">Egreso</span></a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/carsin" class="nav-link text-white fs-5"><i class="bi bi-car-front-fill"></i><span className="ms-2">Registro entrada/salida</span></a>
                            </li>

                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/PanelOwners" className="nav-link text-white fs-5" aria-current="page"><i
                                    className="bi bi-person"></i> <span className="ms-2">Dueños</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/modifyowners" class="nav-link text-white fs-5"><i class="bi bi-pencil-square"></i><span className="ms-2">Modificar Dueños</span></a>

                            </li>
                            <li className="nav-item text-white fs-4 my-1">
                                <a href="/PanelParkings" className="nav-link text-white fs-5"><i
                                    className="bi bi-building-add"></i><span
                                    className="ms-2">Estacionamientos</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/modifyparking.js" class="nav-link text-white fs-5"><i class="bi bi-pencil-square"></i><span className="ms-2">Modificar Estacionamiento</span></a>

                            </li>

                        </ul>
                    </div>
                    <div class="dropdown open">
                        <a class="text-decoration-none text-white p-3 dropdown-toggle fs-4" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            <i className="bi bi-person-circle"></i><span className="ms-2">ADMIN</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" href="/login">Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )}
export default Sidebar