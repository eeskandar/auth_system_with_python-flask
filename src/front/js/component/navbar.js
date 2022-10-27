import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const activeUser = store.activeUser;
  const setActiveUser = actions.setActiveUser;

  function logout() {
    localStorage.removeItem("token");
    setActiveUser({ id: "Guest" });
    navigate("/");
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">The "Club"</span>
        </Link>
        <div className="ml-auto">
          {activeUser[0].id == "Guest" ? (
            <div>
              <Link to="/sign-up">
                <button className="btn btn-primary me-2">Register now!</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-secondary">Log-in</button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/user/${activeUser[0].id}`}>
                <button className="btn btn-primary me-2">Profile</button>
              </Link>
              <Link to="/">
                <button className="btn btn-secondary" onClick={(e) => logout()}>
                  Log-out
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
