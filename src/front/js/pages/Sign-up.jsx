import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-5">Register yourself in the Club</h1>
      <form>
        <div className="mb-3">
          <label for="exampleInputUser" className="form-label">
            Username
          </label>
          <input
            type="string"
            className="form-control mb-4"
            id="exampleInputUser"
          />
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
            Keep me updated with the lastest info!
          </label>
        </div>
        <button type="submit" className="btn btn-primary me-3">
          Join the Fight Club
        </button>
        <Link to="/login">
          <span className="btn btn-secondary text-decoration-none">
            React Boilerplate
          </span>
        </Link>
      </form>
    </div>
  );
};
