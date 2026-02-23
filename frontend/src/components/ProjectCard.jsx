import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title">{project.name}</h5>
        <p className="card-text">{project.description}</p>
        {project.status && (
          <p className="card-text">
            <span className="badge bg-info text-dark text-uppercase">
              {project.status}
            </span>
          </p>
        )}
        {project.assignedTo && user?.role === "admin" && (
          <p className="card-text">
            <small className="text-muted">
              Assigned To: {project.assignedTo}
            </small>
          </p>
        )}

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate(`/project/${project._id}`)}
        >
          View Tasks
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;