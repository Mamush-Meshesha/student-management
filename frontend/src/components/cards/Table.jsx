import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const data = [
  {
    code: "CS12",
    name: "Introduction to CS",
    hour: "4 hrs",
    grade: "A",
    status: "Completed",
  },
  {
    code: "C32",
    name: "Introduction to Mathematics",
    hour: "9 hrs",
    grade: "A",
    status: "In progress",
  },
];

const Table = () => {
  const columns = useMemo(
    () => [
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
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: false,
    renderTopToolbar: () => (
      <div
        style={{
          fontWeight: "bold",
          padding: "10px",
        }}
      >
        My Courses
      </div>
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Table;
