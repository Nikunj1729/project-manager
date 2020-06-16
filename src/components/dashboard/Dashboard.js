import React from "react";
import ProjectList from "../projects/ProjectList";
import Notifications from "./Notifications";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const Dashboard = (props) => {
  useFirestoreConnect([
    {
      collection: "projects",
      limit: 6,
      orderBy: ["createdAt", "desc"],
    },
    {
      collection: "notifications",
      limit: 3,
      orderBy: ["time", "desc"],
    },
  ]);
  const projectsMap = useSelector((state) => state.firestore.data.projects);
  const notificationsMap = useSelector(
    (state) => state.firestore.data.notifications
  );
  const { auth } = props;
  if (!auth.uid) return <Redirect to="/signin" />;
  if (!projectsMap) {
    return null;
  }
  const projects = Object.keys(projectsMap).map((key) => {
    return { ...projectsMap[key], id: key };
  });
  const notifications = notificationsMap
    ? Object.keys(notificationsMap).map((key) => {
        return { ...notificationsMap[key], id: key };
      })
    : [];
  return (
    <div className="dashboard container pt-80">
      <div className="row">
        <div className="col s12 m6">
          <ProjectList projects={projects} />
        </div>
        <div className="col s12 m5 offset-m1">
          <Notifications notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
