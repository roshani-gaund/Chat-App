import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../util/useAuthStore';
import { Mail,MessageSquare,Loader2 ,LockKeyhole} from 'lucide-react';
import { Link } from 'react-router-dom';
const Login = () => {
  
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
  const {login ,isloggingIn}=useAuthStore();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    login(formData);
  }
  return (


  <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
  <div
    className="card shadow-lg rounded-4 p-4"
    style={{ width: "100%", maxWidth: "520px"}}
  >

    {/* Header */}
    <div className="text-center mb-4">
      <div
        className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mx-auto mb-3"
        style={{ width: "60px", height: "60px" }}
      >
        <MessageSquare className="text-primary" size={28} />
      </div>

      <h3 className="fw-bold">Login Account</h3>
      <p className="text-muted">Login if you already have an account</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit}>

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
        disabled={isloggingIn}
      >
        {isloggingIn ? "Logging in..." : "Login Account"}
      </button>

      {/* Footer */}
      <p className="text-center mt-3 mb-0 text-muted">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-primary fw-semibold text-decoration-none"
        >
          Sign Up
        </Link>
      </p>
    </form>
  </div>
</div>

   
  )
}

export default Login;