import Login from "../sign/Login"
import Register from "../sign/Register"
import HomePage from "../pages/HomePage"
import Products from "../pages/Products"
import Basket from "../pages/Basket"
import AdminPanel from "../pages/AdminPanel"

export const publicPages = [
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]

export const privatePages = [
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/products",
        element:<Products/>
    },
    {
        path:"/Basket",
        element:<Basket/>
    },
    {
        path:"/adminPanel",
        element:<AdminPanel/>
    }
    

]
