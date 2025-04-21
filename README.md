# Expenser

A full-stack expense tracking application built with React, Redux, Node.js, and MongoDB that helps users manage and monitor their expenses efficiently.

## Features

- 🔐 User authentication (Login/Register)
- 💰 Create, update and delete expenses 
- ✅ Mark expenses as done/undone
- 🏷️ Categorize expenses (Rent, Food, Education, Shopping, Others)
- 📊 Filter expenses by category and status
- 💾 Persistent data storage with MongoDB
- 🔒 Secure authentication with JWT
- 🎨 Modern UI with Tailwind CSS and Shadcn components
- 📱 Responsive design for mobile devices
- 📈 Expense analytics and insights
- 🔔 Email notifications for budget alerts

## Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Shadcn UI Components
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- Cookie Parser

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account
- Git

### Installation

1. Clone the repository
2. Install all the dependencies needed for backend and frontend
3. Set up environment variables:
   - Create `.env` file in the backend directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
4. Run the servers:
```bash
# Clone the repository
git clone https://github.com/yourusername/Expenser.git

# Install backend dependencies and start server
cd Expenser/backend
npm install
npm run dev

# In a new terminal, install frontend dependencies and start server
cd ../frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000