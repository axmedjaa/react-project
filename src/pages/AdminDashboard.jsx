import { useState } from "react"
import { AiOutlineMenuUnfold } from "react-icons/ai"
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go"
import { Link, Outlet } from "react-router"
const AdminDashboard = () => {
    const[isSidebarOpen,setIsSidebarOpen]=useState(false)
  return (
    <div className="relative min-h-screen flex">
        <button
      onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
      className="absolute top-0 left-0 sm:hidden text-4xl text-gray-700 ">
        {isSidebarOpen?<GoSidebarCollapse className="w-50 mt-4"/>:<GoSidebarExpand className="mt-4 "/>}
      </button>
      {/* Sidebar */}
      <nav className={`${isSidebarOpen?'w-30':'w-0 hidden'} sm:block sm:w-60 bg-gray-100 min-h-screen p-4`}>
        <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
        <ul className="space-y-2">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/ads">Adds</Link></li>
          <li><Link to="/dashboard/manage">Manage Ads</Link></li>
          <li><Link to="/dashboard/orders">See Orders</Link></li>
        </ul>
      </nav>
      {/* Main content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>

  )
}

export default AdminDashboard