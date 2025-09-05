import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import http from "../lib/http";
import Swal  from "sweetalert2";

export function Home() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      Swal.fire({
        title: "You Already Logged In",
        text: "You're already logged in.",
        icon: "info",
        timer: 1800,
        showConfirmButton: false,
      });
      navigate("/cms");
    }
  }, []);

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

  async function fetchArticles(newPage) {
    try {
      const response = await http({
        method: "GET",
        url: "/pub/articles",
        params: {
          search,
          filter,
          sort,
          "page[number]": newPage,
          "page[size]": 6,
        },
      });

      setArticles(response.data.data || []);
      setPage(newPage);
      setTotalPage(response.data.totalPage || 1);
    } catch (error) {
      console.log("Error fetching articles", error);
    }
  }

  // Fetch articles when filters change
  useEffect(() => {
    fetchArticles(1);
  }, [search, filter, sort]);

  // Fetch on page change
  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container my-4">
      {/* Filter Navbar */}

      <div className="row justify-content-center">
        <div className="col-lg-10 text-center hero-content">
          <h1 className="hero-title">
            EMPOWERING A <span className="hero-highlight">NE-WWW</span>{" "}
            GENERATION
            <br />
            CREATIVE THINKERS
          </h1>

          <p className="hero-subtitle">
            EXPLORE THE STORIES THAT SHAPE CULTURE, REDEFINE CREATIVITY AND
            IGNITE CONVERSATIONS. WWW IS WHERE TODAY'S VOICES CONNECT AND
            THRIVE.
          </p>

          <p className="text-muted small">
            FROM THE LATEST TRENDS TO IMMERSIVE DESIGNS AND EVENTS
          </p>
        </div>
      </div>

      <div className="row g-3 align-items-center mb-4">
        <div className="col-auto">
          <label htmlFor="search" className="col-form-label fw-semibold">
            Search
          </label>
        </div>
        <div className="col-auto">
          <input
            id="search"
            type="search"
            className="form-control"
            placeholder="Search article title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <label htmlFor="filter" className="col-form-label fw-semibold">
            Category
          </label>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-auto">
          <label htmlFor="sort" className="col-form-label fw-semibold">
            Sort
          </label>
        </div>
        <div className="col-auto">
          <select
            id="sort"
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
            <option value="createdAt">Oldest</option>
            <option value="-createdAt">Newest</option>
          </select>
        </div>
      </div>

      <div className="row">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4" aria-label="Article page navigation">
        <ul className="pagination justify-content-center">
          {page > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
          )}
          <li className="page-item disabled">
            <span className="page-link">Page {page}</span>
          </li>
          {page < totalPage && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
