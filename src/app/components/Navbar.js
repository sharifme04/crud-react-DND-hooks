import React from "react";
import PropTypes from "prop-types";
import "../../App.css";

const Navbar = ({ goToPage }) => {
  return (
    <div className="navbar">
      <div className="logo">Caizcoin</div>
      <ul className="nav-links">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => goToPage(`/`)}
        >
          Home
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => goToPage(`/dashboard`)}
        >
          Dashboard
        </button>
        {/*  <Link to="/" >Home</Link>
        <Link to="/dashboard">Dashboard</Link>
              <Link to="/dashboard/todo">TodDo</Link> */}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  goToPage: PropTypes.func,
};
export default Navbar;
