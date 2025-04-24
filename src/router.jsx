import { createBrowserRouter } from "react-router";
import App from "./App";
import NotFound from "./components/NotFound";
import Home from "./pages/Home"
import Products from "./pages/Products";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import SeeOrders from "./pages/SeeOrders";
import ManageAds from "./pages/ManageAds";
import DashboardOverview from "./pages/DashboardOverview";
import AddItems from "./pages/AddItems";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Mesages from "./pages/Mesages";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<NotFound/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"products",
                element:<Products/>
            },
            {
                path:"product/:id",
                element:<Product/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"signup",
                element:<AuthProtectedRoute><Signup/></AuthProtectedRoute>
            },
            {
                path:"signin",
                element:<AuthProtectedRoute><Signin/></AuthProtectedRoute>
            },
            {
                path:"cart",
                element:<ProtectedRoute><Cart/></ProtectedRoute>
            },
            {
                path:"dashboard",
                element:<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>,
                children:[
                    {
                        path:"",
                        element:<DashboardOverview/>
                    },
                    {
                        path:"ads",
                        element:<AddItems/>
                    },
                    {
                        path:"/dashboard/ads/:id",
                        element:<AddItems/>
                    },
                    {
                        path:"manage",
                        element:<ManageAds/>
                    },
                    {
                        path:"orders",
                        element:<SeeOrders/>
                    },
                    {
                        path:"message",
                        element:<Mesages/>
                    }
                ]
            }
        ]
    }
])
export default router