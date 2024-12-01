import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAction } from "../Redux/Auth/Action";

const adminSideBarItems = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "",
  },
  {
    title: "Orders",
    icon: <ShoppingBagIcon />,
    path: "orders",
  },
  {
    title: "Menu",
    icon: <MenuBookIcon />,
    path: "menus",
  },
  {
    title: "Category",
    icon: <CategoryIcon />,
    path: "categories",
  },
  {
    title: "Ingredients",
    icon: <SoupKitchenIcon />,
    path: "ingredients",
  },
  {
    title: "Events",
    icon: <EventIcon />,
    path: "events",
  },
  {
    title: "Details",
    icon: <InfoIcon />,
    path: "details",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    path: "logout",
  },
];

const AdminSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToPath = (path) => {
    if (path === "logout") {
      dispatch(logoutAction());
      navigate("/");
    } else {
      navigate(`/admin/restaurants/${path}`);
    }
  };

  return (
    <List>
      {adminSideBarItems.map((item, index) => (
        <ListItem
          key={item.title}
          onClick={() => handleNavigateToPath(item.path)}
        >
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AdminSideBar;
