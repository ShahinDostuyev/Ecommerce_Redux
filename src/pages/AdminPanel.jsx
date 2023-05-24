import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Delete as DeleteIcon,Info } from "@mui/icons-material";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

function AdminPanel() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteParams, setDeleteParams] = useState(null);

  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    ["ProductsData"],
    () => {
      return axios.get("https://fakestoreapi.com/products");
    }
  );

  const mutation = useMutation({
    mutationFn: async (data) => {
      let result = await axios.delete(`https://fakestoreapi.com/products/${data}`);
      return result;
    },
    onSuccess: (data) => {
      refetch();
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  const deleteProduct = (params) => {
    mutation.mutate(params.id);
    setConfirmDialogOpen(false);
    console.log("Deleted category id: ", params.id);
  };

  const handleDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleDeleteClick = (params) => {
    setDeleteParams(params);
    setConfirmDialogOpen(true);
  };


  const confirm = (params) => {
    console.log("Confirmation started");

    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(params),
        },
        {
          label: "No",
          onClick: () => console.log("Delete operation is canceled"),
        },
      ],
    });
  };

  const columns = [
    { field: "id", headerName: "Id", width: 50 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "rating", headerName: "Rating", width: 100, valueFormatter: ({ value }) => value.rate },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => (
        <Button
          onClick={() => handleDeleteClick(params)}
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          color="error"
        >
          <DeleteIcon />
        </Button>
      ),
    },

   
  ];

 
  return (
    <>
     
      {isLoading && <CircularProgress />}
      {mutation.isLoading && <CircularProgress />}
      {isSuccess && (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid rows={data?.data} columns={columns} />
        </div>
      )}
      <Dialog open={confirmDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this category?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => deleteProduct(deleteParams)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminPanel;