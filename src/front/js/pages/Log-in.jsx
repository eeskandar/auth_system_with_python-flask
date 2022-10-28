import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../store/appContext";

export const LogIn = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = actions.login;

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
          onClick={async (e) => {
            if (email.trim() == "") {
              alert("Email can't be empty");
            } else if (password.trim() == "") {
              alert("Your password can't be empty");
            } else {
              let success = await login(email, password);
              if (success == true) {
                return navigate("/user/" + store.activeUser[0].id);
              }
              alert("Email or password Invalid");
            }
          }}
        >
          Log-in
        </button>
      </form>
    </div>
  );
};
