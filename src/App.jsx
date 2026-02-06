import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { getAccessToken, setupAxiosInterceptors } from "./Api/apiUtils";
import Login from './screens/login'
import Dashboard from "./screens/dashboard";
import AppLayout from "./layout/AppLayOut";
import TaskPage from "./screens/TaskPage";
import CreateTask from "./screens/CreateTask";
import Settings from "./screens/Settings/index.jsx";
import ApprovalPage from "./screens/approvalPage/index.jsx";
import ApprovalDashboard from "./screens/approvalDashboard/index.jsx";


const token = getAccessToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
setupAxiosInterceptors();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/approvalDashboard" element={<ApprovalDashboard />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/addTask" element={<CreateTask />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/approval" element={<ApprovalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;