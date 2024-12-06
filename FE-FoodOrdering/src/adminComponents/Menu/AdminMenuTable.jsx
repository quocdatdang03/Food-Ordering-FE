import React, { useState } from "react";

import {
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuItemAvailableAction } from "../../Redux/Menu/Action";
import AdminModalDeleteConfirmMenuItem from "./AdminModalDeleteConfirmMenuItem";
import { useNavigate } from "react-router-dom";

const AdminMenuTable = () => {
  const { menuItemReducer } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const navigate = useNavigate();

  const handleUpdateStockStatus = (foodId) => {
    dispatch(updateMenuItemAvailableAction(jwtToken, foodId));
  };

  const [open, setOpen] = useState(false);
  const handleOpenModal = (category) => {
    setSelectedMenuItem(category);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedMenuItem(null);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Ingredients</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Availability</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItemReducer.menuItems?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img
                    className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                    src={item.images?.[0]}
                    alt={item.name}
                  />
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">
                  {item.ingredients?.map((ingredient) => {
                    return (
                      <Chip
                        className="mx-1 my-1"
                        key={ingredient.id}
                        label={ingredient.name}
                        size="medium"
                      />
                    );
                  })}
                </TableCell>
                <TableCell align="center">${item.price}</TableCell>
                <TableCell align="center">
                  {item?.available ? (
                    <Button
                      variant="text"
                      sx={{ color: "#26c665" }}
                      onClick={() => handleUpdateStockStatus(item.id)}
                    >
                      In Stock
                    </Button>
                  ) : (
                    <Button
                      variant="text"
                      onClick={() => handleUpdateStockStatus(item.id)}
                    >
                      Out of Stock
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <div className="flex items-center">
                    <IconButton
                      onClick={() => navigate("edit-menu/" + item.id)}
                    >
                      <EditIcon color="info" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenModal(item)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal Delete Confirm */}
      <AdminModalDeleteConfirmMenuItem
        open={open}
        onClose={handleCloseModal}
        selectedMenuItem={selectedMenuItem}
        jwtToken={jwtToken}
      />
    </>
  );
};

export default AdminMenuTable;
