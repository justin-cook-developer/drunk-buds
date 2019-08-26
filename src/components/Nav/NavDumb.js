import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({ navOpen, toggleNav, loggedIn, logout }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          className={`navbar-burger burger ${navOpen ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleNav}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${navOpen ? 'is-active' : ''}`}
        onClick={_ => {
          if (navOpen) {
            toggleNav();
          }
        }}
      >
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>
          {loggedIn && (
            <NavLink to="/groups" className="navbar-item">
              Drinking Groups
            </NavLink>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!loggedIn && (
                <NavLink className="button is-primary" to="/login">
                  Log in
                </NavLink>
              )}
              {!loggedIn && (
                <NavLink className="button is-light" to="/signup">
                  Sign up
                </NavLink>
              )}
              {loggedIn && (
                <NavLink to="/profile" className="navbar-item">
                  Profile
                </NavLink>
              )}
              {loggedIn && (
                <a className="navbar-item">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
