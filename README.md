# WWW - News App

## Overview

WWW is a full-stack web application for managing and publishing news articles. It consists of a backend RESTful API and a modern frontend client. The platform supports public article browsing and a CMS dashboard for admins and staff to manage content.

---

## Features

**Frontend (client):**

- Responsive public portal for browsing articles and categories
- Article detail view
- User authentication (login)
- CMS dashboard for admins/staff:
  - Manage articles (add, edit, delete, update image)
  - Manage categories
  - Add staff users
- Modern UI built with React and Vite

**Backend (server):**

- RESTful API for articles, categories, and users
- JWT-based authentication and role-based authorization (Admin, Staff)
- CRUD operations for articles and categories
- Image upload for articles (Cloudinary integration)
- Public endpoints for viewing articles and categories
- Error handling middleware
- Comprehensive test coverage (Jest)

---

## Tech Stack

- **Frontend:** ReactJS, Vite, Axios, React Router, SweetAlert2, CSS
- **Backend:** Node.js, Express.js, PostgreSQL, Sequelize ORM, JWT, Cloudinary, Multer, Jest

---

## Project Structure

- `server/` — Backend REST API (Express, Sequelize, PostgreSQL)
- `client/` — Frontend client (React, Vite)

---

## API Endpoints (Backend)

### Auth

- `POST /login` — User login
- `POST /add-user` — Add new user (Admin only)

### Articles

- `GET /articles` — List articles (auth required)
- `POST /articles` — Create article (auth required)
- `GET /articles/:id` — Get article by ID (auth required)
- `PUT /articles/:id` — Update article (Admin/Staff)
- `DELETE /articles/:id` — Delete article (Admin/Staff)
- `PATCH /articles/:id/img-url` — Update article image (Admin/Staff, Cloudinary)

### Categories

- `GET /categories` — List categories
- `POST /categories` — Create category
- `PUT /categories/:id` — Update category

### Public

- `GET /pub/articles` — List articles (public)
- `GET /pub/categories` — List categories (public)
- `GET /pub/articles/:id` — Get article by ID (public)

---

## Getting Started

### Backend

1. Clone the repository
2. Install dependencies: `npm install`
3. Setup PostgreSQL and update `config/config.json`
4. Run migrations and seeders: `npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
5. Start server: `npm run dev`

### Frontend

1. Navigate to `client`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

---

## Environment Variables

- Backend: Create a `.env` file for sensitive configs (e.g., JWT secret, Cloudinary keys)
- Frontend: Configure API base URL in `src/lib/http.js` if needed

---

## Testing

- Backend: Run tests with `npm test`

---

## License

MIT
