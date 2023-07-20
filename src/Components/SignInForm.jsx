import React, {useState} from "react";
import logoImage from "./logo.png";
import {Link, useNavigate} from "react-router-dom";
import "./Form.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();

    setEmailValid(email !== "");
    setPasswordValid(password !== "");

    if (!emailValid || !passwordValid) {
      setErrorMessage("Empty fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/UserSignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });
      // If login was successful
      if (response.ok) {
        // Save the authentication status in the session
        sessionStorage.setItem("isAuthenticated", true);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Sign In Successful");
      setSuccessMessage("Sign In Successful");

      // Set the authentication flag in session storage
      sessionStorage.setItem("isAuthenticated", true);
      // Redirect the user to the dashboard page
      navigate("/dashboard");

      // Only clear the fields if the fetch request was successful
      setEmail("");
      setPassword("");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error(error);
      setErrorMessage("Incorrect Email or Password!!");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="centered-form">
      <img src={logoImage} alt="Logo" />
      <h1>Sign In</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSignIn}>
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
              setSuccessMessage(""); // Clear success message on change
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
              setSuccessMessage(""); // Clear success message on change
            }}
          />
        </div>
        <p className="msgName">
          Not a Member? <Link to="/signup">Go to Sign Up</Link>
          <br />
          <br />
        </p>
        <button className="purple-button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
