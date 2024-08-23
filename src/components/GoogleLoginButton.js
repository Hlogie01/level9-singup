import React from "react";
import google from "../assets/google.png";

const GoogleLoginButton = ({ login }) => {
  return (
    <button className="google-btn" onClick={login}>
      <img src={google} alt="Google Logo" />
      <p>Continue With Google</p>
    </button>
  );
};

export default GoogleLoginButton;
