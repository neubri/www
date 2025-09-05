import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../lib/http";
import Button from "../components/Button";
import "../styles/style.css";
import Swal from "sweetalert2";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      Swal.fire({
        title: "You Already Logged In",
        text: "You're already logged in.",
        icon: "info",
        timer: 1800,
        showConfirmButton: false,
      });
      navigate("/cms");
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await http({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });

      console.log(response.data.access_token, "<<< ACCESS TOKEN");

      localStorage.setItem("access_token", response.data.access_token);

      navigate("/cms");

      await Swal.fire({
        title: "Success!",
        text: "Login success",
        icon: "success",
      });
    } catch (error) {
      let message = "Something went wrong";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      await Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      });
    }
  }

  return (
    <>
      {/* Main Login Section */}
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8">
              {/* Brand Header */}
              <div className="text-center mb-5">
                <div className="d-inline-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    WW
                  </div>
                  <span
                    className="fw-bold fs-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    WWW
                  </span>
                </div>
                <h1
                  className="h3 fw-bold mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#000",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Welcome Back
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Sign in to your account
                </p>
              </div>

              {/* Login Card */}
              <div
                className="card border-0 shadow-lg"
                style={{ borderRadius: "20px", overflow: "hidden" }}
              >
                {/* Card Top Border */}
                <div style={{ height: "4px" }}></div>

                <div className="card-body p-5">
                  {/* Login Form */}
                  <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                        }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          padding: "0.875rem 1.25rem",
                          fontSize: "1rem",
                          background: "#fafafa",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#000";
                          e.target.style.background = "#fff";
                          e.target.style.boxShadow =
                            "0 0 0 0.2rem rgba(0, 0, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e9ecef";
                          e.target.style.background = "#fafafa";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                        }}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          padding: "0.875rem 1.25rem",
                          fontSize: "1rem",
                          background: "#fafafa",
                          transition: "all 0.3s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#000";
                          e.target.style.background = "#fff";
                          e.target.style.boxShadow =
                            "0 0 0 0.2rem rgba(0, 0, 0, 0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e9ecef";
                          e.target.style.background = "#fafafa";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid mb-4">
                      <Button type="submit" variant="primary" text="Sign In" />
                    </div>
                  </form>
                </div>
              </div>

              {/* Footer Text */}
              <div className="text-center mt-4">
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  © {new Date().getFullYear()} WWW. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
