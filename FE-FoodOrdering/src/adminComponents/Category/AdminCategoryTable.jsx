import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import AdminModalDeleteConfirmCategory from "./AdminModalDeleteConfirmCategory";

const AdminCategoryTable = () => {
  const { restaurantReducer } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const jwtToken = localStorage.getItem("jwtToken");

  const [open, setOpen] = useState(false);
  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantReducer.categories?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleOpenModal({ id: item.id, name: item.name })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Delete Confirm */}
      <AdminModalDeleteConfirmCategory
        open={open}
        onClose={handleCloseModal}
        selectedCategory={selectedCategory}
        jwtToken={jwtToken}
      />
    </>
  );
};

export default AdminCategoryTable;
