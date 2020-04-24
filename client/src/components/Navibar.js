import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  const logOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <header>
      <nav>
        <NavLink to="/">Log In</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/protected">Dad Jokes</NavLink>
        <NavLink onClick={logOut} to={"/"}>
          Log Out
        </NavLink>
      </nav>
    </header>
  );
};
