import { useState, useMemo, useEffect } from "react";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudentRequest,
  deleteStudentRequest,
  getStudentrequest,
  updateStudentRequest,
} from "../store/redux/student";
import { createCouserRequest, deleteCouserRequest, getCoursesRequest, updateCouserRequest } from "../store/redux/course";

const Courses = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.courses);
  const department = useSelector((state) => state.student.department);
  console.table(course);

  useEffect(() => {
    dispatch(getCoursesRequest());
  }, [dispatch]);
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },

      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, name: undefined }),
        },
      },

      {
        accessorKey: "departmentId",
        header: "Department",
        editVariant: "select",
        editSelectOptions: department.map((dept) => ({
          value: dept.id,
          label: dept.name,
        })),
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.departmentId,
          helperText: validationErrors?.departmentId,
        },
      },
      {
        accessorKey: "code",
        header: "code",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.code,
          helperText: validationErrors?.code,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, grade: undefined }),
        },
      },

      {
        accessorKey: "actions",
        header: "Actions",
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "", gap: 1 }}>
            <IconButton
              color="primary"
              onClick={() => table.setEditingRow(row)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [validationErrors, course]
  );

const handleCreateCourse = ({ values, table }) => {
  const newValidationErrors = validateCourse(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }

  setValidationErrors({});

  dispatch(
    createCouserRequest({
      name: values.name,
      departmentId: values.departmentId,
      code: values.code,
    })
  );

  setTimeout(() => {
    dispatch(getCoursesRequest());
  }, 500);

  table.setCreatingRow(null);
};

const validateCourse = (course) => {
  const errors = {};
  if (!course.name) errors.name = "Name is required";
  if (!course.departmentId) errors.departmentId = "Department is required";
  if (!course.code) errors.code = "Code is required";
  return errors;
};


const handleSaveCourse = ({ values, table }) => {
  const newValidationErrors = validateCourse(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }

  setValidationErrors({});
  setIsLoading(true);

  dispatch(updateCouserRequest(values)); 

  setTimeout(() => {
    dispatch(getCoursesRequest()); 
    setIsLoading(false);
  }, 500);

  table.setEditingRow(null);
};
  
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCouserRequest(row.original.id)); 
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: course,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    getRowId: (row) => row.id,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCourse,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCourse,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create Course</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New Course
      </Button>
    ),
    state: {
      isLoading,
    },
  });

  return <MaterialReactTable table={table} />;
};

const validateUser = (user) => {
  const errors = {};
  if (!user.name) errors.name = "Name is required";
  if (!user.email) errors.email = "Email is required";
  if (!user.password) errors.password = "Password is required";
  if (user.grade === undefined || user.grade < 0)
    errors.grade = "Grade must be a positive number";
  return errors;
};

export default Courses;
