import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../common/ErrorAlert";
import TablesList from "./TablesList";

import "./SeatTableForm.css";

const { REACT_APP_API_BASE_URL } = process.env;

function SeatTableForm() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [error, setError] = useState(undefined);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);

    listTables(abortController.signal).then(setTables).catch(setError);

    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  // the value selected in the form is used to determine where to send the data
  // ex. PUT request to "/tables/1/seat" to update the reservation_id column in "tables"
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("select");
    const value = form.value;
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/tables/${value}/seat`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: { reservation_id: reservation_id } }),
      }
    );
    const resData = await response.json();

    if (resData.error) {
      setError(resData.error);
    }

    if (response.status === 200) {
      history.push(`/dashboard`);
    }
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const tablesList = tables.map((table, index) => {
    return <TablesList key={index} table={table} />;
  });

  return (
    <div className="d-flex">
      <div className="col col-4" id="form-group">
        <form onSubmit={submitHandler}>
          <label htmlFor="table_id" id="form-label">
            Please select a table:
          </label>
          <br />
          <select required id="select" name="table_id">
            {tableOptions}
          </select>
          <br />
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {error ? (
          <div className="my-4">
            <ErrorAlert errorMessage={error} />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="col mt-3">
        <h3
          className="d-flex justify-content-center mt-2"
          style={{ fontFamily: "Racing Sans One", fontSize: "2rem" }}
        >
          Current Tables
        </h3>
        <div className="col d-flex flex-wrap justify-content-around">
          {tables.length > 0 ? tablesList : <></>}
        </div>
      </div>
    </div>
  );
}

export default SeatTableForm;
