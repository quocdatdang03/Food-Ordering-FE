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
import React from "react";

import EditIcon from "@mui/icons-material/Edit";

const fakeDatas = [
  {
    id: 1,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: false,
  },
  {
    id: 2,
    name: "Lettuce",
    price: 19923,
    ingredientCategory: "Vegetable",
    availability: true,
  },
  {
    id: 3,
    name: "Onion slices",
    price: 19923,
    ingredientCategory: "Vegetable",
    availability: false,
  },
  {
    id: 4,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: true,
  },
  {
    id: 5,
    name: "Hamburger",
    price: 19923,
    ingredientCategory: "Bread",
    availability: true,
  },
];

const AdminIngredientTable = () => {
  return (
    <div className="lg:col-span-8">
      <Card>
        <CardHeader
          title="Ingredients"
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
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeDatas.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.ingredientCategory}
                  </TableCell>
                  <TableCell align="center">
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
    </div>
  );
};

export default AdminIngredientTable;
