import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <div
      id="background-container"
      className="row justify-content-between side-bar"
    >
      <div id="logo-background" className="d-flex flex-column mx-4">
        <Link to="/">
          <h1 id="logo">Periodic Tables</h1>
        </Link>
        <div className="row d-inline-flex flex-wrap justify-content-around">
        <p id="address-text" className="text-white"> 1412 W Main St</p>
        <p id="address-text" className="text-white">Artesia, NY | 88210</p>
        </div>
      </div>
      <nav id="nav" className="col d-inline-flex flex-wrap justify-content-end align-items-center">
        <ul className="align-middle" id="accordionSidebar">
          <li className="nav-item">
            <Link className="text-light nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="text-light nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </nav>
    </div>
  );
}

export default Menu;
