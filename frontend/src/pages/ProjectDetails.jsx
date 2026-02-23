import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import {
  getTasksAPI,
  addTaskAPI,
  deleteTaskAPI,
  toggleTaskAPI,
} from "../services/allAPI";

const ProjectDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token") || "";
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectStatus, setProjectStatus] = useState("todo");

  const buildAuthHeader = () =>
    token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

  const fetchTasks = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const reqHeader = buildAuthHeader();
      const result = await getTasksAPI(id, reqHeader);

      if (result.status === 200) {
        setTasks(result.data.tasks || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    try {
      const reqHeader = buildAuthHeader();
      const result = await addTaskAPI(
        id,
        { title: newTask.trim() },
        reqHeader
      );
      if (result.status === 201) {
        setNewTask("");
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTaskAPI(taskId, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const handleToggle = async (taskId) => {
    try {
      await toggleTaskAPI(taskId, token);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h3>Project Tasks</h3>
        <Link className="btn btn-secondary" to={'/dashboard'}>Back To Home</Link>
        <div className="mb-3">
          <label className="form-label">Project Status</label>
          <select
            className="form-select"
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
            disabled={!user || user.role !== "user"}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {user?.role === "admin" && (
          <div className="d-flex mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddTask}>
              Add
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={user?.role === "admin" ? handleDelete : undefined}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;