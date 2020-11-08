import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Cart from "../Cart";

function Navigation() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row navigation">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blueprints">
              Blueprints
            </Link>
          </li>
          <li>
            <Link to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/messageboard">
              Message Board
            </Link>
          </li>
          <li>
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li>
            <Cart/>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/blueprints">
              Blueprints
            </Link>
          </li>
          <li>
            <Link to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/messageboard">
              Message Board
            </Link>
          </li>
          <li>
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
          <li>
            <Cart/>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          The Maker's Corner
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Navigation;
