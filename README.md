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
2. install all the dependencies needed for backend and frontend
2. run the servers in both the folders (backend and frontend)
```bash
git clone https://github.com/yourusername/Expenser.git

cd Expenser
cd backend && npm install
npm run dev
cd ../frontend && npm install
npm run dev
