import React, { useState } from "react";
import Headbar from "../components/Headbar";
import Sidebar from "../components/Sidebar";

// Import your admin pages
import Home from "./Home";
import ItemClaims from "./admin-pages/ItemClaims.tsx";
import OwnershipConflicts from "./admin-pages/OwnershipConflicts.tsx";
import AIPerformance from "./AIPerformance.tsx";

// Admin-specific page mapping
const pageComponents: { [key: string]: React.FC } = {
  Home,
  "Item Claims": ItemClaims,
  "Ownership Conflicts": OwnershipConflicts,
  "AI Performance": AIPerformance,
};

const AdminDashboard: React.FC = () => {
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

export default AdminDashboard;
