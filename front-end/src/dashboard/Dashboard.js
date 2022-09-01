import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationsList";
import { formatAsTime, previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const urlQuery = useLocation().search;
  const dateQueryStart = (urlQuery.search("date") + 5);
  date = urlQuery.slice(dateQueryStart, dateQueryStart + 10) || date;

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
      formatTime={formatAsTime}
    />
  ));

  const previousHandler = () => {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`)
  }

  const nextHandler = () => {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`)
  }

  const todayHandler = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`)
  }

  return (
    <main>
      <div className="row d-flex flex-column">
        <h1
          className="col-12 d-flex flex-wrap"
          style={{ fontFamily: "Oooh Baby" }}
        >
          {new Date().getHours() < 12 ? "Good morning." : "Good evening."}
        </h1>
        <div className="col-12 flex-wrap d-flex flex-wrap justify-content-center">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
      </div>
      <div className="row justify-content-around my-3">
        <button type="button" name="previous-btn" className="ml-auto" onClick={previousHandler}>
          Previous
        </button>
        <button type="button" name="next-btn" className="mx-3" onClick={nextHandler}>
          Next
        </button>
        <button type="button" name="today" className="mr-auto" onClick={todayHandler}>
          Today
        </button>
      </div>
      {reservationsError ? <ErrorAlert errorMessage={reservationsError}/> : <></>}
      <hr />
      <div className="row">{reservationslist}</div>
    </main>
  );
}

export default Dashboard;
