import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRestaurantCategoryAction } from "../../Redux/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#191919",
  border: "2px solid #000",
  boxShadow: 24,
  trasition: "all linear 0.1s",
  p: 4,
};

const AdminModalDeleteConfirmCategory = ({
  open,
  onClose,
  selectedCategory,
  jwtToken,
}) => {
  const dispatch = useDispatch();

  const handleDeleteCategory = () => {
    if (selectedCategory?.id) {
      dispatch(deleteRestaurantCategoryAction(jwtToken, selectedCategory.id));

      // after delete success -> close modal:
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="w-[80vw] lg:w-[50vw]">
          <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
            Delete Confirmation
          </Typography>
          <div>
            <p>
              Are you sure you want to delete the category:
              {selectedCategory?.name} ?
            </p>
            <div className="mt-3 space-x-3 text-right">
              <Button variant="contained" color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleDeleteCategory} variant="contained">
                Delete
              </Button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AdminModalDeleteConfirmCategory;
