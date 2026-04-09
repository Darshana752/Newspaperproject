import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigationbar.css";

export default function Navigationbar() {
  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          SERENDIB NEWS
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Links */}
          <Nav className="me-auto nav-links">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Readingnews">
              Reading News
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Writingnews">
              Writing News
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Editingnews">
              Editing News
            </Nav.Link>
          </Nav>

          {/* Right Button */}
          <Nav>
            <NavLink to="/Signup" className="signup-btn">
              Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}