import { useState, useMemo } from "react";
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
  Tooltip,
} from "@mui/material";
import { fakeData, usStates } from "../../layouts/fakedata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [users, setUsers] = useState(fakeData);
  const [isLoading, setIsLoading] = useState(false);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Id", enableEditing: false, size: 80 },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, firstName: undefined }),
        },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.lastName,
          helperText: validationErrors?.lastName,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, lastName: undefined }),
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          onFocus: () =>
            setValidationErrors({ ...validationErrors, email: undefined }),
        },
      },
      {
        accessorKey: "state",
        header: "State",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => openDeleteConfirmModal(row)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ),
        enableEditing: false,
        size: 120,
      },
    ],
    [validationErrors]
  );

  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...values, id: (Math.random() + 1).toString(36).substring(7) },
      ]);
      table.setCreatingRow(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === values.id ? values : user))
      );
      table.setEditingRow(null);
      setIsLoading(false);
    }, 1000);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== row.original.id)
      );
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: users,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
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
  if (!user.firstName) errors.firstName = "First name is required";
  if (!user.lastName) errors.lastName = "Last name is required";
  if (!user.email) errors.email = "Email is required";
  return errors;
};

export default Table;
