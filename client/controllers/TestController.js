module.exports = class TestController {
  static getTest(req, res) {
    res.json({
      message: "Available API Endpoints",
      endpoints: {
        public: [
          { method: "GET", path: "/test" },
          { method: "POST", path: "/login" },
          { method: "GET", path: "/pub/articles" },
          { method: "GET", path: "/pub/articles/:id" }
        ],
        auth: [
          { method: "POST", path: "/add-user", note: "Admin only" },
          { method: "GET", path: "/articles" },
          { method: "POST", path: "/articles" },
          { method: "GET", path: "/articles/:id" },
          { method: "PUT", path: "/articles/:id" },
          { method: "DELETE", path: "/articles/:id" },
          { method: "PATCH", path: "/articles/:id/img-url" },
          { method: "GET", path: "/categories" },
          { method: "POST", path: "/categories" },
          { method: "PUT", path: "/categories/:id" }
        ]
      }
    });
  }
}
