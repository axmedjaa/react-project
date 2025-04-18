import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router"
import Header from "./components/Header"
import Footer from "./pages/Footer"
import { AuthProvider } from './context/Context'
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
     <AuthProvider>
     <Header/>
     <Outlet/>
     <Footer/>
      </AuthProvider>
    </>
  )
}

export default App
