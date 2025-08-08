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
## Video
https://drive.google.com/file/d/1BwsghBEIyMmBtOlSB5abG6AxDavMW99b/view?usp=sharing
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
- Skeleton loaders improve UX during fetch.

###  Quizzes
- List, Create, Edit, Delete quizzes (aka tasks).
- Filtered by `type: 'quiz'`.
- Sorted by `dueDate`.
- Skeleton loaders improve UX during fetch.
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


<table>
  <tr>
    <td><img width="100%" alt="Screenshot (2606)" src="https://github.com/user-attachments/assets/bddef560-1a15-48f6-a041-8507d5c86309" /></td>
    <td><img width="100%" alt="Screenshot (2605)" src="https://github.com/user-attachments/assets/f4697ac7-c2c5-484c-9557-13f9a928f450" /></td>
  </tr>
  <tr>
    <td><img width="100%" alt="Screenshot (2604)" src="https://github.com/user-attachments/assets/10d781db-b026-44f8-8b6a-caab3c317a17" /></td>
    <td><img width="100%" alt="Screenshot (2603)" src="https://github.com/user-attachments/assets/48d457af-6f10-41fd-a574-f0694a5d4d4b" /></td>
  </tr>
  <tr>
    <td><img width="100%" alt="Screenshot (2602)" src="https://github.com/user-attachments/assets/4f4d57c0-45c1-4703-b7ea-a29db855237d" /></td>
    <td><img width="100%" alt="Screenshot (2601)" src="https://github.com/user-attachments/assets/76b1f98d-de4a-4b96-bed4-a067de03b3c2" /></td>
  </tr>
</table>
<table>
  <tr>
    <td><img width="100%" alt="iPhone-13 (3)" src="https://github.com/user-attachments/assets/90cd5c14-dad6-4186-930c-79a2c6d5f0e9" /></td>
        <td><img width="100%" alt="iPhone-13 (1)" src="https://github.com/user-attachments/assets/f037d17a-ee73-4d2a-8aa2-57ffdfab2150" /></td>

  </tr>
  <tr>
    <td><img width="100%" alt="iPhone-13" src="https://github.com/user-attachments/assets/3e293ab4-30ee-491d-be39-ffab3187c888" /></td>
    <td><img width="100%" alt="iPhone-13 (2)" src="https://github.com/user-attachments/assets/f159af9d-beff-458c-9217-7db9cd7e5115" /></td>
  </tr>
  <tr>
    <td><img width="100%" alt="iPhone-13 (4)" src="https://github.com/user-attachments/assets/fbfddcb7-771b-4bb5-9b72-f324beb44ca9" /></td>

  </tr>
</table>
        <td><img width="100%" alt="iPad-PRO" src="https://github.com/user-attachments/assets/59a6415f-1bfc-42a4-b298-37a4ffb19ddb" /></td>



### 1. Clone the repo



```bash
git clone https://github.com/Rania334/school-portal.git
cd school-portal
```
