import React, { useState } from "react";
import { signIn } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const SignIn = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({ email, password });
  };
  const { authError, auth } = props;

  if (auth.uid) return <Redirect to="/" />;

  return (
    <div className="container pt-80">
      <form onSubmit={handleSubmit} className="form mercury">
        <h5 className="white-text text-darken-3 padding-4">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            className="white-text"
            value={email}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="white-text"
            value={password}
          />
        </div>
        <div className="input-field">
          <button className="btn sapphire hover z-depth-0">Login</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { authError: state.auth.authError, auth: state.firebase.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
