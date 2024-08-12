import React, { useContext, useEffect } from "react";
import "../styles/AlphabetScreen.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import samsung from "../images/samsung_logo.png";
import { clearOrder, setLetter } from "../actions";
export default function KeyScreen() {
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  useEffect(() => {}, []);

  const handleLetterClick = (letter) => {
    console.log(`Clicked letter: ${letter}`);
    setLetter(dispatch, letter);
    navigate("/company");
  };

  const generateAlphabetRows = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const rows = [];

    for (let i = 0; i < alphabet.length; i += 5) {
      const row = alphabet.slice(i, i + 5);
      rows.push(
        <div key={i} className="alphabet-row">
          {row.split("").map((letter, index) => (
            <span
              key={index}
              className="alphabet-letter"
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </span>
          ))}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="alphabetscreen-container">
      <div className="left-pane">
        <h1 className="alphabet-host">Search Your Company</h1>
        <p className="title">By Alphabet</p>
        <div className="alphabet-container">{generateAlphabetRows()}</div>
      </div>
      <div className="right-pane">
        <p
          className="overlay-text"
          onClick={() => {
            clearOrder(dispatch);
            navigate("/");
          }}
        >
          click to start again
        </p>
        <img src={samsung} alt="" className="overlay-image" />
      </div>
    </div>
  );
}
