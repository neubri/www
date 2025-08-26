import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../lib/http";
import Button from "../components/Button";
import "../styles/style.css";
import Swal from "sweetalert2";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  async function fetchCategories() {
    try {
      const response = await http({
        method: "GET",
        url: "/pub/categories",
      });
      setCategories(response.data || []);

      console.log(response, "<<<");
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  }

  async function fetchArticles(newPage = 1) {
    try {
      setLoading(true);
      const response = await http({
        method: "GET",
        url: "/articles",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          search,
          filter,
          sort,
          "page[number]": newPage,
          "page[size]": 8,
        },
      });

      const data = response.data;
      setArticles(data.data || []);
      setTotalPage(data.totalPage || 1);
      setPage(newPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteArticle(id) {
    try {
      const token = localStorage.getItem("access_token");

      await http({
        method: "DELETE",
        url: "/articles/" + id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Article has been deleted",
      });
      fetchArticles(page);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error?.response?.data?.message || "Something went wrong",
      });
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [search, filter, sort]);

  return (
    <div className="cms-articles-page">
      <div className="container-fluid px-4 py-4">
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
              {/* Header with filters */}
              <div className="card-header bg-white border-0 p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <h5 className="mb-0 fw-bold">Recent Articles</h5>
                  <div className="d-flex flex-nowrap gap-2">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search..."
                      style={{ maxWidth: "180px" }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                      className="form-select"
                      style={{ maxWidth: "160px" }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="form-select"
                      style={{ maxWidth: "160px" }}
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="">Sort by</option>
                      <option value="title">Title A-Z</option>
                      <option value="-title">Title Z-A</option>
                      <option value="createdAt">Oldest</option>
                      <option value="-createdAt">Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="text-muted mt-3">Loading articles...</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Article</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3">Author</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.length > 0 ? (
                          articles.map((article) => (
                            <tr key={article.id} className="border-bottom">
                              <td className="px-4 py-3">#{article.id}</td>
                              <td className="px-4 py-3">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={article.imgUrl}
                                    alt={article.title}
                                    className="rounded me-3"
                                    style={{
                                      width: "48px",
                                      height: "48px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
                                    }}
                                  />
                                  <div>
                                    <h6 className="mb-1 fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                                      {article.title.length > 50
                                        ? `${article.title.substring(0, 50)}...`
                                        : article.title}
                                    </h6>
                                    <p className="mb-0 text-muted small">
                                      {article.content
                                        ? article.content.substring(0, 60) + "..."
                                        : "No content"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="badge bg-light text-dark rounded-pill px-3">
                                  Category {article.categoryId}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-muted">Author {article.authorId}</td>
                              <td className="px-4 py-3 text-muted">{formatDate(article.createdAt)}</td>
                              <td className="px-4 py-3">
                                <div className="d-flex gap-2">
                                  <Link
                                    to={`/cms/edit/${article.id}`}
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    <i className="fas fa-edit" />
                                  </Link>
                                  <Link
                                    to={`/cms/update-image/${article.id}`}
                                    className="btn btn-sm btn-outline-primary"
                                  >
                                    <i className="fas fa-file-image" />
                                  </Link>
                                  <button
                                    onClick={() => deleteArticle(article.id)}
                                    className="btn btn-sm btn-outline-danger"
                                  >
                                    <i className="fas fa-trash" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-5">
                              <i className="fas fa-newspaper fa-3x text-muted mb-3" />
                              <h5 className="text-muted">No articles found</h5>
                              <p className="text-muted">Start by creating your first article</p>
                              <Button variant="primary" text="Create Article" />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {!loading && articles.length > 0 && totalPage > 1 && (
                <div className="card-footer bg-white py-3">
                  <nav className="d-flex justify-content-center">
                    <ul className="pagination mb-0">
                      {page > 1 && (
                        <li className="page-item">
                          <button className="page-link" onClick={() => fetchArticles(page - 1)}>
                            Previous
                          </button>
                        </li>
                      )}
                      <li className="page-item disabled">
                        <span className="page-link">Page {page}</span>
                      </li>
                      {page < totalPage && (
                        <li className="page-item">
                          <button className="page-link" onClick={() => fetchArticles(page + 1)}>
                            Next
                          </button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
