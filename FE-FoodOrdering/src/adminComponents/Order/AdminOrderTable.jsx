import React from "react";

import {
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const fakeDatas = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer1@gmail.com",
    price: 19923,
    name: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    status: "DELIVERED",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1025804/pexels-photo-1025804.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer1@gmail.com",
    price: 12399,
    name: "Hamburger",
    ingredients: ["Walnuts", "Cashews", "Peanuts"],
    status: "COMPLETED",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer1@gmail.com",
    price: 1929,
    name: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    status: "PENDING",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/551991/pexels-photo-551991.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer1@gmail.com",
    price: 1599,
    name: "Hamburger",
    ingredients: ["Walnuts", "Cashews"],
    status: "DELIVERED",
  },
];

const AdminOrderTable = () => {
  return (
    <Card>
      <CardHeader title="All Orders" />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Ingredients</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeDatas.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">
                  <img
                    className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                    src={item.image}
                    alt={item.image}
                  />
                </TableCell>
                <TableCell align="center">{item.customer}</TableCell>
                <TableCell align="center">${item.price}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    {item.ingredients?.map((item, index) => {
                      return <Chip key={index} label={item} />;
                    })}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.status}
                    sx={{ fontWeight: "bold", color: "white" }}
                    color={
                      item.status === "PENDING"
                        ? "info"
                        : item.status === "COMPLETED"
                        ? "secondary"
                        : "success"
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Button variant="text">STATUS</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default AdminOrderTable;
