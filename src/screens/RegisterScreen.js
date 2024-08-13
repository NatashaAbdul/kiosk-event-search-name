import React, { useState, useContext, useEffect } from "react";
import "../styles/PersonScreen.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import samsung from "../images/samsung_logo.png";
import { clearOrder, setNumber } from "../actions";
import { v4 as uuidv4 } from 'uuid';

export default function PersonScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { company } = state.company;
  const [filteredPerson, setFilteredPerson] = React.useState([]);
  const [formData, setFormData] = useState({
    company: "",
    person: "",
    // uid: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    var uid = uuidv4();
    e.preventDefault();
    var formattedData = {
      company: formData.company,
      person: formData.person,
      uid: uid,
    }
    console.log(formattedData);
    try {
      const response = await fetch(
        `https://kiosk-event-api.onrender.com/api/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (response.ok) {
        handleClick(uid)
        // alert("Registration successful!");
        // Optionally, clear the form after successful submission
        setFormData({
          company: "",
          person: "",
          // uid: "",
        });
      } else {
        alert("Error: Could not register");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Error: Could not register");
    }
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "550px",
    margin: "auto",
    padding: "20%",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px",
    fontSize: "18px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  };

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
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2>Add Registration</h2>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            style={inputStyle}
            required
          />
          <input
            type="text"
            name="person"
            value={formData.person}
            onChange={handleChange}
            placeholder="Person"
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
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
