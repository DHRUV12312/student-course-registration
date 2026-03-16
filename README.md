## Student Course Registration Web Application

This is a simple full‑stack **Student Course Registration** web application built with:

- **Frontend**: HTML5, CSS3, vanilla JavaScript, DOM API, Fetch API, JSON
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)

Students can register, log in, view available courses, and enroll in them online through a responsive, user‑friendly interface.

### Features

- **Student registration & login** (passwords hashed with bcrypt)
- **View available courses**
- **Enroll in courses**
- **View enrolled courses**
- **RESTful JSON APIs** between frontend and backend

### Project Structure

- `server.js` – Express app entry point
- `src/config/db.js` – MongoDB connection
- `src/models/Student.js` – student schema and password hashing
- `src/models/Course.js` – course schema
- `src/models/Enrollment.js` – enrollment schema (student–course relation)
- `src/routes/authRoutes.js` – register & login endpoints
- `src/routes/courseRoutes.js` – CRUD for courses
- `src/routes/enrollmentRoutes.js` – enrollment endpoints
- `public/index.html` – main UI (auth + dashboard)
- `public/css/styles.css` – responsive styling
- `public/js/app.js` – DOM logic, validation, Fetch API calls

### Prerequisites

- Node.js (LTS)
- MongoDB running locally or a MongoDB URI

### Setup & Run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create environment file**

   Copy `.env.example` to `.env` and adjust values if needed:

   ```bash
   cp .env.example .env
   ```

3. **Start MongoDB**

   Make sure your MongoDB server is running and matches `MONGODB_URI` in `.env`.

4. **Run the app**

   Development (with auto‑reload using nodemon):

   ```bash
   npm run dev
   ```

   Or normal start:

   ```bash
   npm start
   ```

5. **Open in browser**

   Navigate to `http://localhost:5000` to use the application.

### API Overview

- `POST /api/auth/register` – register a new student
- `POST /api/auth/login` – log in a student (returns basic student info)
- `GET /api/courses` – list all courses
- `POST /api/courses` – create a course
- `PUT /api/courses/:id` – update a course
- `DELETE /api/courses/:id` – delete a course
- `POST /api/enrollments` – enroll a student in a course
- `GET /api/enrollments/student/:studentId` – list a student’s enrollments

### Git, VS Code, and DevTools

- Use **Git** to track changes:

  ```bash
  git init
  git add .
  git commit -m "Initial student course registration app"
  ```

- Open the folder in **VS Code** for development.
- Use **Browser DevTools** (F12) to inspect DOM, network requests (Fetch), and debug JavaScript.

