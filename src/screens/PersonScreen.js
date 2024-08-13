import React, { useContext, useEffect } from "react";
import "../styles/PersonScreen.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import samsung from "../images/samsung_logo.png";
import { clearOrder, setNumber } from "../actions";

export default function PersonScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { company } = state.company;
  const [filteredPerson, setFilteredPerson] = React.useState([]);

  useEffect(() => {
    fetch(
      "https://kiosk-event-api.onrender.com/api/registration"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredItems = data.filter((item) => item.company === company);
        console.log(filteredItems);
        setFilteredPerson(filteredItems);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [dispatch, company]);

  const handleClick = (item) => {
    console.log(item);
    setNumber(dispatch, item);
    navigate("/confirm");
  };

  return (
    <div className="personscreen-container">
      <div className="left-pane">
        <h1 className="host">Search Your Name</h1>

        {filteredPerson.length > 0 ? (
          <ul className="scrollable-list">
            {filteredPerson.map((item) => (
              <button
                className="buttonPerson"
                key={item._id}
                onClick={() => handleClick(item.uid)}
                style={{ display: "block", marginBottom: "10px" }}
              >
                {item.person}
              </button>
            ))}
          </ul>
        ) : (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>


      <div className="right-pane">
        <div className="register-container">
          <h2>Not registered?</h2>
          <p

            onClick={() => {
              navigate("/register");
            }}
          >
            click to register
          </p>
        </div>
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
