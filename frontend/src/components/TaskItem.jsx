import React from "react";

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1">{task.title}</h6>
          <span className="badge bg-secondary text-uppercase">
            {task.status}
          </span>
        </div>
        <div>
          {onToggle && (
            <button
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => onToggle(task._id)}
            >
              Toggle Status
            </button>
          )}
          {onDelete && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;