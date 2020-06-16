import React from "react";

const ProjectSummary = ({ project }) => {
  const { title, content, authorFirstName, authorLastName } = project;
  return (
    <div className="card mercury z-depth-0 project-summary">
      <div className="card-content">
        <span className="card-title white-text text-darken-3">{title}</span>
        <p className="grey-text text-lighten-1">
          Posted by {authorFirstName} {authorLastName}
        </p>
        <p className="grey-text text-lighten-3">{content}</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
