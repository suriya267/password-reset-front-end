import React, { useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/auth/send-link", { email });
      toast.success(result?.data?.message);
      setEmail("");
      setTimeout(()=> navigate("/login"),2300)
    } catch (err: any) {
      console.log("Error in handleSubmit::", err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <h2>Forgot Password</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </Layout>
  );
};

export default ForgotPassword;
