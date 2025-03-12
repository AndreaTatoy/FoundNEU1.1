import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.error('Error logging in:', error.message);
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        const userEmail = session.user.email;
        const emailDomain = userEmail?.split('@')[1];

        if (emailDomain !== 'neu.edu.ph') {
          alert('Only @neu.edu.ph emails are allowed!');
          await supabase.auth.signOut();
          return;
        }

        console.log('Session:', session);
        console.log('Querying for email:', userEmail);

        const { data, error } = await supabase
          .from('institutional_users')
          .select('role')
          .eq('email', userEmail)
          .maybeSingle();

        console.log('Data:', data);
        console.log('Error:', error);

        if (error) {
          console.error('Error fetching user role:', error.message);
          return;
        }

        if (!data) {
          alert('No role found for this user!');
          await supabase.auth.signOut();
          return;
        }

        if (data.role === 'admin') {
          navigate('/AdminDashboard');
        } else if (data.role === 'superAdmin') {
          navigate('/SuperAdminDashboard');
        } else {
          alert('Unauthorized role!');
          await supabase.auth.signOut();
        }
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center w-[800px]">
        <p className="text-2xl font-semibold mb-5">Welcome to New Era University's very own lost & found app!</p>
        <p className="text-gray-600 mb-6 text-sm">
          FoundNEU is NEU's official system for managing lost and found items on campus.
          This portal is specifically designed for admins to review reports, verify claims, and
          ensure items are returned to their rightful owners.
        </p>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center px-6 py-3 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 w-full max-w-[400px]"
        >
          <img src="/assets/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        <p className="text-xs text-gray-500 mt-4">
          By continuing you agree to NEUQuery’s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;