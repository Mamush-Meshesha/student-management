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
import {
  createDepartmentRequest,
  deleteDepartmentRequest,
  getDepartement,
  updateDepartmentRequest,
} from "../store/redux/student";


const Department = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const department = useSelector((state) => state.student.department);

  useEffect(() => {
    dispatch(getDepartement());
  }, [dispatch]);
console.log("departments",department)
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", enableEditing: false, size: 80 },
      {
        accessorKey: "name",
        header: "Department Name",
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
          <Box sx={{ display: "flex", gap: 1 }}>
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
    [validationErrors]
  );

  const handleCreateDepartment = ({ values, table }) => {
    const errors = validateDepartment(values);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    dispatch(createDepartmentRequest({ name: values.name }));

    setTimeout(() => {
      dispatch(getDepartement());
    }, 500);

    table.setCreatingRow(null);
  };

  const handleSaveDepartment = ({ values, table }) => {
    const errors = validateDepartment(values);
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsLoading(true);
    dispatch(updateDepartmentRequest(values));

    setTimeout(() => {
      dispatch(getDepartement());
      setIsLoading(false);
    }, 500);

    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartmentRequest(row.original.id));
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: department || [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    getRowId: (row) => row.id,
    muiTableContainerProps: { sx: { minHeight: "500px" } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDepartment,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDepartment,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Create New Department</DialogTitle>
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
        <DialogTitle>Edit Department</DialogTitle>
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
        Create New Department
      </Button>
    ),
    state: { isLoading },
  });

  return <MaterialReactTable table={table} />;
};

// Validation Function
const validateDepartment = (department) => {
  const errors = {};
  if (!department.name) errors.name = "Department name is required";
  return errors;
};

export default Department;
