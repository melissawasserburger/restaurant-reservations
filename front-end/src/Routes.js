import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import ReservationForm from "./reservations/ReservationForm";
import TableForm from "./tables/TableForm";
import SeatTableForm from "./tables/SeatTableForm";
import EditReservation from "./reservations/EditReservation";
import Search from "./dashboard/Search";
import NotFound from "./common/NotFound";
import { today } from "./utils/date-time";

function Routes() {
  return (
    <div style={{minHeight: "600px"}}>
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatTableForm />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <TableForm />
      </Route>
      <Route exact path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
    </div>
  );
}

export default Routes;
