//TODO: HEADER COMPONENT
//! Import dependencies
import React from 'react';
import { Link } from 'react-router-dom'; //? Link Changes the URL while staying on the same page

import Auth from '../../utils/auth';

//! Create Header component
const Header = () => {
  const logout = event => {
    //* Remove the token from localStorage and refresh the application by taking the user back to the homepage
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
