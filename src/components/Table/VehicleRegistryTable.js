import React from "react";
import './Table.css'

export const VehicleRegistryTable = ({rows, deleteRow}) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                <tr>
                    <th>Patente</th>
                    <th>Modelo</th>
                    <th>Fecha de ingreso</th>
                </tr>
                </thead>
                <tbody>
                {
                    rows.map((row, idx) => {
                        return <tr key={idx}>
                            <td>{row.vehiclePlate}</td>
                            <td>{row.vehicleModel}</td>
                            <td>{row.entryDate}</td>
                            <td>
                                <div>
                                <span className='actions'>
                                    <button type='button' name='delete'
                                            className='btn btn-danger bi-trash d-inline-block'
                                            onClick={() => deleteRow(idx)}></button>
                                </span>
                                </div>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
