import { useDispatch, useSelector } from "react-redux";
import Card from "./components/cards/Card";
import Table from "./components/cards/Table";
import Layout from "./layouts/default";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; 


function App() {
  const courses = [
    { title: "Current Courses", count: 4 },
    { title: "Completed Courses", count: 8 },
    { title: "Upcoming Courses", count: 2 },
  ];
  const dispatch = useDispatch()
 
  // const navigate = useNavigate()
  //  useEffect(() => {
  //    const jwtToken = Cookies.get("jwt");
  
  //    if (jwtToken) {
  //      try {
  //        const decodedToken = jwtDecode(jwtToken); 
  //        if (!decodedToken) {
  //          navigate("/"); 
  //        }
  //      } catch (error) {
  //        console.error("Error decoding token:", error);
  //        navigate("/home"); 
  //      }
  //    } else {
  //      navigate("/"); 
  //    }
  //  }, [navigate]);
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <h1 className="py-3 text-3xl">Welcome {}!</h1>

          <div className="grid grid-cols-1 my-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <Card key={index} title={course.title} count={course.count} />
            ))}
          </div>
          <Table />
        </div>
      </Layout>
    </>
  );
}

export default App;
