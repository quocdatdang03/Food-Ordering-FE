import React from "react";

import {
  Button,
  Card,
  CardHeader,
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
    price: 199,
    title: "Hamburger",
    availability: true,
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 1993,
    title: "Fried Chicken",
    availability: false,
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 1929,
    title: "French Fried",
    availability: false,
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 19129,
    title: "Yogurt",
    availability: true,
  },
];

const RecentAddedMenu = () => {
  return (
    <Card>
      <CardHeader
        title="Recently Added Menu"
        action={
          <IconButton>
            <EditIcon />
          </IconButton>
        }
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeDatas.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <img
                    className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                    src={item.image}
                    alt={item.image}
                  />
                </TableCell>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  {item.availability ? (
                    <Button variant="text" sx={{ color: "#26c665" }}>
                      In Stock
                    </Button>
                  ) : (
                    <Button variant="text">Out of Stock</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentAddedMenu;
