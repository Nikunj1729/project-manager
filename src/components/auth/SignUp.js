import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";

const SignUp = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp({ email, password, firstName, lastName });
  };

  const { auth, authError, profile } = props;

  if (auth.uid && !profile.isEmpty) return <Redirect to="/" />;

  return (
    <div className="container pt-80">
      <form onSubmit={handleSubmit} className="form mercury">
        <h5 className="white-text text-darken-3 padding-4">Sign Up</h5>
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
          <label htmlFor="password">First Name</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            className="white-text"
            value={firstName}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Last Name</label>
          <input
            type="text"
            id="lastName"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            className="white-text"
            value={lastName}
          />
        </div>
        <div className="input-field">
          <button className="btn sapphire hover z-depth-0">Sign Up</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
