import { useDispatch, useSelector } from "react-redux";
import Card from "./components/cards/Card";
import Table from "./components/cards/Table";
import Layout from "./layouts/default";



function App() {
  const courses = [
    { title: "Current Courses", count: 4 },
    { title: "Completed Courses", count: 8 },
    { title: "Upcoming Courses", count: 2 },
  ];
 
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  console.log(user.name)
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <h1 className="py-3 text-3xl">Welcome {user.name}!</h1>

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
