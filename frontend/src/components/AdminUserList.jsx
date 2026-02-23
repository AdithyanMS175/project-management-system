import React, { useEffect, useState } from "react";
import { getUsersAPI, deleteUserAPI } from "../services/allAPI";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";

  const fetchUsers = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getUsersAPI(reqHeader);
      if (result.status === 200) {
        setUsers(result.data.users || []);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await deleteUserAPI(userId, reqHeader);
      if (result.status === 200) {
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="mt-4">
      <h4>Users</h4>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;

