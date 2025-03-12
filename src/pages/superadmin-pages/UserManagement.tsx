import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from Supabase when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('institutional_users')
          .select('id, name, email, role');

        if (error) {
          console.error('Error fetching users:', error.message);
          setError(error.message);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching users:', err);
        setError('Unexpected error fetching users.');
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Update the user's role in Supabase and then update local state
  const updateUserRole = async (userId: string, newRole: string) => {
    setError(null);
    try {
      const { error } = await supabase
        .from('institutional_users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating role:', error.message);
        setError(error.message);
        return;
      }

      // Update local state to reflect the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error('Unexpected error updating user role:', err);
      setError('Unexpected error updating user role.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      {loading ? (
        <p className="mt-4">Loading users...</p>
      ) : (
        <div className="overflow-x-auto mt-4 border rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="border rounded p-2"
                    >
                      <option value="user">Eranian</option>
                      <option value="admin">Admin</option>
                      <option value="superAdmin">Super Admin</option>
                    </select>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="text-yellow-500">Suspend</button>
                    <button className="text-red-500">Ban</button>
                    <button className="text-gray-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
