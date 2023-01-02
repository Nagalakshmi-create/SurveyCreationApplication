// import Axios from "axios";
import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";
const Signin = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
  });
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  const showToastMessage = () => {
    toast.success("Sign in Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessage1 = () => {
    toast.success('Email already exists !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  const [errorMessage, setErrorMessage] = useState("");
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Not strong password");
    }
  };
  const url = "http://localhost:9000/signin";
  function submit(e) {
    e.preventDefault();
    if (
      data.fname !== "" &&
      data.lname !== "" &&
      data.email !== "" &&
      data.password !== "" 
    ) {
      axios
        .post(url, {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          role: data.role,
        })
        .then((res) => {
          console.log(res.data.exits)
          if(res.data.exists === 'True'){
            console.log("ui if")
            showToastMessage1()
          }else{
            console.log("ui else")
            showToastMessage();
            navigate("/login");
          }
        });
    } else {
      toast.error("Please enter all details !", {
        position: toast.POSITION.TOP_CENTER,
      });
      e.preventDefault();
    }
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  return (
    <div className="signin-form">
      <h1 id="heading">Sign Up</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          type="text"
          id="fname"
          placeholder="First Name"
          className="sign-input"
          value={data.fname}
          required
        />
        <br />
        <br />
        <br></br>
        <input
          onChange={(e) => handle(e)}
          type="text"
          id="lname"
          placeholder="Last Name"
          className="sign-input"
          value={data.lname}
          required
        />
        <br />
        <br /> <br></br>
        <input
          onChange={(e) => {
            handle(e);
            validateEmail(e);
          }}
          type="email"
          id="email"
          placeholder="Email"
          className="sign-input"
          value={data.email}
          required
        />
        <br />
        <br />
        <span style={{ fontWeight: "bold", color: "red" }}>
          {emailError}
        </span>{" "}
        <br></br>
        <input
          onChange={(e) => {
            handle(e);
            validate(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
          className="sign-input"
          value={data.password}
          required
        />
        <br />
        <br />
        {errorMessage === "" ? null : (
          <span style={{ fontWeight: "bold", color: "red" }}>
            {errorMessage}
          </span>
        )}{" "}
        <br/>
        <button type="submit" id="sign-btn" className="btn btn-size">
          Sign in
        </button>
      </form>
    </div>
  );
};
export default Signin;
