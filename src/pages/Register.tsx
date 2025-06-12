import React, { useState } from "react";
import Layout from "../components/Layout";
import axiosInstance from "../utils/axios";
import { setToken } from "../utils/sessionStorage";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "male",
    mobile_number: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }
    e.preventDefault();
    try {
      const { confirm_password, ...rest } = formData;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const payload = {
        ...rest,
        password: hashedPassword,
      };

      const result = await axiosInstance.post("/auth/register", payload);
      if (result?.status === 201) {
        setToken(result?.data.token);
        navigate("/view");
      }
    } catch (err) {
      console.log("Error in handleSubmit::", err);
    }
  };

  return (
    <Layout>
      <h3 className="text-center mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        {/* First Row - First & Last Name */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Other fields stacked */}
        <div className="row">
          <div className="mb-3 col-6">
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-6">
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          {error && <small className="text-danger">{error}</small>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">
            Already have an account? Login
          </a>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
