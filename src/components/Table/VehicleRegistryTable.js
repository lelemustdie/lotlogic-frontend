import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Table.css";

export const VehicleRegistryTable = ({rows,deleteRow,adminColumn = false,}) => {
  const [filterValue, setFilterValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [showDateRange, setShowDateRange] = useState(false);

  const handleOnNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleOnPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDateRangeChange = (date) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
  };

  const filteredRows = rows
    ?.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    )
    .filter((row) => {
      if (startDate && endDate) {
        const entryDate = new Date(row.entryDate);
        return entryDate >= startDate && entryDate <= endDate;
      }
      return true;
    });

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentRows = filteredRows.slice(startIndex, endIndex);

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
            <div id="datatable"></div>
          </section>
          <div>
            <button type ="submit" className='btn btn-success'  onClick={() => setShowDateRange(!showDateRange)}>
              Seleccionar fecha
            </button>
          {showDateRange && (<DateRange ranges={[{startDate: startDate,endDate: endDate,key: "selection",},]}onChange={handleDateRangeChange}/>)}
          </div>
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
            
            {currentRows.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>{row.vehiclePlate}</td>
                  <td>{row.vehicleModel}</td>
                  <td>{row.entryDate}</td>
                  <td>{row.exitDate}</td>
                  {adminColumn && <td>{row.parkingReservationAddress}</td>}
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button
            button type ="submit"
            className='btn btn-success'
            onClick={handleOnPreviousPage}
            disabled={currentPage === 1}
          >
            Página anterior
          </button>
          <button
            button type ="submit"
            className='btn btn-success'
            onClick={handleOnNextPage}
            disabled={endIndex >= filteredRows.length}
          >
            Próxima página
          </button>
        </div>
      </div>
    </div>
  );
};