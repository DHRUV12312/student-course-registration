const apiBase = "/api";

const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const authSection = document.getElementById("auth-section");
const dashboard = document.getElementById("dashboard");
const studentNameEl = document.getElementById("student-name");
const studentEmailEl = document.getElementById("student-email");
const logoutBtn = document.getElementById("logout-btn");

const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");
const coursesMessage = document.getElementById("courses-message");
const enrollmentsMessage = document.getElementById("enrollments-message");
const addCourseMessage = document.getElementById("add-course-message");

const coursesTableBody = document.getElementById("courses-table-body");
const enrollmentsTableBody = document.getElementById("enrollments-table-body");

let currentStudent = null;

document.getElementById("year").textContent = new Date().getFullYear();

// Tab switching
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Helper to show messages
function showMessage(element, text, type = "info") {
  element.textContent = text;
  element.className = `message ${type}`;
}

// Simple client-side validation
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Register
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!name || !email || !password) {
    showMessage(registerMessage, "All fields are required.", "error");
    return;
  }
  if (!validateEmail(email)) {
    showMessage(registerMessage, "Please enter a valid email.", "error");
    return;
  }
  if (password.length < 6) {
    showMessage(registerMessage, "Password must be at least 6 characters.", "error");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(registerMessage, data.message || "Registration failed.", "error");
      return;
    }
    showMessage(registerMessage, data.message || "Registration successful.", "success");
    registerForm.reset();
  } catch (err) {
    console.error(err);
    showMessage(registerMessage, "Network error. Please try again.", "error");
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showMessage(loginMessage, "Email and password are required.", "error");
    return;
  }

  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(loginMessage, data.message || "Login failed.", "error");
      return;
    }

    currentStudent = data.student;
    localStorage.setItem("student", JSON.stringify(currentStudent));

    showDashboard();
  } catch (err) {
    console.error(err);
    showMessage(loginMessage, "Network error. Please try again.", "error");
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  currentStudent = null;
  localStorage.removeItem("student");
  dashboard.classList.add("hidden");
  authSection.classList.remove("hidden");
});

function showDashboard() {
  if (!currentStudent) return;
  studentNameEl.textContent = currentStudent.name;
  studentEmailEl.textContent = currentStudent.email;
  authSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  loadCourses();
  loadEnrollments();
}

// Load courses from API
async function loadCourses() {
  coursesTableBody.innerHTML = "";
  showMessage(coursesMessage, "Loading courses...", "info");
  try {
    const res = await fetch(`${apiBase}/courses`);
    const courses = await res.json();
    if (!Array.isArray(courses) || courses.length === 0) {
      showMessage(coursesMessage, "No courses available. Add some using the API.", "info");
      return;
    }
    showMessage(coursesMessage, "", "info");

    courses.forEach((course) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${course.code}</td>
        <td>${course.title}</td>
        <td>${course.credits || 3}</td>
        <td><button class="btn small enroll-btn" data-course-id="${course._id}">Enroll</button></td>
      `;
      coursesTableBody.appendChild(tr);
    });

    // Attach listeners for enroll buttons
    document.querySelectorAll(".enroll-btn").forEach((btn) => {
      btn.addEventListener("click", () => handleEnroll(btn.dataset.courseId));
    });
  } catch (err) {
    console.error(err);
    showMessage(coursesMessage, "Failed to load courses.", "error");
  }
}

// Add course from dashboard form
const addCourseForm = document.getElementById("add-course-form");
if (addCourseForm) {
  addCourseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = document.getElementById("course-code").value.trim();
    const title = document.getElementById("course-title").value.trim();
    const creditsValue = document.getElementById("course-credits").value;
    const description = document.getElementById("course-description").value.trim();

    if (!code || !title || !creditsValue) {
      showMessage(addCourseMessage, "Code, title and credits are required.", "error");
      return;
    }

    const credits = Number(creditsValue);
    if (Number.isNaN(credits) || credits <= 0) {
      showMessage(addCourseMessage, "Credits must be a positive number.", "error");
      return;
    }

    try {
      const res = await fetch(`${apiBase}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, title, credits, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        showMessage(addCourseMessage, data.message || "Failed to add course.", "error");
        return;
      }
      showMessage(addCourseMessage, "Course added successfully.", "success");
      addCourseForm.reset();
      loadCourses();
    } catch (err) {
      console.error(err);
      showMessage(addCourseMessage, "Network error. Could not add course.", "error");
    }
  });
}

// Enroll
async function handleEnroll(courseId) {
  if (!currentStudent) return;
  try {
    const res = await fetch(`${apiBase}/enrollments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: currentStudent.id, courseId }),
    });
    const data = await res.json();
    if (!res.ok) {
      showMessage(coursesMessage, data.message || "Enrollment failed.", "error");
      return;
    }
    showMessage(coursesMessage, data.message || "Enrollment successful.", "success");
    loadEnrollments();
  } catch (err) {
    console.error(err);
    showMessage(coursesMessage, "Failed to enroll.", "error");
  }
}

// Load enrollments
async function loadEnrollments() {
  if (!currentStudent) return;
  enrollmentsTableBody.innerHTML = "";
  showMessage(enrollmentsMessage, "Loading enrollments...", "info");
  try {
    const res = await fetch(`${apiBase}/enrollments/student/${currentStudent.id}`);
    const enrollments = await res.json();
    if (!Array.isArray(enrollments) || enrollments.length === 0) {
      showMessage(enrollmentsMessage, "You are not enrolled in any course yet.", "info");
      return;
    }
    showMessage(enrollmentsMessage, "", "info");

    enrollments.forEach((enrollment) => {
      const course = enrollment.course || {};
      const enrolledDate = new Date(enrollment.createdAt).toLocaleDateString();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${course.code || ""}</td>
        <td>${course.title || ""}</td>
        <td>${enrolledDate}</td>
      `;
      enrollmentsTableBody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    showMessage(enrollmentsMessage, "Failed to load enrollments.", "error");
  }
}

// Restore session on load
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("student");
  if (stored) {
    try {
      currentStudent = JSON.parse(stored);
      showDashboard();
    } catch {
      localStorage.removeItem("student");
    }
  }
});

