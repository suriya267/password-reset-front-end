import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { clearToken } from "../utils/sessionStorage";

interface User {
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  mobile_number: string;
  email: string;
}

const View: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axiosInstance.get("/auth/me");
        if (result?.status === 200) {
          setUser(result?.data?.user);
        }
      } catch (err) {
        console.log("Error in get users::", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    clearToken(); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">User Profile</h3>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger btn-sm"
        >
          Logout
        </button>
      </div>

      {user ? (
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Name:</strong> {user?.first_name} {user?.last_name}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {user?.email}
          </li>
          <li className="list-group-item">
            <strong>Mobile:</strong> {user?.mobile_number}
          </li>
          <li className="list-group-item">
            <strong>Gender:</strong> {user?.gender}
          </li>
          <li className="list-group-item">
            <strong>DOB:</strong>{" "}
            {user?.dob && new Date(user?.dob).toLocaleDateString()}
          </li>
        </ul>
      ) : (
        <p>Loading user data...</p>
      )}
    </Layout>
  );
};

export default View;
