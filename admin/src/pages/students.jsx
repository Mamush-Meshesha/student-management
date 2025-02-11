import Card from "../components/cards/Card";
import Table from "../components/cards/Table";

export const AllStudents = () => {
      const courses = [
        { title: "Current Courses", count: 4 },
        { title: "Completed Courses", count: 8 },
        { title: "Upcoming Courses", count: 2 },
      ];
    return (
      <>
        <div className="grid grid-cols-1 my-6 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <Card key={index} title={course.title} count={course.count} />
          ))}
        </div>
        <Table />
      </>
    );
}

export default AllStudents