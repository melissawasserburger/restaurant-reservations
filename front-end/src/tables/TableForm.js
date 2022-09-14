import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../common/ErrorAlert";

const { REACT_APP_API_BASE_URL } = process.env;

function TableForm() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(undefined);

  const changeHandler = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    formState.capacity = Number(formState.capacity);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/tables`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: formState }),
    });

    const resData = await response.json();
    if (resData.error) {
      setError(resData.error);
    }

    if (response.status !== 400) {
      setFormState({ ...initialFormState });
      history.push(`/dashboard`);
    }
  };

  return (
    <div>
      {error ? <ErrorAlert errorMessage={error} /> : <></>}
      <h4 id="form-title">Create a Table</h4>
      <div className="col d-flex">
        <form className="col col-lg-6 col-md-10 col-sm-10" onSubmit={submitHandler}>
          <div className="d-flex justify-content-between">
            <label htmlFor="table_name">Table Name</label>
            <input
              required
              type="text"
              id="table_name"
              name="table_name"
              title="Table names must be at least 2 characters long."
              value={formState.table_name}
              onChange={changeHandler}
              className="col col-5"
              style={{marginRight: "10rem"}}
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="capacity">Table Capacity</label>
            <input
              required
              type="number"
              id="capacity"
              name="capacity"
              value={formState.capacity}
              onChange={changeHandler}
              className="col col-5"
              style={{marginRight: "10rem"}}
            ></input>
          </div>
          <br />
          <div className="col col-12">
            <button
              type="button"
              name="cancel-btn"
              onClick={cancelHandler}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              name="submit-btn"
              className="btn btn-primary ml-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TableForm;
