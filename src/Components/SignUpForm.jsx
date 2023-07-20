import React, {useState} from "react";
import logoImage from "./logo.png";
import "./Form.css";
import {Link, useNavigate} from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    setEmailValid(email !== "");
    setPasswordValid(password !== "");
    setPhoneNumberValid(phoneNumber !== "");

    if (!emailValid || !passwordValid || !phoneNumberValid) {
      setErrorMessage("Empty Fields!!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/UserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
          PhoneNumber: phoneNumber,
        }),
      });

      if (!response.ok) {
        const {message} = await response.json();
        throw new Error(message);
      }

      console.log("Data SENT SUCCESS");
      setSuccessMessage("Signed Up Successfully!");
      // Redirect the user to the dashboard page
      navigate("/signin");

      // Only clear the fields if the fetch request was successful
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="centered-form">
      <img src={logoImage} alt="Logo" />
      <h1>Sign Up</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className={`text-field ${!emailValid ? "invalid" : ""}`}
            type="email"
            name="Email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(e.target.value !== "");
              setErrorMessage(""); // Clear error message on change
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className={`text-field ${!passwordValid ? "invalid" : ""}`}
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(e.target.value !== "");
              setErrorMessage(""); // Clear error message on change
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className={`text-field ${!phoneNumberValid ? "invalid" : ""}`}
            type="tel"
            name="PhoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setPhoneNumberValid(e.target.value !== "");
              setErrorMessage(""); // Clear error message on change
            }}
          />
        </div>
        <p className="msgName">
          Already a Member? <Link to="/signin">Login</Link> <br />
          <br />
        </p>
        <button className="purple-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
