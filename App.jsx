import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext  } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import UpdateRestaurant from "./pages/UpdateRestaurant";

function App() {
    const { auth } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin/dashboard" element={
                auth && auth.role === "admin" ? (
                    <AdminDashboard/>
                ) : (
                    <Navigate to="/" />
                )
            }
            />
            <Route path="/admin/restaurants/update/:id" 
            element={
                auth && auth.role === "admin" ? (
                    <UpdateRestaurant/>
                ) : (
                    <Navigate to="/" />
                )
            }
            /> 
            <Route path="/customer/dashboard" 
            element={
                auth && auth.role === "customer" ? (
                    <CustomerDashboard/>
                ) : (
                    <Navigate to="/" />
                )
            }
            />
        </Routes>
    );
}

export default App;
