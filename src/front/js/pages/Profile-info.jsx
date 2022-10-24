import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  async function getUser(userid) {
    try {
      const response = await fetch(
        process.env.BACKEND_URL + `/api/user/${userid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        new Error("Ocurrió un error en la solicitud");
      }
      const body = await response.json();
      console.log(body);
      setUser(body);
    } catch (error) {}
  }

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      getUser(params.userid);
    }
  }, []);

  return (
    <div className="container">
      <h1>Welcome back, {user.username}</h1>
      <img src="https://static.dw.com/image/17301623_303.jpg" />
    </div>
  );
};
