// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";
// import { getAccessToken, setupAxiosInterceptors } from "./Api/apiUtils";
// import Login from './screens/login'
// import Dashboard from "./screens/dashboard";
// import AppLayout from "./layout/AppLayOut";
// import TaskPage from "./screens/TaskPage";
// import CreateTask from "./screens/CreateTask";
// import Settings from "./screens/Settings/index.jsx";
// import ApprovalPage from "./screens/approvalPage/index.jsx";
// import ApprovalDashboard from "./screens/approvalDashboard/index.jsx";


// const token = getAccessToken();
// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
// setupAxiosInterceptors();

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route element={<AppLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/approvalDashboard" element={<ApprovalDashboard />} />
//           <Route path="/task" element={<TaskPage />} />
//           <Route path="/addTask" element={<CreateTask />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/approval" element={<ApprovalPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { getAccessToken, setupAxiosInterceptors } from "./Api/apiUtils";
import Login from './screens/login';
import Dashboard from "./screens/dashboard";
import AppLayout from "./layout/AppLayOut";
import TaskPage from "./screens/TaskPage";
import CreateTask from "./screens/CreateTask";
import Settings from "./screens/Settings/index.jsx";
import ApprovalPage from "./screens/approvalPage/index.jsx";
import ApprovalDashboard from "./screens/approvalDashboard/index.jsx";
import { useMemo } from 'react';

// Helper function to get user roles from localStorage
const getUserRoles = () => {
  try {
    const rolesData = localStorage.getItem('roles');
    if (!rolesData) return [];

    const parsed = JSON.parse(rolesData);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error('Failed to parse roles from localStorage:', error);
    return [];
  }
};

const App = () => {

  const token = getAccessToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  setupAxiosInterceptors();

  // Get user roles (lowercase for easy comparison)
  const userRoles = useMemo(() => {
    const roles = getUserRoles();
    return roles.map(role => role.role_name?.toLowerCase().trim() || '');
  }, []);

  const isAdmin = userRoles.includes('admin');
  const isApprover = userRoles.includes('approver');
  // Default to 'user' if no role found
  const isUser = userRoles.includes('user') || userRoles.length === 0;

  // Role-based route protection component
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    // If no specific roles required → allow all authenticated users
    if (allowedRoles.length === 0) {
      return children;
    }

    const hasPermission = allowedRoles.some(role =>
      userRoles.includes(role.toLowerCase())
    );

    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Layout */}
        <Route element={<AppLayout />}>

          {/* === Accessible to ALL Users (User, Approver, Admin) === */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <TaskPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addTask"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />

          {/* === Approver + Admin Only === */}
          <Route
            path="/approvalDashboard"
            element={
              <ProtectedRoute allowedRoles={['approver', 'admin']}>
                <ApprovalDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/approval"
            element={
              <ProtectedRoute allowedRoles={['approver', 'admin']}>
                <ApprovalPage />
              </ProtectedRoute>
            }
          />

          {/* === Admin Only === */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Catch unknown routes inside AppLayout → redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>

        {/* Catch all outside protected layout */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;