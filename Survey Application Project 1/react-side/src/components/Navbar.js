import React from "react";

import "./Nav.css";
export default function Navbar() {
  return (
    <div id="nav-div" >
      <div id="div1">
        <nav className="displayflex">
          <a className="home-nav" href="/">Home</a>
          <div className="signup-login">
            <a className="signin-nav" href="/signup">Signin</a>
            <a className="login-nav" href="/login">Login</a>
          </div>
        </nav>
      </div>
    </div>
  );
}