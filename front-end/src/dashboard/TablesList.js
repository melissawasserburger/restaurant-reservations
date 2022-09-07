import React from "react";

function TablesList({ table }) {
  const { table_name, capacity, status } = table;

  function finishBtnHandler() {
    const alertMessage = "Is this table ready to seat new guests?\nThis cannot be undone.";
    // if (confirm(alertMessage) === true) {

    // } else {

    // }
  }

  return (
    <div className="card mx-3">
      <div className="card-header">Table: {table_name}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li
          className="list-group-item"
          id={`data-table-id-status=${table.table_id}`}
        >
          Status: {status}
        </li>
      </ul>
      {status === "Occupied" ? (
        <button type="button" className="btn btn-primary" id={`data-table-id-finish={table.table_id}`}>
          Finish
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TablesList;
