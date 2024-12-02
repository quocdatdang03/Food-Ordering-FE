import React from "react";
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const fakeDatas = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer1@gmail.com",
    price: 199,
    foodName: "Hamburger",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer2@gmail.com",
    price: 1993,
    foodName: "Fried Chicken",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer3@gmail.com",
    price: 1929,
    foodName: "French Fried",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=600",
    customer: "customer4@gmail.com",
    price: 19129,
    foodName: "Yogurt",
  },
];

const RecentOrder = () => {
  return (
    <Card>
      <CardHeader title="Recent Order" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Customer</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Food Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeDatas.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">
                  <img
                    className="h-[3rem] w-[3rem] rounded-full object-cover object-center"
                    src={item.image}
                    alt={item.image}
                  />
                </TableCell>
                <TableCell align="right">{item.customer}</TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">{item.foodName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrder;
