import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeScreen.css";
import landing from "../images/epaper_partner_event.jpg";

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/alphabet");
  };

  return (
    <div className="c-container" onClick={handleClick}>
      <div className="full-screen">
        <img src={landing} alt="Landing Image" className="landing-image" />
      </div>
    </div>
  );
}
