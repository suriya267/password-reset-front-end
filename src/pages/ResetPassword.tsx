import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import bcrypt from "bcryptjs";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      verifyLink();
    }
  }, []);

  const verifyLink = async () => {
    try {
      const result = await axiosInstance.get(`/auth/verify-token/${token}`);
      console.log("Error in verifyLink::", result);

      if (result?.status === 200) {
        setShowForm(true);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await axiosInstance.post(`/auth/reset-password/${token}`, {
        password: hashedPassword,
      });
      if (result.status === 200) {
        toast.success(result.data.message || "Password reset successfully!");
        setTimeout(() => {
          window.close();
        }, 2300);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Reset failed");
      setTimeout(() => {
        window.close();
      }, 2300);
    }
  };

  return (
    <>
      {" "}
      {showForm === true && (
        <Layout>
          <h3 className="text-center mb-4">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Reset Password
            </button>

            {/* <div className="text-center mt-3">
              <Link to="/login" className="text-decoration-none">
                Back to Login
              </Link>
            </div> */}
          </form>
        </Layout>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ResetPassword;
