import React from "react";
import { useHistory } from "react-router";

import "./Tables.css";

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
          body: JSON.stringify({ data: {reservation_id: reservation_id} }),
        }
      );

      const resData = await response.json();
      if (response.status !== 400) {
        history.push("/");
      } else {
        setError(resData.error)
      }
    }
  }

  return (
    <div id="whole-card">
      <div className="row d-flex justify-content-center">
        <h4 id="table-name">Table: {table_name}</h4>
      </div>
      <ul>
        <div className="row d-flex justify-content-center">
          <li id="table-info">
            <span className="col">Capacity: </span><span className="col" id="table-info-value">{capacity}</span>
          </li>
        </div>
        <div className="row d-flex justify-content-center">
          <li id="table-info" data-table-id-status={table.table_id}>
          <span className="col">Status: </span>
            <span id="table-info-value">
              {reservation_id ? "Occupied" : "Free"}
            </span>
          </li>
        </div>
      </ul>
      <div className="d-flex justify-content-center">
        {reservation_id ? (
          <button
            type="button"
            id="finish-btn"
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
    </div>
  );
}

export default TablesList;
