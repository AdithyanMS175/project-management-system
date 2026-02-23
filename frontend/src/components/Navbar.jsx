import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-4">
            <span className="navbar-brand">Project Manager</span>

            <div className="d-flex align-items-center text-white">
                <span className="me-3">
                    {user?.email} ({user?.role})
                </span>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;