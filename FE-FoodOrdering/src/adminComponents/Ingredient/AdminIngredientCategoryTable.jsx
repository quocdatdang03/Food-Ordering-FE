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
    name: "Sauce",
  },
  {
    id: 2,
    name: "Bread",
  },
  {
    id: 3,
    name: "Protein",
  },
  {
    id: 4,
    name: "Vegetable",
  },
  {
    id: 5,
    name: "Dairy",
  },
];

const AdminIngredientCategoryTable = () => {
  return (
    <div className="lg:col-span-4">
      <Card>
        <CardHeader
          title="Ingredient Categories"
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminIngredientCategoryTable;
