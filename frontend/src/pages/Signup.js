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
    nic: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

    // Build payload - only include nic if WRITER or EDITOR
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      nic: formData.role !== "READER" ? formData.nic : null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/register",
        payload
      );

      setIsError(false);
      setMessage(response.data || "Signup successful!");

      // redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 10500);

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Signup failed! Please try again.");
      }
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          {/* Message display */}
          {message && (
            <p style={{ color: isError ? "red" : "green" }}>{message}</p>
          )}

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
            
          </select>

          {/* NIC field - only show for WRITER or EDITOR */}
          {formData.role !== "READER" && (
            <input
              type="text"
              name="nic"
              placeholder="Enter NIC"
              value={formData.nic}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}