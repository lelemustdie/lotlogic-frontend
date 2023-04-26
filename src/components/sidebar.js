import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
function Sidebar(){

    return (
        <div className="container-fluid">
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
                                <a href="/entry" class="nav-link text-white fs-5"><i class="bi bi-plus-square"></i><span className="ms-2">Ingreso</span></a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/carsin" class="nav-link text-white fs-5"><i class="bi bi-car-front-fill"></i><span className="ms-2">Autos Ingresados</span></a>
                            </li>
                        
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/addowners" class="nav-link text-white fs-5"><i class="bi bi-person-vcard"></i><span className="ms-2">Agregar Dueño</span></a>
                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                                <a href="/modifyowners" class="nav-link text-white fs-5"><i class="bi bi-pencil-square"></i><span className="ms-2">Modificar Dueños</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                            <a href="/delowners" class="nav-link text-white fs-5"><i class="bi bi-trash"></i><span className="ms-2">Eliminar Dueños</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                            <a href="/addparking" class="nav-link text-white fs-5"><i class="bi bi-trash"></i><span className="ms-2">Agregar Estacionamiento</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                            <a href="/modifyparking" class="nav-link text-white fs-5"><i class="bi bi-pencil-square"></i><span className="ms-2">Modificar Estacionamiento</span></a>

                            </li>
                            <li class="nav-item text-white fs-4 my-1">
                            <a href="/delparking" class="nav-link text-white fs-5"><i class="bi bi-trash"></i><span className="ms-2">Eliminar Estacionamiento</span></a>

                            </li>
                            
                        </ul>
                    </div>
                    <div class="dropdown open">
                        <a class="text-decoration-none text-white p-3 dropdown-toggle fs-4" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                    <i className="bi bi-person-circle"></i><span className="ms-2">Lele</span>
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