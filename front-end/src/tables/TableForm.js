import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

const { REACT_APP_API_BASE_URL } = process.env;

function TableForm() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 1,
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(undefined);

//   const errors = [];
//   errors.map((error) => {
//     return <ErrorAlert errorMessage={error} />
//   })

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   setError([error]);
  
  //   return () => abortController.abort()
  // }, [error])

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
      body: JSON.stringify({data: formState}),
    });
    const resData = await response.json();
    console.log(resData)
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
    {error ? <ErrorAlert errorMessage={error}/> : <></>}
    <div className="form-group">
      <form onSubmit={submitHandler}>
        <label htmlFor="table_name">Table Name</label>
        <input
          required
          type="text"
          id="table_name"
          name="table_name"
          pattern="\S{2}"
          title="Table names must be at least 2 characters long."
          value={formState.table_name}
          onChange={changeHandler}
        ></input>
        <label htmlFor="capacity">Table Capacity</label>
        <input
          required
          type="number"
          id="capacity"
          name="capacity"
          value={formState.capacity}
          onChange={changeHandler}
        ></input>
        <br />
        <button
          type="button"
          name="cancel-btn"
          onClick={cancelHandler}
          className="btn btn-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          name="submit-btn"
          className="btn btn-secondary"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default TableForm;
