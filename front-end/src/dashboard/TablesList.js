import React from "react";
import { useHistory } from "react-router";

const { REACT_APP_API_BASE_URL } = process.env;

function TablesList({ table, setError }) {
  const { table_id, table_name, capacity, reservation_id } = table;
  const history = useHistory();

  async function finishBtnHandler() {
    const alertMessage =
      "Is this table ready to seat new guests?\nThis cannot be undone.";
    if (window.confirm(alertMessage) === true) {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/tables/${table_id}/seat`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({data: {}}),
        }
      );

      if (response.status !== 400) {
        history.push("/")
      } else {
        console.log("there was an error")
        console.log(response)
      }
    }
  }

  return (
    <div className="card mx-3">
      <div className="card-header">Table: {table_name}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Capacity: {capacity}</li>
        <li
          className="list-group-item"
          data-table-id-status={table.table_id}
        >
          Status: {reservation_id ? "Occupied": "Free" }
        </li>
      </ul>
      {reservation_id ? (
        <button
          type="button"
          className="btn btn-primary"
          data-table-id-finish={table.table_id}
          onClick={finishBtnHandler}
        >
          Finish
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TablesList;
