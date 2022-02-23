import { width } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const EROR4004 = () => {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div style={{ textAlign: "center", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "59%",
          marginLeft: "auto",
          marginright: "auto",
          marginTop: "20% ",
        }}
      >
        <h1>404</h1>
        <div style={{ backgroundColor: "black", width: "2px" }}></div>
        <p>
          This page could not found.
          <br />
          <button onClick={handleClick}>Go back home</button>
        </p>
      </div>
    </div>
  );
};

export default EROR4004;
