import { Link, Navigate, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { NavbarCms } from "../components/NavbarCMS";
import { Footer } from "../components/Footer";

export default function MainLayout() {
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "You have to login",
        icon: "error",
      });

      navigate("/login");
    }
  }, []);

  return (
    <>
      <NavbarCms />

      <Outlet />

      <Footer />
    </>
  );
}
