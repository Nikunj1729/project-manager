import React from "react";
import { useSelector, connect } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import moment from "moment";

function ProjectDetail(props) {
  const { id } = props.match.params;
  useFirestoreConnect(["projects"]);
  const projectsMap = useSelector((state) => state.firestore.data.projects);
  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!projectsMap) {
    return null;
  }
  const project = projectsMap[id];
  if (!project) {
    return null;
  }
  const {
    title,
    content,
    authorFirstName,
    authorLastName,
    createdAt,
  } = project;
  return (
    <div className="container section project-detail pt-80">
      <div className="card mercury z-depth-0">
        <div className="card-content">
          <span className="card-title white-text">{title}</span>
          <p className="card-detail grey-text lighten-5">{content}</p>
        </div>
        <div className="card-action gret lighten-4 grey-text">
          <div>
            Posted by {authorFirstName} {authorLastName}
          </div>
          <div>{moment(createdAt).calendar()}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ProjectDetail);
