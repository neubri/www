import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "../styles/style.css";

export const NavbarCms = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/cms">
          <div
            className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle me-2"
            style={{
              width: "32px",
              height: "32px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            CMS
          </div>
          <span className="fw-bold">WWW</span>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cmsNavbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="cmsNavbarNav">
          {/* Main Navigation */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link fw-500" href="/cms/add">
                <i className="fas fa-newspaper me-2"></i>
                Add Articles
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="/cms/add-staff">
                <i className="fas fa-user-plus me-2"></i>
                Add Staff
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="/cms/categories">
                <i className="fas fa-tags me-2"></i>
                Categories
              </a>
            </li>
          </ul>

          {/* Auth Actions */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                text="Sign In"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
