import React, { useEffect, useState } from "react";
import { createProjectAPI, getProjectsAPI, getUsersAPI } from "../services/allAPI";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Pagination from "../components/Pagination";
import AdminUserList from "../components/AdminUserList";

const Dashboard = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [projectData, setProjectData] = useState({
        name: "",
        description: "",
        assignedTo: "",
    });
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        setProjectData({
            ...projectData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddProject = async () => {

        if (!projectData.name.trim()) {
            alert("Project name required");
            return;
        }

        try {
            const reqHeader = { Authorization: `Bearer ${token}` };

            const payload = {
                name: projectData.name,
                description: projectData.description,
                assignedTo: projectData.assignedTo || null,
            };

            const result = await createProjectAPI(payload, reqHeader);

            if (result.status === 201) {
                alert("Project Created Successfully");

                setProjectData({ name: "", description: "", assignedTo: "" });
                setShowModal(false);
                fetchProjects(); 
            }

        } catch (error) {
            alert("Failed to create project");
        }
    };

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const reqHeader = { Authorization: `Bearer ${token}` };

            const result = await getProjectsAPI(currentPage, reqHeader);

            if (result.status === 200) {
                setProjects(result.data.projects);
                setTotalPages(result.data.totalPages);
            }

        } catch (error) {
            console.log(error);
            alert("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        if (!user || user.role !== "admin") return;
        try {
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await getUsersAPI(reqHeader);
            if (result.status === 200) {
                setUsers(result.data.users || []);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchProjects();
        if (user?.role === "admin") {
            fetchUsers();
        }
    }, [currentPage]);

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                {showModal && (
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Project</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label className="form-label">Project Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={projectData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={projectData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Assign To</label>
                                        <select
                                            className="form-select"
                                            name="assignedTo"
                                            value={projectData.assignedTo}
                                            onChange={handleChange}
                                        >
                                            <option value="">Unassigned</option>
                                            {users.map((u) => (
                                                <option key={u._id} value={u._id}>
                                                    {u.name} ({u.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAddProject}
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Project Dashboard</h3>

                    {user?.role === "admin" && (
                        <button onClick={() => setShowModal(true)} className="btn btn-success">
                            Add Project
                        </button>
                    )}
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="row">
                        {projects.length > 0 ? (
                            projects.map((item) => (
                                <div className="col-md-4 mb-3" key={item._id}>
                                    <ProjectCard project={item} />
                                </div>
                            ))
                        ) : (
                            <p>No Projects Found</p>
                        )}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

            </div>

            {user?.role === "admin" && (
                <div className="container">
                    <AdminUserList />
                </div>
            )}
        </>
    );
};

export default Dashboard;