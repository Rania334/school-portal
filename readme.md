# Anyware Software – Fullstack Challenge

A **responsive fullstack dashboard** app for students to view **quizzes** and **announcements** for the current semester.

Built with:

- React + Redux (TypeScript)
- Jest / React Testing Library
- Material UI
- i18n
- Express.js + MongoDB (Mongoose)
- JWT Auth (Token-based login/logout)
- Fully Functional CRUD API

---

## Live Demo
https://schoolportal-lrnf.onrender.com
---

##  Features

###  Authentication
- Basic login (no credentials required).
- HOC `requireAuth` ensures dashboard access is restricted to logged-in users.
- Logout resets the state and localStorage.

###  Announcements
- List, Create, Edit, Delete announcements.
- Pagination (5 at a time).
- Each post shows: title, content, teacher’s name, subject, timestamp.

###  Quizzes
- List, Create, Edit, Delete quizzes (aka tasks).
- Filtered by `type: 'quiz'`.
- Sorted by `dueDate`.

### Teacher Dashboard
- Dedicated dashboard for teachers to **post, edit, and delete announcements and quizzes**.

###  Architecture
- React reusable components.
- State managed by Redux Toolkit.
- Axios for data fetching.
- Responsive layout for all screen sizes.
- Sidebar hover effect (background + text turns white).
- i18n structure ready.
- Tested with unit/integration tests.

---

###  Tested With

- **Frontend:** Jest + React Testing Library  
- **Backend:** Supertest + Jest 

---

### Technical Highlights

- **TypeScript** for type safety
- **Redux Toolkit** for cleaner global state management
- **Axios** for backend communication
- **JWT Authentication** – Auth token stored in `localStorage`
- **Mongoose** schema validation
- **Pagination & Lazy Loading** support for both modules
- **Future-ready i18n** – Translation-ready setup using `i18next` (just add JSON)

---

###  API Endpoints

####  Auth

| Method | Endpoint              | Description     |
|--------|------------------------|-----------------|
| POST   | `/api/auth/login`     | Log in user     |
| POST   | `/api/auth/register`  | Register user   |

#### Announcements

| Method | Endpoint                        | Description         |
|--------|----------------------------------|---------------------|
| GET    | `/api/announcements`            | Get paginated list  |
| POST   | `/api/announcements`            | Create new (auth)   |
| PUT    | `/api/announcements/:id`        | Update (auth)       |
| DELETE | `/api/announcements/:id`        | Delete (auth)       |

### Quizzes (Tasks)

| Method | Endpoint                 | Description         |
|--------|---------------------------|---------------------|
| GET    | `/api/quizzes`           | Get paginated list  |
| POST   | `/api/quizzes`           | Create new (auth)   |
| PUT    | `/api/quizzes/:id`       | Update quiz (auth)  |
| DELETE | `/api/quizzes/:id`       | Delete quiz (auth)  |

## Design
### The dashboard was created to follow the design provided in the video/spec sheet with full responsiveness.
<img width="1920" height="856" alt="Screenshot (2590)" src="https://github.com/user-attachments/assets/7a0496c2-1060-4f6c-b69d-159620875766" />
<img width="1920" height="859" alt="Screenshot (2591)" src="https://github.com/user-attachments/assets/65a1bce9-0f1e-4edf-b7f2-eb7546464808" />
<img width="1920" height="849" alt="Screenshot (2592)" src="https://github.com/user-attachments/assets/80369a0e-61dc-4ad4-84c7-dd29226e09ec" />
<img width="1920" height="854" alt="Screenshot (2593)" src="https://github.com/user-attachments/assets/f673489f-93cd-4926-9724-35cac9c60438" />
<img width="1920" height="867" alt="Screenshot (2594)" src="https://github.com/user-attachments/assets/2dbed93f-39a1-4ac5-a89a-5df27f39a0f2" />

### Teacher DashBoard
<img width="1920" height="872" alt="Screenshot (2595)" src="https://github.com/user-attachments/assets/d142a4c9-be57-4367-b6c8-c42bd081cb16" />



### 1. Clone the repo



```bash
git clone https://github.com/Rania334/school-portal.git
cd school-portal
```
