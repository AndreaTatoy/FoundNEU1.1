import React, { useState } from "react";
import Headbar from "../components/Headbar";
import Sidebar from "../components/Sidebar";

// Import your pages directly
import Home from "./Home";
import Reports from "./superadmin-pages/Reports";
import ClaimLogs from "./superadmin-pages/ClaimLogs";
import AIPerformance from "./AIPerformance";
import UserManagement from "./superadmin-pages/UserManagement";

const pageComponents: { [key: string]: React.FC } = {
  Home,
  Reports,
  "Claim Logs": ClaimLogs,
  "AI Performance": AIPerformance,
  "User Management": UserManagement,
};

const SuperAdminDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<keyof typeof pageComponents>("Home");

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Headbar */}
      <div className="h-16 w-full fixed top-0 z-10 bg-white shadow-md">
        <Headbar />
      </div>

      {/* Main content area with Sidebar + Content */}
      <div className="flex flex-grow pt-16">
        {/* Sidebar */}
        <div className="h-[calc(100vh-4rem)]">
          <Sidebar setActivePage={setActivePage} />
        </div>

        {/* Main content area */}
        <div className="flex-grow p-4">
          {React.createElement(pageComponents[activePage])}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
