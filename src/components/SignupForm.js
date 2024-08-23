import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setRememberMe,
  resetForm,
  setFeedbackMessage,
  registerUser,
} from "../features/authSlice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { name, email, password, rememberMe, feedbackMessage } = useSelector(
    (state) => state.signup
  );
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    else if (password.length >= 6 && password.length < 12) return "Moderate";
    else return "Strong";
  };

  const checkPasswordUniqueness = (password) => {
    const commonPasswords = [
      "123456",
      "password",
      "123456789",
      "12345678",
      "12345",
    ];
    return !commonPasswords.includes(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    dispatch(setPassword(newPassword));
    const strength = evaluatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const strength = evaluatePasswordStrength(password);
    const isUnique = checkPasswordUniqueness(password);
    if (strength === "Weak" || !isUnique) {
      setPasswordError("Please choose a stronger and unique password.");
      return;
    }
    dispatch(registerUser({ name, email, password, rememberMe }))
      .unwrap()
      .then(() => dispatch(resetForm()))
      .catch((error) =>
        dispatch(setFeedbackMessage(error.message || "Registration failed!"))
      );
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        id="name"
        name="name"
        autoComplete="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
        required
      />
      <input
        id="email"
        name="email"
        autoComplete="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
        required
      />
      <input
        id="password"
        name="password"
        autoComplete="new-password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        required
      />
      <p className={`password-strength ${passwordError ? "error" : ""}`}>
        {passwordError ? (
          <span>{passwordError}</span>
        ) : isPasswordFocused ? (
          `Password strength: ${passwordStrength}`
        ) : null}
      </p>
      <div className="remember-me">
        <input
          id="remember-me"
          name="remember-me"
          autoComplete="off"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => dispatch(setRememberMe(e.target.checked))}
        />
        <label htmlFor="remember-me">Remember Me</label>
      </div>
      <button className="submit-btn" type="submit">
        Register
      </button>
      <p className="feedback-message">{feedbackMessage}</p>
    </form>
  );
};

export default SignupForm;
