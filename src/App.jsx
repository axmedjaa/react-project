<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
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
>>>>>>> pages
    </>
  )
}

export default App
