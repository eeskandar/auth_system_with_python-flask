import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const General = () => {
  return (
    <div className="container">
      <h1 className="mt-5 text-center">The Fight Club</h1>
      <h2 className="mt-3 text-center">
        The First rule is to not talk about it... <br></br>but nobody said
        nothing about registering yourself
      </h2>
      <div className="d-flex my-5 justify-content-center">
        <div className="text-center">
          <Link to="/sign-up" type="button" className="btn btn-primary btn-lg">
            Join now!
          </Link>
          <h3 className="my-3">Already a member?</h3>
          <Link to="/login" type="button" className="btn btn-secondary btn-lg">
            Shhhhh! (log in)
          </Link>
        </div>
      </div>
    </div>
  );
};
