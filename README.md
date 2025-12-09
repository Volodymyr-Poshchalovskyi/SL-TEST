# Mini-Blog Fullstack Application

A modern, responsive, and secure blogging platform built with React and Node.js. This application features full CRUD capabilities, JWT authentication, and a polished UI with skeleton loading and toast notifications.

## Tech Stack

### Frontend
* Framework: React (Vite) + TypeScript
* Styling: Tailwind CSS
* Routing: React Router DOM
* State Management: Context API (Custom PostsContext & AuthContext)
* HTTP Client: Axios
* UI Components: React Toastify (Notifications), Custom Modals, Skeletons

### Backend
* Runtime: Node.js
* Framework: Express.js
* Database: SQLite
* ORM: Prisma
* Authentication: JWT (JSON Web Tokens)
* Security: Bcryptjs (Password hashing)

## Features

* Authentication & Security:
    * User Registration and Login.
    * JWT-based protected routes (access control).
    * Password hashing for security.
* Post Management (CRUD):
    * Create new posts with validation.
    * Read posts (cached for performance).
    * Update existing posts.
    * Delete posts with a confirmation modal.
* User Experience (UX):
    * Skeleton Loading: Smooth visual feedback while data is fetching.
    * Instant Updates: Optimistic UI updates using Context API.
    * Notifications: Success and error toast messages.
    * Responsive Design: Fully mobile-friendly interface.
    * 404 Page: Custom "Not Found" page handling.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the repository


git clone https://github.com/Volodymyr-Poshchalovskyi/SL-TEST.git
cd SL-TEST

## 2. Backend Setup (Server)

Navigate to the server directory, install dependencies, and set up the database.


cd server
npm install

Environment Variables: Create a .env file in the server folder and add the following:


PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_super_secret_key_change_this"

Database Migration: Initialize the SQLite database using Prisma:
Bash

npx prisma migrate dev --name init

Run the Server:
Bash

npm run dev

The server will start on http://localhost:5000
## 3. Frontend Setup (Client)

Open a new terminal, navigate to the client directory, and install dependencies.
Bash

cd client
npm install

Run the Client:
Bash

npm run dev

The application will start on http://localhost:5173 (or another available port).
Testing the API

You can test the API endpoints using Postman or cURL if needed:

    POST /auth/register - Register a new user

    POST /auth/login - Login

    GET /posts - Get all posts (Protected)

    POST /posts - Create a post (Protected)

    PUT /posts/:id - Update a post (Protected)

    DELETE /posts/:id - Delete a post (Protected)
