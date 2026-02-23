import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteProjectAPI } from "../services/allAPI";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this project?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    await deleteProjectAPI(project._id, reqHeader);

    alert("Project deleted successfully");

    // Reload page OR trigger parent refresh (better way)
    window.location.reload();

  } catch (error) {
    console.log(error);
    alert("Failed to delete project");
  }
};

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

        {user?.role === "admin" && (
          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;