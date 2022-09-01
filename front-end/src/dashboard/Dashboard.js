import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationsList";
import {
  formatAsDate,
  formatAsTime,
  previous,
  next,
  today,
} from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationslist = reservations.map((reservation, index) => (
    <ReservationList
      key={index}
      reservation={reservation}
      date={date}
      formatTime={formatAsTime}
    />
  ));

  return (
    <main>
      <div className="row d-flex flex-column">
        <h1 className="col-12 d-flex flex-wrap" style={{fontFamily: 'Oooh Baby'}}>
          {new Date().getHours() < 12 ? "Good morning." : "Good evening."}
        </h1>
        <div className="col-12 flex-wrap d-flex flex-wrap justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        </div>
        <div className="row justify-content-around my-3">
            <button type="button" name="previous-btn" className="ml-auto">
              Previous
            </button>
            <button type="button" name="next-btn" className="mx-3">
              Next
            </button>
            <button type="button" name="today" className="mr-auto">
              Today
            </button>
        </div>
        <ErrorAlert error={reservationsError} />
      <hr />
      <div className="row">{reservationslist}</div>
    </main>
  );
}

export default Dashboard;
