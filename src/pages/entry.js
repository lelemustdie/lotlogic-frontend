import { useState } from "react";
import Sidebar from "../components/sidebar";


export default function Entry(){
    const[owner, setOwner] = useState('');
    const[plate,setPlate] = useState('');
    const[brand, setBrand] = useState('');
    const[model, setModel] = useState('');
    const[fee, setFee] = useState('');
    const[floor, setFloor] = useState('');
    const[lot, setLot] = useState('');

    const floors = [50,100,75,81]
    const fees = [23,23,3]
    
    

    const entryForm = {
        owner,
        plate,
        brand,
        model,
        fee,
        floor,
        lot,
    }

    function handleSubmit(event) {
        event.preventDefault(); 



    }

    return (<div className="row">
                <section className="col">
                    <Sidebar/>
                </section>
                <section className="col fs-4">
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>Propietario: </label>
                            <input required type="text" className="form-control" id="owner" name="input_owner" value={owner} onChange={event=> setOwner(event.target.value)}/>
                        </div>
                        <div>
                            <label>Patente: </label>
                            <input required type="text" className="form-control" id="plate" name="input_plate" value={plate} onChange={event => setPlate(event.target.value)}/>
                        </div>
                        <div>
                            <label>Marca: </label>
                            <input required type="text" className="form-control" id="brand" name="input_brand" value={brand} onChange={event => setBrand(event.target.value)}/>

                        </div>
                        <div>
                            <label>Modelo: </label>
                            <input required type="text" className="form-control" id="model" name="input_model" value={model} onChange={event => setModel(event.target.value)}/>

                        </div>
                        <div>
                            <label className="m">Tarifa: </label>
                            <select required onChange={event =>setFee(event.target.value)}>
                                <option value="truck">Camioneta/Pick Up</option>
                                <option value="car">Auto</option>
                                <option value="bike">Moto</option>
                            </select>

                        </div>
                        <div>
                            <label>Piso: </label>
                            <select>
                                {floors.map((floor,index) => <option>{index+1}</option>)}
                            </select>

                        </div>
                        <div>
                            <label>Nro Cochera: </label>
                            <input type="number" className="form-control" id="lot" name="input_lot" value={lot} onChange={event=> setLot(event.target.value)} />

                        </div>

                    </form>
                </section>

            </div>)

}
