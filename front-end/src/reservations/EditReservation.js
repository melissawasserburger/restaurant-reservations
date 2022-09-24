import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../common/ErrorAlert";
import ReservationForm from "./ReservationForm";

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

  function cancelHandler() {
    history.goBack();
  }

  async function submitHandler(e) {
    e.preventDefault();
    formState.people = Number(formState.people);
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: formState }),
      }
    );
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
      <h4 id="form-title">Edit a Reservation</h4>
      <div>{error ? <ErrorAlert errorMessage={error} /> : <></>}</div>
      <ReservationForm 
        reservationData={formState}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        changeHandler={changeHandler}
        error={error}
        />  
    </div>
  );
}

export default EditReservation;
