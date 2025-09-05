import { Link } from "react-router";
import "../styles/style.css";

export const ArticleCard = (props) => {
  const { article } = props;

  // Format date from article data
  const formatDate = (dateString) => {
    if (!dateString) return "22 MAY 2024"; // fallback
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  // Mock categories for demonstration - you can replace with actual data from your API

  const date = formatDate(article.createdAt);

  return (
    <div key={article.id} className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="position-relative">
          <img
            src={article.imgUrl}
            className="card-img-top"
            alt={article.title}
            style={{ height: "220px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text text-muted small mb-3">
            {article.content ? article.content.slice(0, 100) : 'No content available'}...
          </p>
          <div className="mt-auto">
            <div className="d-flex justify-content-end align-items-center mb-3">
              <small className="text-muted">{date}</small>
            </div>
            <Link
              to={`/articles/${article.id}`}
              className="btn btn-sm btn-primary w-100"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
