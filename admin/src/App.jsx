import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MiniDrawer from "./components/Sidebar"; // Import Sidebar
import AllStudents from "./pages/students";
import Courses from "./pages/courses";
import Departments from "./pages/departments";
import Login from "./pages/login";
import ProtectedRoute from "./protect/protectRoute";
import PublicRoute from "./protect/publicRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MiniDrawer />}>
            <Route index element={<AllStudents />} />
            <Route path="students" element={<AllStudents />} />
            <Route path="courses" element={<Courses />} />
            <Route path="departments" element={<Departments />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
