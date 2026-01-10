import React, { use } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User, Mail, LockKeyhole, Loader2 } from 'lucide-react';
import { useAuthStore } from '../util/useAuthStore';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
 const {signup,isSignup} =useAuthStore();
 

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success===true ) signup(formData);
  }

  return (
    <>
     <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
  <div className="card shadow-lg p-4 rounded-4" style={{ width: "100%", maxWidth: "520px" }}>

    {/* Header */}
    <div className="text-center mb-4">
      <div
        className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mx-auto mb-3"
        style={{ width: "60px", height: "60px" }}
      >
        <MessageSquare className="text-primary" size={28} />
      </div>

      <h3 className="fw-bold">Create Account</h3>
      <p className="text-muted">Get started with free account</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit}>

      {/* Username */}
      <div className="mb-3">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <User size={18} className="text-secondary" />
          Username
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <Mail size={18} className="text-secondary" />
          Email
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <LockKeyhole size={18} className="text-secondary" />
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="btn btn-primary w-100 py-2"
        disabled={isSignup}
      >
        {isSignup ? "Creating Account..." : "Create Account"}
      </button>

      {/* Footer */}
      <p className="text-center mt-3 mb-0 text-muted">
        Already have an account?{" "}
        <Link to="/login" className="text-primary fw-semibold text-decoration-none">
          Sign in
        </Link>
      </p>

    </form>
  </div>
</div>


    </>
  )
};

export default Signup;