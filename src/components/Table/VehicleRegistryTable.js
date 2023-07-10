import React, { useState } from "react";
import "./Table.css";

export const VehicleRegistryTable = ({ rows, deleteRow, adminColumn = false }) => {
  const [filterValue, setFilterValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
              <label className="form-label" htmlFor="datatable-search-input"></label>
            </div>
            <div>
              <label htmlFor="Desde">Desde:</label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="Hasta">Hasta:</label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div id="datatable"></div>
          </section>
          <thead>
            <tr>
              <th>Patente</th>
              <th>Modelo</th>
              <th>Fecha de ingreso</th>
              <th>Fecha de egreso</th>
              {adminColumn && <th>Estacionamiento</th>}
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
              .filter((row) => {
                if (startDate && endDate) {
                  const entryDate = new Date(row.entryDate);
                  return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
                }
                return true;
              })
              .map((row, idx) => {
                return (
                  <tr key={idx}>
                    <td>{row.vehiclePlate}</td>
                    <td>{row.vehicleModel}</td>
                    <td>{row.entryDate}</td>
                    <td>{row.exitDate}</td>
                    {adminColumn && <td>{row.parking}</td>}
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
