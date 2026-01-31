# Task Management App

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This application facilitates task tracking, user management, and administrative oversight with real-time updates and interactive dashboards.

## 🚀 Technologies Used

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React (Icons), Recharts (Charts)
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Real-time**: Socket.io

## ✨ Features

### 🔐 Authentication & Security
- Secure Login and Registration system.
- JWT-based authentication with session management.
- Protected routes for standard Users and Admins.

### 📊 Admin Dashboard
- **Overview**: Interactive dashboard with visual analytics and charts.
- **Task Management**: Full CRUD capabilities for task creation, assignment, and tracking.
- **User Management**: Monitor and manage registered users and their roles.

### 👤 User Dashboard
- Personalized dashboard for users to view assigned tasks.
- Status tracking and updates.

### ⚡ Real-time Features
- Instant updates for task assignments and status changes using Socket.io.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TaskManagement
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
ORIGIN=http://localhost:5173
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=6h
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Start the frontend development server:
```bash
npm run dev
```

## 📂 Project Structure

```
TaskManagement/
├── backend/            # Express.js API Server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
├── frontend/           # React Client Application
│   ├── src/
│   │   ├── features/   # Feature-based architecture (Admin, Auth, User)
│   │   ├── components/ # Reusable UI components
│   │   └── hooks/      # Custom React hooks
```

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
