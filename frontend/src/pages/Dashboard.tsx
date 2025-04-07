import React from "react";
import {useAuth} from "../hooks/useAuth.ts";
import AdminDashboard from "../components/dashboard/AdminDashboard.tsx";

const Dashboard: React.FC = () => {
    const {user} = useAuth();
    const userRole = user?.role;

    return (
        <>
            {userRole === "admin" && <AdminDashboard/>}
            {!userRole && <div>Loading...</div>}
        </>
    );
};

export default Dashboard;
