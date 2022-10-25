import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function createUser(username, email, password) {
    try {
      let newUser;
      newUser = { username: username, email: email, password: password };
      const response = await fetch(process.env.BACKEND_URL + "/api/sign-up", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        new Error("Ocurrió un error en la solicitud");
      }
      const body = await response.json();
      if (body.msg == "Invalid email") {
        alert("Invalid email. Try with another one");
      } else if (body.msg == "Username already taken") {
        alert("This username already exist. Try another one");
      } else {
        alert("Welcome to the club!");
        navigate("/login");
      }
    } catch (error) {}
  }

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
          onClick={(event) => {
            if (username.trim() == "") {
              alert("Name can't be empty");
            } else if (email.trim() == "") {
              alert("Email can't be empty");
            } else if (password.trim() == "") {
              alert("You must set a password");
            } else {
              createUser(username, email, password);
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
