import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesRequest } from "../../store/redux/course";

const Table = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courses);

  useEffect(() => {
    dispatch(getCoursesRequest());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: false,
        size: 100,
      },
      {
        accessorKey: "code",
        header: "Code",
        muiTableHeadCellProps: { style: { color: "blue" } },
      },
      {
        accessorKey: "name",
        header: "Course Name",
        muiTableHeadCellProps: { style: { color: "green" } },
      },
      {
        accessorKey: "department.name",
        header: "Department",
        muiTableHeadCellProps: { style: { color: "purple" } },
        Cell: ({ row }) => row.original.department?.name || "N/A",
      },
      {
        accessorKey: "hour",
        header: "Hours",
      },
      {
        accessorKey: "grade",
        header: "Grade",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: courses || [], 
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    renderTopToolbar: () => (
      <div
        style={{
          fontWeight: "bold",
          padding: "10px",
          fontSize: "1.2rem",
          color: "#333",
        }}
      >
        My Courses
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
