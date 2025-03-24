import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "./components/AdminPage";
import UserDashboard from "./components/UserDashboard";
import UsersPointsTable from "./components/UsersPointsTable";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/rewards" element={<AdminPage />} />
                    <Route path="/pointstable" element={<UsersPointsTable />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
