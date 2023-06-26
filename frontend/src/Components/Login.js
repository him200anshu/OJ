import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/", {
        email,
        password,
      });

      if (response.data.status === "success") {
        navigate("/home", { state: { id: response.data.userId } }); // Correct login, redirect to homepage
      } else if (response.data.status === "notexist") {
        setErrorMessage("User has not signed up."); // User not found
      } else if (response.data.status === "incorrect_password") {
        setErrorMessage("Incorrect password."); // Incorrect password
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while processing your request.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form action="POST">
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <br />
      <p>OR</p>
      <br />

      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
