import React, { useState } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "READER",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", formData);

      setMessage("Signup successful!");

      // redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setMessage("Signup failed!");
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          {message && <p>{message}</p>}

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Role Selection */}
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="READER">Reader</option>
            <option value="WRITER">Writer</option>
            <option value="EDITOR">Editor</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}