import {useState} from 'react';

export default function Lele() {
    const [selectedVehicle, setVehicle] = useState(0)

    const fees = [{
        type: "motorbike",
        fee: 200
    },
        {
            type: "car",
            fee: 400
        },
        {
            type: "truck",
            fee: 900
        }]

    function handleChange(event) {
        setVehicle(event.target.value)
    }

    return (
        <form>
            <div className="form-group">
                <label className="text-light">Tipo de Vehiculo: </label>
                <select onChange={handleChange}>
                    {fees.map((vehicle, index) => <option value={index}>{vehicle.type}</option>)}
                </select>
            </div>
            <div className="text-light">
                Tu fee es de : {fees[selectedVehicle].fee}
            </div>
        </form>
    )
}