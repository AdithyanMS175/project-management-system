import React, { useState } from "react";
import { loginAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);

            const result = await loginAPI(formData);

            if (result.status === 200) {

                alert("Login Successful");

                // Store token
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));

                navigate("/dashboard");
            }

        } catch (error) {
            console.log(error);

            if (error.response.status === 401) {
                alert("Incorrect Credentials");
            } else if (error.response?.status === 404) {
                alert("Account does not exist");
            } else {
                alert("Something Went Wrong. Try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Login</h3>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <small className="text-danger">{errors.email}</small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <small className="text-danger">{errors.password}</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-2"
                        onClick={() => navigate("/register")}
                    >
                        Go to Register
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;