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

## Docker Setup

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
