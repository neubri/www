import http from "../lib/http";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function AddStaff() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http({
        method: "POST",
        url: "/add-user",
        data: {
          email,
          password,
          phoneNumber,
          address,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response, "<<< add staff response");

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Staff added successfully",
      });

      navigate("/cms");
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
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            {/* Page Header */}
            <div className="text-center mb-5">
              <div
                className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                <i className="fas fa-user-plus"></i>
              </div>
              <h1
                className="h2 fw-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
              >
                Add New Staff
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                Create a new staff account
              </p>
            </div>

            {/* Form Card */}
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label
                        htmlFor="addstaff-email"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                          margin: 0,
                        }}
                      >
                        Email Address
                      </label>
                      <span
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                      >
                        *
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      id="addstaff-email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

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
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label
                        htmlFor="addstaff-password"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                          margin: 0,
                        }}
                      >
                        Password
                      </label>
                      <span
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                      >
                        *
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="addstaff-password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}

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

                  {/* Phone Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="addstaff-phone"
                      className="form-label fw-600 text-uppercase mb-2"
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        color: "#333",
                      }}
                    >
                      Phone Number{" "}
                      <span className="text-muted fw-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addstaff-phone"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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

                  {/* Address Field */}
                  <div className="mb-5">
                    <label
                      htmlFor="addstaff-address"
                      className="form-label fw-600 text-uppercase mb-2"
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        color: "#333",
                      }}
                    >
                      Address{" "}
                      <span className="text-muted fw-normal">(optional)</span>
                    </label>
                    <textarea
                      id="addstaff-address"
                      className="form-control"
                      rows={3}
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        padding: "0.875rem 1.25rem",
                        fontSize: "1rem",
                        background: "#fafafa",
                        transition: "all 0.3s ease",
                        resize: "vertical",
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
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      style={{
                        background: "#000",
                        border: "none",
                        borderRadius: "12px",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = "#333";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 8px 25px rgba(0, 0, 0, 0.2)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = "#000";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      Create Staff
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/cms")}
                style={{
                  borderRadius: "25px",
                  padding: "0.75rem 2rem",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  border: "2px solid #000",
                }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
