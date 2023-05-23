import React from "react";
import './Table.css'

export const TableParking = ({rows, deleteRow, openEditModal}) => {
    return (
        <div className='table-wrapper'>
            <table className='table'>
                <thead>
                <tr>
                    <th>Dirección</th>
                    <th>Pisos</th>
                    <th>Tarifas</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {
                    rows.map((row, idx) => {
                        return <tr key={idx}>
                            <td>{row.address}</td>
                            <td>{row.floors}</td>
                            <td>{row.fees}</td>
                            <td>
                                <div>
                                <span className='actions'>
                                    <button type='button' name='modify' className='btn btn-dark bi-pen d-inline-block me-2' onClick={() =>  openEditModal(true, idx)}></button>
                                    <button type='button' name='delete' className='btn btn-danger bi-trash d-inline-block' onClick={() => deleteRow(idx)}></button>
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
