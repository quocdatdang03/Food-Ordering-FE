import React from "react";

import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const fakeDatas = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    price: 19923,
    availability: false,
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    price: 1923,
    availability: true,
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    price: 923,
    availability: true,
  },
];

const AdminMenuTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Ingredients</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Availability</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeDatas.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <img
                  className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                  src={item.image}
                  alt={item.image}
                />
              </TableCell>
              <TableCell align="center">{item.title}</TableCell>
              <TableCell align="center">
                {item.ingredients.map((item) => item)}
              </TableCell>
              <TableCell align="center">${item.price}</TableCell>
              <TableCell align="center">
                {item.availability ? (
                  <Button variant="text" sx={{ color: "#26c665" }}>
                    In Stock
                  </Button>
                ) : (
                  <Button variant="text">Out of Stock</Button>
                )}
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminMenuTable;
