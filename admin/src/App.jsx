import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MiniDrawer from "./components/Sidebar"; // Import Sidebar
import AllStudents from "./pages/students";
import Courses from "./pages/courses";
import Departments from "./pages/departments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MiniDrawer />}>
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
