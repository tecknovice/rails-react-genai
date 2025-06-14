---
applyTo: "**"
---

# 📝 Web Application Design Document

## 📌 Overview

This web application is a CMS using genAI with user registration, authentication, and role-based authorization. Users can manage their profiles and contents. Admins can manage all users and contents. Public users can read published contents.

---

## 🗂️ Project Structure

```
root/
│
├── backend/              # Ruby on Rails API
│   ├── app/
│   ├── config/
│   ├── db/
│   └── ...
│
├── frontend/             # React + Vite + TS
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── pages/
│   │   └── ...
│   └── ...
│
└── README.md
```

---

## ⚙️ Technologies

| Layer    | Tech Stack                                                        |
| -------- | ----------------------------------------------------------------- |
| Backend  | Ruby on Rails, Devise, Devise-JWT, Pundit, ActiveAdmin            |
| Frontend | React, TypeScript, Vite, React Query, Redux Toolkit, React Router |
| Styling  | TailwindCSS                                                       |
| Database | MySQL                                                             |
| Auth     | JWT (via Devise-JWT)                                              |

---

## 🔐 Roles and Permissions

| Role   | Capabilities                                                               |
| ------ | -------------------------------------------------------------------------- |
| Public | View published contents                                                    |
| User   | Register, login, manage profile, create/update/publish/delete own contents |
| Admin  | Manage all users, manage all contents                                      |

Use **Pundit** for role-based policies on the backend.

---

## 🔧 Backend (Ruby on Rails)

### Gems to Install

```ruby
gem 'devise'
gem 'devise-jwt'
gem 'pundit'
gem 'rack-cors'
gem 'mysql2'
gem 'activeadmin'
```

### Models

- **User**

  - `email`, `password`, `role` (`user`/`admin`)

- **Blog**

  - `title`, `content`, `published:boolean`, `user_id:references`

### Devise Setup

```bash
rails generate devise:install
rails generate devise User
```

### JWT Integration (Devise-JWT)

Add to `User` model:

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
end
```

Create `JwtDenylist` model for token revocation.

### Blog CRUD + Pundit Policies

```bash
rails g scaffold Blog title:string content:text published:boolean user:references
rails g pundit:install
```

Example Policy:

```ruby
class BlogPolicy < ApplicationPolicy
  def update?
    record.user_id == user.id
  end

  def destroy?
    record.user_id == user.id
  end

  def publish?
    update?
  end
end
```

---

## 🌐 Frontend (React + Vite + TypeScript)

### Dependencies

```bash
npm install axios react-query react-router redux tailwindcss
```

### Folder Structure (src/)

```
src/
├── services/             # Api calls
├── components/           # Reusable UI
├── redux/                # Redux slices for auth and role
├── pages/                # Route pages (Home, Dashboard, Admin)
├── types/                # TypeScript interfaces
└── main.tsx
```

### Routing (React Router v7)

```tsx
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
<Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
```

### Authentication

- Store JWT in **localStorage**.
- Auth state managed with **Redux** .

### State Management

- **React Query** for server-side state (contents, users).
- **Redux Toolkit** for auth state and role.

### Tailwind UI Components

Build reusable components:

- `<Navbar />`, `<BlogCard />`, `<BlogForm />`, `<UserList />`, etc.

---

## 🔁 API Endpoints (Example)

### Auth

| Method | Endpoint  | Description |
| ------ | --------- | ----------- |
| POST   | /login    | Login       |
| POST   | /register | Register    |
| DELETE | /logout   | Logout      |

### Profile (Authenticated User)

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | /profile | Get own profile    |
| PUT    | /profile | Update own profile |

> All routes protected by Devise JWT and Pundit policies.

### Blogs (Authenticated User)

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | /blogs                | List own blogs         |
| GET    | /blogs/\:id           | View own blog          |
| POST   | /blogs                | Create (auth required) |
| PUT    | /blogs/\:id           | Update own blog        |
| DELETE | /blogs/\:id           | Delete own blog        |
| PATCH  | /blogs/\:id/publish   | Publish own blog       |
| PATCH  | /blogs/\:id/unpublish | Unpublish own blog     |

> All routes protected by Devise JWT and Pundit policies.

### Blogs (Unauthenticated User)

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /public/blogs      | List published blogs |
| GET    | /public/blogs/\:id | View published blog  |

### Admin (ActiveAdmin)

- Access at: `/admin`
- Use `ActiveAdmin.register User` and `ActiveAdmin.register Blog` to expose models.
- Admins can:
  - View/Edit/Delete users
  - View/Edit/Delete any contents

---

## 🧪 Testing

- **Backend:** RSpec, FactoryBot for unit and integration tests.
- **Frontend:** React Testing Library, Vitest

---

## 🚀 Deployment

- **Backend:** Deploy to Render, Fly.io, or Heroku.
- **Frontend:** Vercel, Netlify.
- **Env Vars:**

  - `DEVISE_JWT_SECRET_KEY`
  - `DATABASE_URL`
  - `API_URL`

---

## ✅ MVP Checklist

- [ ] User registration & login
- [ ] JWT auth integration
- [ ] Blog CRUD operations
- [ ] Role-based access with Pundit
- [ ] Admin management UI
- [ ] Public view for published contents
- [ ] Responsive UI with Tailwind
- [ ] API error handling
- [ ] Secure authentication (JWT + refresh tokens optional)
