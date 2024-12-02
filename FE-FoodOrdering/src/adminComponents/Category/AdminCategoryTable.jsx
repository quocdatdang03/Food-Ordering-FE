import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const fakeDatas = [
  {
    id: 1,
    name: "Pizza",
  },
  {
    id: 2,
    name: "Burger",
  },
  {
    id: 3,
    name: "Chicken",
  },
  {
    id: 4,
    name: "Yogurt",
  },
  {
    id: 5,
    name: "Steak",
  },
];

const AdminCategoryTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
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
              <TableCell align="left">{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminCategoryTable;
