import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './screens/login'
import Dashboard from "./screens/dashboard";
import AppLayout from "./layout/AppLayOut";
import TaskPage from "./screens/TaskPage";
import CreateTask from "./screens/CreateTask";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/addTask" element={<CreateTask />} />
          {/* <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;