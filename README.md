## Introduction to Instagram Backend

Welcome to the Instagram Backend documentation!

Instagram Backend is a project designed to replicate the essential functionalities of Instagram's backend system. Developed using Node.js and Express.js, it provides a RESTful API for user authentication, profile management, post handling, likes, comments, and more.

This documentation serves as a guide to understanding the project structure, endpoints, and server setup. Whether you're exploring backend development concepts or building a similar social media platform, Instagram Backend offers valuable insights into creating scalable and feature-rich backend systems.

Let's dive in and discover the inner workings of Instagram's backend infrastructure!

## 📁 Project Structure

The project follows a modular structure, dividing functionalities into separate directories for better organization and maintenance.

```
📦 instagram-backend
 ┣ 📂 config/
 ┃ ┗ 📜 dbConnection.js
 ┣ 📂 controller/
 ┃ ┣ 📜 authController.js
 ┃ ┣ 📜 userController.js
 ┃ ┣ 📜 profileController.js
 ┃ ┣ 📜 uploadController.js
 ┃ ┣ 📜 postController.js
 ┃ ┣ 📜 likeController.js
 ┃ ┣ 📜 commentController.js
 ┃ ┗ 📜 feedController.js
 ┣ 📂 middleware/
 ┃ ┣ 📜 check-profile-privacy.js
 ┃ ┣ 📜 verify-token.js
 ┃ ┗ 📜 error-handler.js
 ┣ 📂 validation/
 ┃ ┗ 📜 joiValidation.js
 ┣ 📂 routes/
 ┃ ┣ 📜 auth.routes.js
 ┃ ┣ 📜 user.routes.js
 ┃ ┣ 📜 profile.routes.js
 ┃ ┣ 📜 upload.routes.js
 ┃ ┣ 📜 post.routes.js
 ┃ ┣ 📜 like.routes.js
 ┃ ┣ 📜 comment.routes.js
 ┃ ┣ 📜 feed.routes.js
 ┃ ┗ 📜 router.js
 ┣ 📂 public/
 ┗ 📜 server.js
```

---

## 🚀 Endpoints

### Authentication

- **POST /auth/signup**
  - Create a new user account.
- **POST /auth/login**
  - Authenticate user credentials.

### User

- **POST /user/password-reset**
  - Send password reset link.
- **PUT /user/password-reset**
  - Reset user password.
- **GET /user/followers/:userId**
  - Get followers of a user.
- **GET /user/followings/:userId**
  - Get users followed by a user.
- **POST /user/follow/:userId**
  - Follow a user.

### Profile

- **POST /profile/**
  - Create user profile.
- **PUT /profile/**
  - Update user profile.

### Uploads

- **POST /uploads/**
  - Upload media files.

### Posts

- **POST /posts/**
  - Create a new post.
- **GET /posts/**
  - Get all posts.
- **GET /posts/:userId**
  - Get posts of a specific user.

### Likes

- **POST /likes/:postId**
  - Like a post.

### Comments

- **POST /comments/:postId**
  - Add a comment to a post.
- **POST /comments/:postId/:commentId**
  - Reply to a comment.

### Feed

- **GET /feed/**
  - Get user feed.

---

## 🛠️ Server Setup

To set up the server:

1. Install dependencies using `npm install`.
2. Configure MongoDB connection details in `config/dbConnection.js`.
3. Start the server with `npm start`.
4. Access the server at `http://localhost:{PORT}`.
