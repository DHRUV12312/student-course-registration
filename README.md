# 🎓 Student Course Registration System

A simple **Full-Stack Student Course Registration Web Application** that allows students to register, log in, view available courses, and enroll in them online.

The application demonstrates **frontend-backend integration**, **RESTful APIs**, and **MongoDB database management**.

---

## 🚀 Technologies Used

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* DOM API
* Fetch API
* JSON

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Security

* bcrypt for password hashing

---

## ✨ Features

* Student **registration and login**
* Secure **password hashing with bcrypt**
* View **available courses**
* **Enroll in courses**
* View **enrolled courses**
* RESTful API communication between frontend and backend
* Responsive and simple user interface

---

## 📂 Project Structure

```
student-course-registration/
│
├── server.js                 # Express application entry point
│
├── src
│   ├── config
│   │   └── db.js             # MongoDB database connection
│   │
│   ├── models
│   │   ├── Student.js        # Student schema
│   │   ├── Course.js         # Course schema
│   │   └── Enrollment.js     # Student-Course relation
│   │
│   └── routes
│       ├── authRoutes.js     # Register & login APIs
│       ├── courseRoutes.js   # Course CRUD APIs
│       └── enrollmentRoutes.js # Enrollment APIs
│
├── public
│   ├── index.html            # Main UI (authentication + dashboard)
│   ├── css
│   │   └── styles.css        # Application styling
│   └── js
│       └── app.js            # Frontend logic and API calls
│
├── .env.example              # Environment variables example
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, install:

* Node.js (LTS version)
* MongoDB (local installation or MongoDB Atlas)

---

## 🛠️ Setup and Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/DHRUV12312/student-course-registration.git
```

### 2️⃣ Navigate to the project folder

```
cd student-course-registration
```

### 3️⃣ Install dependencies

```
npm install
```

### 4️⃣ Create environment variables

Copy `.env.example` to `.env`

```
cp .env.example .env
```

Update the values if necessary.

Example:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentdb
```

---

### 5️⃣ Start MongoDB

Make sure your MongoDB server is running.

---

### 6️⃣ Run the application

Development mode:

```
npm run dev
```

Normal start:

```
npm start
```

---

### 7️⃣ Open the application

Visit in your browser:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new student |
| POST   | `/api/auth/login`    | Login student          |

---

### Courses

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | `/api/courses`     | Get all courses |
| POST   | `/api/courses`     | Create a course |
| PUT    | `/api/courses/:id` | Update course   |
| DELETE | `/api/courses/:id` | Delete course   |

---

### Enrollments

| Method | Endpoint                              | Description              |
| ------ | ------------------------------------- | ------------------------ |
| POST   | `/api/enrollments`                    | Enroll student in course |
| GET    | `/api/enrollments/student/:studentId` | Get student enrollments  |

---

## 🧠 Learning Outcomes

Through this project I learned:

* Full-stack web development
* REST API design
* Backend routing with Express
* MongoDB data modeling using Mongoose
* Secure authentication with bcrypt
* Frontend-backend communication using Fetch API

---

## 🧑‍💻 Author

Dhruv Acharya

GitHub:
https://github.com/DHRUV12312

---

## 📜 License

This project is licensed under the **MIT License**.
