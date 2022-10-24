import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      let user;
      user = { email: email, password: password };
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        new Error("Ocurrió un error en la solicitud");
      }
      const body = await response.json();
      localStorage.setItem("token", body.token);
      navigate("/user/" + body.id);
    } catch (error) {}
  }

  return (
    <div className="container mt-5">
      <h1 className="m-0">You are a member? Shhh...</h1>
      <h2>don't say nothing...</h2>
      <h4 className="mb-5">just Log in...</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            if (email.trim() != "" && password.trim() != "") {
              login(email, password);
              //sin estos set, la página de login simplemente se refresca
            }
          }}
        >
          Log-in
        </button>
      </form>
    </div>
  );
};
