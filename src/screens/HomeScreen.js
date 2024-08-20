import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";
import dragon from "../images/main.png";

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/alphabet");
  };

  return (
    <div className="c-container" onClick={handleClick}>
      <div className="full-screen">
        <img src={dragon} alt="Drargon" className="dragon-image" />
      </div>
    </div>
  );
}
