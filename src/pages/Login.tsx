import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { setToken } from "../utils/sessionStorage";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      if (res?.status === 200) {
        setToken(res?.data?.token);
        navigate("/view");
      }
    } catch (err) {
      console.log("error in handleSubmit::", err);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <div>
            <h2>Login</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="d-flex justify-content-between small mt-4">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
