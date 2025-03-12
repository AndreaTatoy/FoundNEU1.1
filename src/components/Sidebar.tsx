import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import home from "../assets/icons/home.png";
import claims from "../assets/icons/a-claims.png";
import conflicts from "../assets/icons/a-conflicts.png";
import ai from "../assets/icons/ai-performance.png";
import reports from "../assets/icons/sa-reports.png";
import logs from "../assets/icons/sa-logs.png";
import usermanagement from "../assets/icons/sa-usermanagement.png";

const sidebarItems = {
  admin: [
    { label: "Home", icon: home },
    { label: "Items Claims", icon: claims },
    { label: "Ownership Conflicts", icon: conflicts },
    { label: "AI Performance", icon: ai },
  ],
  superAdmin: [
    { label: "Home", icon: home },
    { label: "Reports", icon: reports },
    { label: "Claim Logs", icon: logs },
    { label: "AI Performance", icon: ai },
    { label: "User Management", icon: usermanagement },
  ],
};

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const userEmail = session.user.email;
      const { data, error } = await supabase
        .from("institutional_users")
        .select("role")
        .eq("email", userEmail)
        .maybeSingle();

      if (error) {
        console.error("Error fetching role:", error.message);
      } else {
        setRole(data?.role || null);
      }
    };

    fetchUserRole();
  }, []);

  const items = role === "superAdmin" ? sidebarItems.superAdmin : sidebarItems.admin;

  return (
    <aside className="py-10 w-70 bg-white h-screen p-4 shadow-sm">
      <nav className="flex flex-col gap-12">
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => setActivePage(item.label)}
            className="ml-3 mt-5 flex items-center gap-5 text-gray-700 hover:text-yellow-500 cursor-pointer p-2 rounded-lg transition"
          >
            <img src={item.icon} alt={`${item.label} icon`} className="w-auto h-auto" />
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
