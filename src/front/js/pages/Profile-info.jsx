import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "./../store/appContext";

export const ProfileInfo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const params = useParams();
  const getUser = actions.getUser;

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      getUser(params.userid);
    }
  }, []);

  return (
    <div className="container">
      <h1>Welcome back, {store.activeUser[0].username}</h1>
      <img src="https://static.dw.com/image/17301623_303.jpg" />
    </div>
  );
};
