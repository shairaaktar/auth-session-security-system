🔐 Authentication & Session Security System (MERN)

A backend-focused MERN project demonstrating  secure authentication, session management, and admin security controls.

## 🧠 System Highlights

JWT Authentication (Access & Refresh Tokens)

Secure refresh token storage & rotation

Role-Based Access Control (Admin, User)

Multi-device session tracking (IP, User-Agent)

Admin-controlled:

Force logout

Session lock/unlock

Session revocation

Automatic logout on revoked sessions

Centralized audit logs for security actions

CSRF protection


## 🛠️ Tech Stack

Backend: Node.js, Express.js, MongoDB, Mongoose

Security: JWT, CSRF, RBAC

Frontend: React, Axios, Tailwind CSS


## ⚙️ Local Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev

