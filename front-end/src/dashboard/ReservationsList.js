import React from "react";
import "./ReservationsList.css";

function ReservationList({ reservation, formatTime }) {
  const {
    first_name,
    last_name,
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

  return (
      <div id="reservation-card">
        <div id="card-title">
          Reservation for {formattedTime}{" "}
          {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12
            ? "AM"
            : "PM"}
        </div>
        <div>
          <h6 id="card-label">Name:</h6>
          <p id="card-text">
            {first_name} {last_name}
          </p>
          <h6 id="card-label">Contact Number:</h6>
          <p id="card-text">{mobile_number}</p>
          <h6 id="card-label">Number of Guests:</h6>
          <p id="card-text">{people}</p>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary px-4 mr-4">
            <a
              className="text-light"
              href={`/reservations/${reservation_id}/seat`}
            >
              Seat
            </a>
          </button>
        </div>
      </div>
  );
}

export default ReservationList;
