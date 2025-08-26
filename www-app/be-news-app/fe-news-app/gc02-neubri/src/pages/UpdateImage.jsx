import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import http from "../lib/http";
import Button from "../components/Button";

export function UpdateImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  // Fetch current article image (optional)
  const fetchImage = async () => {
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
      setImgUrl(article.imgUrl || "");
    } catch (error) {
      console.error("Error fetching article:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch article data",
      }).then(() => navigate("/cms"));
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchImage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      await Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please select an image to upload",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("imageURL", selectedFile); // 🔧 gunakan field yang sesuai

      await http({
        method: "PATCH",
        url: `/articles/${id}/img-url`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image updated successfully!",
      }).then(() => navigate("/cms"));
    } catch (error) {
      console.error("Error updating image:", error);
      await Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6 col-sm-8 col-11">
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
                <i className="fas fa-image"></i>
              </div>
              <h1
                className="h2 fw-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#000",
                  letterSpacing: "-0.01em",
                }}
              >
                Update Article Image
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                Upload a new image for your article
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
              <div className="card-body p-4">
                {initialLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Loading image...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Current Image Preview */}
                    {imgUrl && (
                      <div className="text-center mb-4">
                        <p className="text-muted small mb-2">Current Image:</p>
                        <img
                          src={imgUrl}
                          alt="Current"
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "200px",
                            maxWidth: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    )}

                    {/* File Input */}
                    <div className="mb-4">
                      <label className="form-label fw-600 text-uppercase"
                        style={{
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px",
                          color: "#333",
                        }}>
                        Choose New Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        accept="image/*"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          padding: "0.875rem 1.25rem",
                          fontSize: "1rem",
                        }}
                      />
                      {selectedFile && (
                        <p className="text-success small mt-2">
                          Selected: {selectedFile.name}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading || !selectedFile}
                        style={{
                          background: loading ? "#ccc" : "#000",
                          border: "none",
                          borderRadius: "12px",
                          padding: "1rem 2rem",
                          fontSize: "1rem",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-upload me-2"></i>
                            Update Image
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
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
