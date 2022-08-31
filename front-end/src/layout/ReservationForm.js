import React, { useState } from "react";
import { useHistory } from "react-router";
const {REACT_APP_API_BASE_URL} = process.env;


function ReservationForm() {

const history = useHistory();

  const inititalFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formState, setFormState] = useState(inititalFormState);

  const changeHandler = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const cancelHandler = () => {
    setFormState({...inititalFormState});
    history.push("/");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formState);
    console.log(JSON.stringify(formState))
    const response = await fetch(
        `${REACT_APP_API_BASE_URL}/reservations/new`,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
              },
            body: {
                data: JSON.stringify(formState),
            }
        }
    );
    const resData = await response.json();
    console.log(resData);
    setFormState({ ...inititalFormState });
  }

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
        type="text"
        id="reservation_date"
        name="reservation_date"
        value={formState.reservation_date}
        onChange={changeHandler}
      ></input>
      <label htmlFor="reservation_time">Reservation Start Time</label>
      <input
        required
        type="text"
        id="reservation_time"
        name="reservation_time"
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
      >Cancel</button>
      <button
        type="submit"
        name="submit-btn"
        onClick={submitHandler}
        className="btn btn-secondary"
      >Submit</button>
      </form>
    </div>
  );
}

export default ReservationForm;
