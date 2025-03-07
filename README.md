# Assignment

In this project i have build UI with React (frontend) and Node.js (backend) with MongoDB (Databse). It provides user authentication using JWT and includes secure signup and login functionality.

---

## Technologies Used

### Frontend:

- React: JavaScript library for building user interfaces.
- React Router: For handling routing in the application.
- Tailwind CSS: Utility-first CSS framework for styling the frontend.
- Axios: For making HTTP requests to the backend.

### Backend:

- Node.js: JavaScript runtime for the server-side.
- Express.js: Web framework for handling HTTP requests.
- MongoDB: NoSQL database for storing user information.
- bcrypt: For password hashing.
- jsonwebtoken: For generating JWT tokens.
- dotenv: For managing environment variables.
- cors: To enable cross-origin resource sharing.
- Multer: For image storage.

---

<h1>Project setup using Docker</h1>

### Prerequisites
- Docker installed on your machine.

### Steps to Run the Project with Docker

1. Clone the Repository:
   ```bash
   git clone https://github.com/Wasiim105/assignment.git
   cd assignment
2. Build and Run the Docker Containers:
   ```bash
   docker-compose up --build
3. Stop the Containers:
   ```bash
   docker-compose down

---

<h1>Project setup (Without Docker)</h1>

## Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   
2. Install dependencies:
   ```bash
   npm install
   npm install axios
   npm install react-router-dom
   
3. Install Tailwind CSS:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   
4. Start the frontend server:
   ```bash
   npm run dev

## Backend

1. Navigate to the backend folder:
   ```bash
   cd backend

2. Install required libraries:
   ```bash
   npm install express mongoose jsonwebtoken bcrypt cors dotenv multer nodemon

3. Start the backend server:
   ```bash
   npm run server

## Notes:
Start the backend server first. Check the logs for:
   ```bash
   Server Started on http://localhost:4000
   DB Connected
