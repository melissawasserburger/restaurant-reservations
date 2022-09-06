import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";
//import ErrorAlert from "./ErrorAlert";

const { REACT_APP_API_BASE_URL } = process.env;


// !! this component is very much a work in progress
// submitHandler is able to grab the selected value, but the fetch request is incomplete
function SeatTableForm() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  const [error, setError] = useState(undefined);
  //const [errorMessage, setErrorMessage] = useState(undefined);

  //   const errors = [];
  //   errors.map((error) => {
  //     return <ErrorAlert errorMessage={error} />
  //   })

  //   useEffect(() => {
  //     const abortController = new AbortController();
  //     setErrorMessage([error]);

  //     return () => abortController.abort();
  //   }, [error]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const form = document.getElementById("select");
    const value = form.value;
    console.log(value);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({data: value}),
      });
  };

  const tableOptions = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div>
      {error ? <></> : <></>}
      <div className="form-group">
        <form onSubmit={submitHandler}>
          <label htmlFor="table_id">Choose a table:</label>
          <select required id="select" name="table_id">
            {tableOptions}
          </select>
          <br />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SeatTableForm;
