import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../common/ErrorAlert";

const { REACT_APP_API_BASE_URL } = process.env;

function EditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const formBeforeRender = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [reservation, setReservation] = useState({});
  /*
  formState after render is filled with existing reservation data
  i.e. first_name, last_name, mobile_number, reservation_time, reservation_date, people
  status, created_at, updated_at, and reservation_id are also filled, but those values will not be editable
  */
  const [formState, setFormState] = useState(formBeforeRender);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservation() {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resData = await response.json();
      setReservation(resData.data);
      setFormState({
        ...resData.data,
        reservation_date: resData.data.reservation_date.slice(0, 10),
      });
    }

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  function changeHandler({ target }) {
    setFormState({ ...formState, [target.name]: target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    formState.people = Number(formState.people);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`, {
      method: "PUT",
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
      history.push(`/dashboard?date=${formState.reservation_date}`);
    }
  }

  return (
    <div>
        <div>
            {error ? <ErrorAlert errorMessage={error} /> : <></>}
        </div>
      {reservation.first_name ? (
        <div className="form-group">
          <form onSubmit={submitHandler}>
            <label htmlFor="first_name">First Name</label>
            <input
              required
              type="text"
              id="first_name"
              name="first_name"
              value={formState.first_name}
              onChange={changeHandler}
            ></input>
            <br />
            <label htmlFor="last_name">Last Name</label>
            <input
              required
              type="text"
              id="last_name"
              name="last_name"
              value={formState.last_name}
              onChange={changeHandler}
            ></input>
            <br />
            <label htmlFor="mobile_number">Reservation Contact Number</label>
            <input
              required
              type="text"
              id="mobile_number"
              name="mobile_number"
              placeholder="xxx-xxx-xxxx"
              value={formState.mobile_number}
              onChange={changeHandler}
            ></input>
            <br />
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              required
              type="date"
              id="reservation_date"
              name="reservation_date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              value={formState.reservation_date}
              onChange={changeHandler}
            ></input>
            <br />
            <label htmlFor="reservation_time">Reservation Start Time</label>
            <input
              required
              type="time"
              id="reservation_time"
              name="reservation_time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={formState.reservation_time}
              onChange={changeHandler}
            ></input>
            <br />
            <label htmlFor="people">Number of Guests</label>
            <input
              required
              type="number"
              id="people"
              name="people"
              value={formState.people}
              onChange={changeHandler}
            ></input>
            <br />
            <button
              type="button"
              name="cancel-btn"
              className="btn btn-primary"
              onClick={() => history.goBack()}
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
      ) : (
        <h2>Loading reservation...</h2>
      )}
    </div>
  );
}

export default EditReservation;
