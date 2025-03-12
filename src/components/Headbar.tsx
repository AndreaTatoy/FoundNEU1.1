import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/icons/FoundNEU.png';
import defaultAvatar from '../assets/icons/account-circle.png';
import notificationIcon from '../assets/icons/bell.png';
import dropdownIcon from '../assets/icons/dropdown.png';

interface User {
  name: string;
  role: string;
}

const Headbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch User Data from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('No active session found');

        setSession(session);

        const userEmail = session.user.email;
        const { data, error } = await supabase
          .from('institutional_users')
          .select('name, role')
          .eq('email', userEmail)
          .maybeSingle();

        if (error) throw error;
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout Function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
      alert('Failed to log out. Please try again.');
    } else {
      window.location.replace('/'); // Ensures proper redirect with a clean session
    }
  };

  return (
    <header className="fixed top-2 left-0 w-full bg-white h-18 flex justify-between items-center px-6 shadow-md ">
      {/* Logo */}
      <div className="flex items-center gap-2 ml-5">
        <img src={logo} alt="Logo" className="h-6 w-auto" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <img
          src={notificationIcon}
          alt="Notifications"
          className="h-9 w-9 cursor-pointer"
          onClick={() => console.log('Notifications clicked')}
        />

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : user ? (
          <>
            {/* User Info */}
            <div className="hidden md:flex flex-col text-right">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </div>

            {/* Profile Picture */}
            <img
              src={session?.user?.user_metadata?.avatar_url || defaultAvatar}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border"
            />
          </>
        ) : (
          <p className="text-gray-500">No user data available</p>
        )}

        <img
          src={dropdownIcon}
          alt="Dropdown"
          className="w-3 h-3/4 cursor-pointer mr-5"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 bg-white border shadow-md rounded-md w-40 z-50">
            <ul className="flex flex-col">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => alert('Go to Profile')}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Headbar;
