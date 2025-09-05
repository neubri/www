import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import http from "../lib/http";
// import "../styles/style.css";

export const ArticleDetail = () => {
  const { id } = useParams(); // Get the article ID from URL
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch single article
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const response = await http({
          method: "GET",
          url: `/pub/articles/${id}`, // Assuming your API endpoint for single article
        });
        console.log(response, "<<< single article data");
        setArticle(response.data); // Direct access since your API returns the article object directly
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Article not found or failed to load");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Tunggu bentar brooo...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h3 className="text-danger">Article Not Found</h3>
          <p className="text-muted">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button
                onClick={() => navigate("/")}
                className="btn btn-link p-0 text-decoration-none"
                style={{ color: "#666", fontSize: "0.9rem" }}
              >
                Home
              </button>
            </li>
            <li
              className="breadcrumb-item active"
              aria-current="page"
              style={{ color: "#999", fontSize: "0.9rem" }}
            >
              Article
            </li>
          </ol>
        </nav>
      </div>

      {/* Article Content */}
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <article className="article-detail-content">
              {/* Article Title */}
              <header className="text-center mb-5">
                <h1
                  className="article-title mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    color: "#000",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="article-meta mb-4">
                  <span
                    className="text-muted"
                    style={{ fontSize: "0.9rem", fontWeight: "500" }}
                  >
                    Published{" "}
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="mb-5">
                <img
                  src={article.imgUrl}
                  className="img-fluid w-100"
                  alt={article.title}
                  style={{
                    borderRadius: "16px",
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                  }}
                />
              </figure>

              {/* Article Body */}
              <div
                className="article-body mb-5"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#333",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {article.content?.split("\n").map(
                  (paragraph, index) =>
                    paragraph.trim() && (
                      <p
                        key={index}
                        className="mb-4"
                        style={{ textAlign: "justify" }}
                      >
                        {paragraph}
                      </p>
                    )
                )}
              </div>

              {/* Social Share */}
              <div className="text-center mb-5">
                <div
                  className="d-inline-flex align-items-center gap-3 p-3"
                  style={{
                    background: "#f8f9fa",
                    borderRadius: "16px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <span
                    className="text-muted me-2"
                    style={{ fontSize: "0.9rem", fontWeight: "500" }}
                  >
                    Share:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link p-2"
                    style={{ color: "#666" }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link p-2"
                    style={{ color: "#666" }}
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href={`https://wa.me/?text=${article.title} ${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link p-2"
                    style={{ color: "#666" }}
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <button
                    className="btn btn-link p-2"
                    style={{ color: "#666" }}
                    onClick={() =>
                      navigator.clipboard.writeText(window.location.href)
                    }
                  >
                    <i className="fas fa-link"></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Back Button */}
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate("/")}
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
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
