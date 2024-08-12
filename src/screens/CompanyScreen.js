import React, { useContext, useEffect } from "react";
import "../styles/CompanyScreen.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import samsung from "../images/samsung_logo.png";
import { clearOrder, setCompany } from "../actions";

export default function CompanyScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { letter } = state.letter;
  const [filteredCompanies, setFilteredCompanies] = React.useState([]);

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
        const uniqueCompanies = [...new Set(data.map((item) => item.company))];
        const filteredCompanies = uniqueCompanies.filter((company) =>
          company.startsWith(letter)
        );
        setFilteredCompanies(filteredCompanies);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [dispatch, letter]);

  const handleClick = (item) => {
    console.log(item);
    setCompany(dispatch, item);
    navigate("/person");
  };

  return (
    <div className="keyscreen-container">
      <div className="left-pane">
        <h1 className="host">Search Your Company</h1>

        {filteredCompanies.length > 0 ? (
          <ul className="scrollable-list">
            {filteredCompanies.map((item) => (
              <button
                className="buttonCompany"
                key={item}
                onClick={() => handleClick(item)}
                style={{ display: "block", marginBottom: "10px" }}
              >
                {item}
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
