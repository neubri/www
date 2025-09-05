import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import http from "../lib/http";
import Swal from "sweetalert2";

export default function FormArticle({ type }) {
  const { id } = useParams(); // Fixed: was userParams()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const navigate = useNavigate();

  const isEditMode = type === "edit";

  // Fetch categories for dropdown
  async function fetchCategories() {
    try {
      const response = await http({
        method: "GET", // Fixed: should be GET for fetching categories
        url: "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch categories",
      });
    }
  }

  // Fetch article data for editing
  async function fetchArticle() {
    if (!isEditMode || !id) return;

    try {
      setInitialLoading(true);
      const response = await http({
        method: "GET",
        url: `/articles/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const article = response.data.data || response.data;
      setTitle(article.title || "");
      setContent(article.content || "");
      setImgUrl(article.imgUrl || "");
      setCategoryId(
        article.categoryId?.toString() || article.Category?.id?.toString() || ""
      );
    } catch (error) {
      console.error("Error fetching article:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch article data",
      }).then(() => {
        navigate("/cms");
      });
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchArticle();
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const requestData = {
        title: title.trim(),
        content: content.trim(),
        imgUrl:
          imgUrl.trim() ||
          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoryId: parseInt(categoryId),
      };

      const response = await http({
        method: isEditMode ? "PUT" : "POST",
        url: isEditMode ? `/articles/${id}` : "/articles",
        data: requestData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(
        response,
        `<<< ${isEditMode ? "update" : "create"} article response`
      );

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: `Article ${isEditMode ? "updated" : "created"} successfully`,
      });

      navigate("/cms");
    } catch (error) {
      let message = "Something went wrong";
      if (error && error.response && error.response.data) {
        message = error.response.data.message;
      }

      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching article data for edit
  if (initialLoading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "#f8f9fa" }}
      >
        <div className="text-center">
          <div className="spinner-border text-dark mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading article data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-11">
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
                <i
                  className={`fas ${isEditMode ? "fa-edit" : "fa-newspaper"}`}
                ></i>
              </div>
              <h1
                className="h2 fw-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
              >
                {isEditMode ? "Edit Article" : "Create New Article"}
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                {isEditMode
                  ? "Update your article content"
                  : "Share your story with the world"}
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
                  {/* Title Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label
                        htmlFor="article-title"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                          margin: 0,
                        }}
                      >
                        Article Title
                      </label>
                      <span
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                      >
                        *
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="article-title"
                      placeholder="Enter article title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}

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

                  {/* Content Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label
                        htmlFor="article-content"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                          margin: 0,
                        }}
                      >
                        Article Content
                      </label>
                      <span
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                      >
                        *
                      </span>
                    </div>
                    <textarea
                      className="form-control"
                      id="article-content"
                      rows={8}
                      placeholder="Write your article content here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}

                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        padding: "0.875rem 1.25rem",
                        fontSize: "1rem",
                        background: "#fafafa",
                        transition: "all 0.3s ease",
                        resize: "vertical",
                        minHeight: "200px",
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

                  {/* Category Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label
                        htmlFor="article-category"
                        className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                          margin: 0,
                        }}
                      >
                        Category
                      </label>
                      <span
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                      >
                        *
                      </span>
                    </div>
                    <select
                      className="form-select"
                      id="article-category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}

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
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image URL Field */}
                  <div className="mb-5">
                    <label
                      htmlFor="article-image"
                      className="form-label fw-600 text-uppercase mb-2"
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.5px",
                        color: "#333",
                      }}
                    >
                      Featured Image URL{" "}
                      <span className="text-muted fw-normal">(optional)</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      id="article-image"
                      placeholder="https://example.com/image.jpg"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
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
                    <div
                      className="form-text text-muted mt-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      Leave empty to use default placeholder image
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      disabled={loading}
                      style={{
                        background: loading ? "#ccc" : "#000",
                        border: "none",
                        borderRadius: "12px",
                        padding: "1rem 2rem",
                        fontSize: "1rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        transition: "all 0.3s ease",
                        cursor: loading ? "not-allowed" : "pointer",
                      }}
                      onMouseOver={(e) => {
                        if (!loading) {
                          e.target.style.background = "#333";
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 8px 25px rgba(0, 0, 0, 0.2)";
                        }
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = loading ? "#ccc" : "#000";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {isEditMode ? "Updating..." : "Creating..."}
                        </>
                      ) : (
                        <>
                          <i
                            className={`fas ${
                              isEditMode ? "fa-save" : "fa-plus"
                            } me-2`}
                          ></i>
                          {isEditMode ? "Update Article" : "Create Article"}
                        </>
                      )}
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
