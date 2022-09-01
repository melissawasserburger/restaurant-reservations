import React from "react";

function ReservationList({ reservation, date, formatTime }) {
  const { first_name, last_name, mobile_number, reservation_time, reservation_date, people } =
    reservation;
  const formattedTime = formatTime(reservation_time);
  return (
    <div className="card bg-light mb-3">
      <div className="card-header">Reservation for {formattedTime} {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12 ? "AM" : "PM"}</div>
      <div className="card-body">
        <h6>Name:</h6>
        <p>{first_name} {last_name}</p>
        <h6>Contact Number:</h6>
        <p className="card-text">{mobile_number}</p>
        <h6>Number of Guests:</h6>
        <p className="card-text">{people}</p>
      </div>
    </div>
  );
}

export default ReservationList;
