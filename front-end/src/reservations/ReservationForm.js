import React from "react";
import ErrorAlert from "../common/ErrorAlert";

import "./ReservationForm.css";

// this component is the child of both CreateReservation.js & EditReservation.js
function ReservationForm({ reservationData, submitHandler, cancelHandler, error, changeHandler }) {

  return (
    <div>
      {error ? <ErrorAlert errorMessage={error} /> : <></>}
      <div className="col d-flex my-4">
        <form className="col col-6" onSubmit={submitHandler}>
          <div className="d-flex justify-content-between">
            <label htmlFor="first_name">First Name</label>
            <input
              required
              type="text"
              id="first_name"
              name="first_name"
              value={reservationData.first_name}
              onChange={changeHandler}
              className="col col-5"
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="last_name">Last Name</label>
            <input
              required
              type="text"
              id="last_name"
              name="last_name"
              value={reservationData.last_name}
              onChange={changeHandler}
              className="col col-5"
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="mobile_number">Contact Number</label>
            <input
              required
              type="text"
              id="mobile_number"
              name="mobile_number"
              placeholder="xxx-xxx-xxxx"
              value={reservationData.mobile_number}
              onChange={changeHandler}
              className="col col-5"
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              required
              type="date"
              id="reservation_date"
              name="reservation_date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              value={reservationData.reservation_date}
              onChange={changeHandler}
              className="col col-5"
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="reservation_time">Reservation Start Time</label>
            <input
              required
              type="time"
              id="reservation_time"
              name="reservation_time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              value={reservationData.reservation_time}
              onChange={changeHandler}
              className="col col-5"
            ></input>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <label htmlFor="people">Number of Guests</label>
            <input
              required
              type="number"
              id="people"
              name="people"
              value={reservationData.people}
              onChange={changeHandler}
              className="col col-5"
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

export default ReservationForm;
