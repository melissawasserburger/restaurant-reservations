import React, { useState } from "react";
import { useHistory } from "react-router";
const { REACT_APP_API_BASE_URL } = process.env;

function ReservationForm() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formState, setFormState] = useState(initialFormState);

  const changeHandler = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    const resData = await response.json();
    // for now, the response from the backend is simply console logged
    console.log(resData);
    setFormState({ ...initialFormState });
    history.goBack();
  };

  return (
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
        <label htmlFor="last_name">Last Name</label>
        <input
          required
          type="text"
          id="last_name"
          name="last_name"
          value={formState.last_name}
          onChange={changeHandler}
        ></input>
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
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          required
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder={new Date()}
          value={formState.reservation_date}
          onChange={changeHandler}
        ></input>
        <label htmlFor="reservation_time">Reservation Start Time</label>
        <input
          required
          type="time"
          id="reservation_time"
          name="reservation_time"
          placeholder="HH:MM:SS"
          value={formState.reservation_time}
          onChange={changeHandler}
        ></input>
        <label htmlFor="people">People Attending</label>
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
          onClick={cancelHandler}
          className="btn btn-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          name="submit-btn"
          onClick={submitHandler}
          className="btn btn-secondary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
