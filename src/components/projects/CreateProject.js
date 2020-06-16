import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject } from "../../store/actions/projectActions";

const CreateProject = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createProject({ title, content });
    props.history.push("/");
  };

  return (
    <div className="container pt-80">
      <form onSubmit={handleSubmit} className="form mercury">
        <h5 className="white-text text-darken-3 padding-4">Create Project</h5>
        <div className="input-field">
          <label htmlFor="email">Title</label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            className="white-text"
            value={title}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Content</label>
          <textarea
            type="text"
            id="content"
            autoComplete="off"
            onChange={(e) => setContent(e.target.value)}
            className="white-text materialize-textarea"
            value={content}
          />
        </div>
        <div className="input-field">
          <button className="btn sapphire hover z-depth-0">Create</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
