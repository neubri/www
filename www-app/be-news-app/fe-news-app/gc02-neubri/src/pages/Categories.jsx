import { useEffect, useState } from "react";
import http from "../lib/http";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await http({
        method: "GET",
        url: "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response, "<<< dari categories");
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {/* Page Header */}
            <div className="text-center mb-5">
              <h1
                className="cms-page-title"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: "700",
                  color: "#000",
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                News Categories
              </h1>
              <p
                className="text-muted"
                style={{ fontSize: "1.1rem", fontWeight: "400" }}
              >
                Manage your content categories
              </p>
            </div>

            {/* Categories Card */}
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Card Header */}
              <div className="card-header bg-white border-0 p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5
                      className="mb-0 fw-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      All Categories
                    </h5>
                    <p className="text-muted small mb-0 mt-1">
                      {categories.length} total categories
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Loading categories...</p>
                  </div>
                ) : categories.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 fw-600 text-center"
                            style={{
                              fontSize: "0.85rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              color: "#666",
                              width: "100px",
                            }}
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 fw-600 text-center"
                            style={{
                              fontSize: "0.85rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                              color: "#666",
                            }}
                          >
                            Category Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr
                            key={category.id}
                            className="align-middle text-center"
                          >
                            <td className="px-4 py-3">
                              <span
                                className="badge bg-light text-dark"
                                style={{
                                  borderRadius: "20px",
                                  padding: "0.5rem 0.75rem",
                                  fontSize: "0.85rem",
                                  fontWeight: "600",
                                }}
                              >
                                {index + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <h6
                                className="mb-0 fw-600"
                                style={{
                                  fontSize: "1rem",
                                  color: "#000",
                                  fontFamily: "'Inter', sans-serif",
                                }}
                              >
                                {category.name}
                              </h6>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i
                      className="fas fa-folder-open fa-3x text-muted mb-3"
                      style={{ opacity: 0.3 }}
                    ></i>
                    <h5 className="text-muted">No categories found</h5>
                    <p className="text-muted mb-4">
                      Get started by creating your first category
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{
                        borderRadius: "12px",
                        padding: "0.75rem 2rem",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        background: "#000",
                        border: "none",
                      }}
                    >
                      Create Category
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-dark"
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
