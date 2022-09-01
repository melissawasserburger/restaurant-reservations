import React from "react";

function ReservationList({ reservation, date, formatTime }) {
  const { first_name, last_name, mobile_number, reservation_time, reservation_date, people } =
    reservation;
  let formattedTime = formatTime(reservation_time);
  let formattedHours = Number(formattedTime.slice(0,2)) > 12 ? Number(formattedTime.slice(0,2) % 12) : Number(formattedTime.slice(0,2));
  formattedTime = `${formattedHours}${formattedTime.slice(2)}`;
  
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
