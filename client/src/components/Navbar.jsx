import { useNavigate } from "react-router";
import Button from "./Button";
import "../styles/style.css";

export const Navbar = () => {
  const navigate = useNavigate()


  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <div className="d-flex align-items-center justify-content-center bg-dark text-white rounded-circle me-2"
               style={{ width: "32px", height: "32px", fontSize: "14px", fontWeight: "bold" }}>
            WW
          </div>
          <span className="fw-bold">WWW</span>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">POLITICS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">TECHNOLOGY</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">ECONOMY</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">FASHION</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">CULTURE</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-500" href="#">ENVIRONMENT</a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Button
              variant="primary"
              size="sm"
              text="Sign In"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
      
    </nav>
  );
};
