import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../common/ErrorAlert";
import ReservationForm from "./ReservationForm";

import "./ReservationForm.css";

const { REACT_APP_API_BASE_URL } = process.env;

function CreateReservation() {
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
  const [error, setError] = useState(null);

  const changeHandler = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const cancelHandler = () => {
    setFormState({ ...initialFormState });
    history.goBack();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    formState.people = Number(formState.people);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
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
      history.push(`/dashboard/?date=${resData.data.reservation_date}`);
    }
  };

  return (
    <div>
      {error ? <ErrorAlert errorMessage={error} /> : <></>}
      <h4 id="form-title">Create a Reservation</h4>
      <ReservationForm
        reservationData={formState}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        error={error}
        changeHandler={changeHandler}
      />
    </div>
  );
}

export default CreateReservation;
