import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const LogIn = () => {
  return (
    <div className="container mt-5">
      <h1 className="m-0">You are a member? Shhh...</h1>
      <h2>don't say nothing...</h2>
      <h4 className="mb-5">just Log in...</h4>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Log-in
        </button>
      </form>
    </div>
  );
};
