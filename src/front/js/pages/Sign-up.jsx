import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const createUser = actions.createUser;

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Register yourself in the Club</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="exampleInputUser" className="form-label">
            Username
          </label>
          <input
            type="string"
            className="form-control mb-4"
            id="exampleInputUser"
            placeholder="Your username here"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Your email here"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Your password here"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Keep me updated with the lastest info!
          </label>
        </div>
        <button
          className="btn btn-primary me-3"
          onClick={async (e) => {
            if (username.trim() == "") {
              alert("Name can't be empty");
            } else if (email.trim() == "") {
              alert("Email can't be empty");
            } else if (password.trim() == "") {
              alert("You must set a password");
            } else {
              let userCreated = await createUser(username, email, password);
              if (userCreated == "0") {
                return alert("Invalid email. Try with another one");
              } else if (userCreated == "1") {
                return alert("This username already exist. Try another one");
              }
              alert("Welcome to the club!");
              navigate("/login");
            }
          }}
        >
          Join the Fight Club!
        </button>
        <Link to="/login">
          <span className="btn btn-secondary text-decoration-none">
            Already a member? come here
          </span>
        </Link>
      </form>
    </div>
  );
};
