import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Home from './pages/Home';
import Reports from './pages/superadmin-pages/Reports';
import ClaimLogs from './pages/superadmin-pages/ClaimLogs';
import AIPerformance from './pages/AIPerformance';
import UserManagement from './pages/superadmin-pages/UserManagement';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="reports" element={<Reports />} />
            <Route path="claim-logs" element={<ClaimLogs />} />
            <Route path="ai-performance" element={<AIPerformance />} />
            <Route path="user-management" element={<UserManagement />} />
          </Route>
      </Routes> 
    </Router>
  );
};

export default App;
