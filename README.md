# 🚀 Rails React CMS Platform with genAI

A modern full-stack CMS using genAI built with Ruby on Rails API backend and React TypeScript frontend.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Overview

This web application is a comprehensive CMS using genAI with user registration, authentication, and role-based authorization. It allows:

- **Public Users**: View published content
- **Registered Users**: Manage their profiles and create/edit/publish/delete their own content
- **Administrators**: Manage all users and contents across the platform

## ✨ Features

- 🔐 Secure JWT authentication
- 👥 Role-based authorization (Public, User, Admin)
- 📝 Full content management (create, read, update, delete, publish)
- 👤 User profile management
- 🔑 Admin panel for user and content management
- 📱 Responsive UI design with Tailwind CSS

## 🛠️ Technology Stack

### Backend

- **Framework**: Ruby on Rails (API mode)
- **Authentication**: Devise with JWT
- **Authorization**: Pundit
- **Database**: MySQL
- **API**: RESTful endpoints

### Frontend

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit & React Query
- **Routing**: React Router
- **Styling**: Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Ruby (>= 3.0.0)
- Node.js (>= 16.0.0)
- npm or yarn
- MySQL

### Setup Instructions

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Setup the database:

   ```bash
   rails db:create db:migrate db:seed
   ```

4. Start the Rails server:
   ```bash
   rails s
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and go to `http://localhost:5173`

## 📁 Project Structure

```
root/
│
├── backend/              # Ruby on Rails API
│   ├── app/
│   │   ├── controllers/  # API controllers
│   │   ├── models/       # Data models
│   │   ├── policies/     # Pundit authorization policies
│   │   └── ...
│   ├── config/           # Rails configuration
│   ├── db/               # Database migrations and seeds
│   └── ...
│
├── frontend/             # React + Vite + TS
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── redux/        # Redux state management
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service integration
│   │   └── ...
│   └── ...
│
└── README.md
```

## 🔄 API Endpoints

### Authentication

- `POST /login` - User login
- `POST /register` - User registration
- `DELETE /logout` - User logout

### Profile

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Blogs

- `GET /blogs` - List published blogs
- `GET /blogs/:id` - View a specific blog
- `POST /blogs` - Create a new blog (auth required)
- `PUT /blogs/:id` - Update a blog (owner or admin)
- `DELETE /blogs/:id` - Delete a blog (owner or admin)
- `PATCH /blogs/:id/publish` - Publish a blog

### TODO: Other contents

### Admin

- `GET /admin/users` - List all users (admin only)
- `GET /admin/users/:id` - View user details (admin only)
- `PATCH /admin/users/:id` - Update user role/status (admin only)
- `DELETE /admin/users/:id` - Delete a user (admin only)

## 🧪 Testing

### Backend Testing

```bash
cd backend
rails test
```

### Frontend Testing

```bash
cd frontend
npm run test
# or
yarn test
```

## 🚢 Deployment

### Backend Deployment

The Rails API can be deployed to platforms like Render, Fly.io, or Heroku.

### Frontend Deployment

The React application can be deployed to Vercel or Netlify.

Required environment variables:

- `JWT_SECRET_KEY`
- `DATABASE_URL`
- `API_URL`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Project Owner: [Your Name](mailto:your-email@example.com)

---

Made with ❤️ using Ruby on Rails and React
