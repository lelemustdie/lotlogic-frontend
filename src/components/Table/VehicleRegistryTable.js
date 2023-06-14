import React, {useState} from "react";
import "./Table.css";

export const VehicleRegistryTable = ({rows, deleteRow}) => {
    const [filterValue, setFilterValue] = useState("");

    return (
        <div className="table-wrapper">
            <div className="table-scroll">
                <table className="table">
                    <section>
                        <div className="form-outline mb-4">
                            <input
                                placeholder="Note: you can filter by plate, model or dates"
                                type="text"
                                className="form-control"
                                id="datatable-search-input"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                            />
                            <label className="form-label" htmlFor="datatable-search-input">
                            </label>
                        </div>
                        <div id="datatable"></div>
                    </section>
                    <thead>
                    <tr>
                        <th>Patente</th>
                        <th>Modelo</th>
                        <th>Fecha de ingreso</th>
                        <th>Fecha de egreso</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows
                        ?.filter((row) =>
                            Object.values(row)
                                .join(" ")
                                .toLowerCase()
                                .includes(filterValue.toLowerCase())
                        )
                        .map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{row.vehiclePlate}</td>
                                    <td>{row.vehicleModel}</td>
                                    <td>{row.entryDate}</td>
                                    <td>{row.exitDate}</td>
                                    <td>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
