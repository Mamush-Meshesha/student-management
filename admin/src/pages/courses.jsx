import { useState, useMemo, useEffect } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
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
import { getDepartement } from "../store/redux/student";

const Courses = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const department = useSelector((state) => state.student.department);
  console.table(department);

  useEffect(() => {
    dispatch(getDepartement());
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
    [validationErrors, department]
  );

  const handleCreateUser = ({ values, table }) => {
    // Validate user input
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});

    // Dispatch Redux action with correct structure
    dispatch(
      createStudentRequest({
        name: values.name,
        email: values.email,
        password: values.password,
        departmentId: values.departmentId,
        grade: values.grade,
      })
    );

    // Refresh student list after creation
    setTimeout(() => {
      dispatch(getStudentrequest());
    }, 500);

    table.setCreatingRow(null); // Close modal
  };

  const handleSaveUser = ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    setIsLoading(true);

    // Dispatch Redux Toolkit action for updating the student
    dispatch(updateStudentRequest(values));

    // Refresh student list after update
    setTimeout(() => {
      dispatch(getStudentrequest()); // Fetch updated students
      setIsLoading(false);
    }, 500);

    table.setEditingRow(null); // Close the edit modal
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteStudentRequest(row.original.id)); // Dispatching the delete request
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: department,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    getRowId: (row) => row.id,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
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
        Create New User
      </Button>
    ),
    state: {
      isLoading,
    },
  });

  return <MaterialReactTable table={table} />;
};

// Validation Function
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
