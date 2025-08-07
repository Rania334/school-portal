# Anyware Software – Fullstack Challenge

A **responsive fullstack dashboard** app for students to view **quizzes** and **announcements** for the current semester.

Built with:

- React + Redux (TypeScript)
- Jest / React Testing Library
- Material UI
- i18n-ready (future translation support)
- Express.js + MongoDB (Mongoose)
- JWT Auth (Token-based login/logout)
- Fully Functional CRUD API

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

### 🗃️ API Endpoints

#### 🔐 Auth

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

### 1. Clone the repo

```bash
git clone https://github.com/Rania334/school-portal.git
cd school-portal
```