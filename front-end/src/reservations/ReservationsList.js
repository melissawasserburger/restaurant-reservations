import React from "react";
import "./ReservationsList.css";

const { REACT_APP_API_BASE_URL } = process.env;

function ReservationList({ reservation, formatTime, cancelled, setCancelled }) {
  let {
    first_name,
    last_name,
    status,
    mobile_number,
    reservation_time,
    reservation_date,
    people,
    reservation_id,
  } = reservation;

  let formattedTime = formatTime(reservation_time);
  let formattedHours =
    Number(formattedTime.slice(0, 2)) > 12
      ? Number(formattedTime.slice(0, 2) % 12)
      : Number(formattedTime.slice(0, 2));
  formattedTime = `${formattedHours}${formattedTime.slice(2)}`;

  const cancelHandler = async () => {
    const alertMessage =
      "Do you want to cancel this reservation?\nThis cannot be undone.";
    if (window.confirm(alertMessage)) {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ data: { status: "cancelled" } }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      if (response.status !== 400) {
        setCancelled(!cancelled);
      }
    }
  };

  return (
    <div className="row d-flex flex-wrap" id="reservation-card">
      <div className="col col-12 d-flex justify-content-center" id="card-title">
        Reservation for {first_name} {last_name} at {formattedTime}
        {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12
          ? "AM"
          : "PM"}
      </div>

      <div className="col col-12 d-flex justify-content-center">
        <div className="col col-3 d-flex flex-wrap justify-content-around">
          <p id="card-label">Status:</p>
          <p id="card-text" data-reservation-id-status={reservation_id}>
            {status}
          </p>
        </div>
        <div className="col col-5 d-flex flex-wrap justify-content-around">
          <p id="card-label">Contact Number:</p>
          <p id="card-text">{mobile_number}</p>
        </div>
        <div className="col col-4 d-flex flex-wrap justify-content-around">
          <p id="card-label">Number of Guests:</p>
          <p id="card-text">{people}</p>
        </div>
      </div>

      <div className="col col-12 d-flex">
        <button
          data-reservation-id-cancel={reservation_id}
          type="button"
          name="cancelBtn"
          id="cancelBtn"
          className="d-flex ml-5"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        {status === "booked" ? (
          <button
            type="button"
            className="ml-auto mb-2"
            name="editBtn"
            id="editBtn"
          >
            <a
              href={`/reservations/${reservation_id}/edit`}
              className="text-dark"
            >
              Edit
            </a>
          </button>
        ) : (
          <></>
        )}
        {status === "booked" ? (
          <button type="button" id="seatBtn" className="d-flex mb-2 ml-3 mr-5">
            <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReservationList;
