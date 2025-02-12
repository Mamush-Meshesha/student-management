import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        {/* <Route path="login" element={<Login />} /> */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MiniDrawer />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllStudents />} />
          <Route path="students" element={<AllStudents />} />
          <Route path="courses" element={<Courses />} />
          <Route path="departments" element={<Departments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
