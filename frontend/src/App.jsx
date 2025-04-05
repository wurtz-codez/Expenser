import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Toaster } from "@/components/ui/sonner"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <SignUp/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
      <Toaster />
    </>
  )
}

export default App
