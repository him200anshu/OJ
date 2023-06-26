import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (response.data.status === "exist") {
        alert("User already exists");
      } else if (response.data.status === "success") {
        navigate("/home", { state: { id: email } });
      }
    } catch (e) {
      alert("wrong details");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>

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

      <br />
      <p>OR</p>
      <br />

      <Link to="/">Login Page</Link>
    </div>
  );
}

export default Signup;
