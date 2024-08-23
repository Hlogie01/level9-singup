import React from "react";
import Logo from "./components/Logo";
import GoogleLoginButton from "./components/GoogleLoginButton";
import SignupForm from "./components/SignupForm";
import { useGoogleLogin } from "@react-oauth/google";
import background from "./assets/Image.png";
import { useDispatch } from "react-redux";
import { googleLogin, setFeedbackMessage } from "./features/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const code = tokenResponse.code;
      if (!code) {
        dispatch(
          setFeedbackMessage(
            "Google login failed: Empty authorization code received."
          )
        );
        return;
      }

      dispatch(googleLogin({ code }))
        .unwrap()
        .then(() => {
          dispatch(setFeedbackMessage("Google login successful!"));
        })
        .catch((error) => {
          dispatch(setFeedbackMessage(error.message || "Google login failed!"));
        });
    },
    onError: (error) => {
      dispatch(setFeedbackMessage("Google login failed!"));
    },
    flow: "auth-code",
  });

  return (
    <div className="container">
      <div className="card">
        <div className="card-left">
          <Logo />
          <div className="card-content">
            <h2 className="heading">SIGN UP</h2>
            <p className="subheading">Create an account to get started.</p>
            <GoogleLoginButton login={login} />
            <div className="divider">
              <hr />
              <span>Or</span>
              <hr />
            </div>
            <SignupForm />
            <p className="subheading">
              Already have an account?{" "}
              <a className="login-link" href="{}">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="card-right">
          <img className="background-image" src={background} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default App;
