import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

const profileMenu = [
  {
    title: "My Profile",
    path: "",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Orders",
    path: "orders",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "Favorites",
    path: "favorites",
    icon: <FavoriteIcon />,
  },
  {
    title: "Address",
    path: "address",
    icon: <HomeIcon />,
  },
  {
    title: "Payments",
    path: "payment",
    icon: <PaymentIcon />,
  },
  {
    title: "Nofification",
    path: "notification",
    icon: <NotificationsIcon />,
  },
  {
    title: "Events",
    path: "events",
    icon: <EventIcon />,
  },
  {
    title: "Logout",
    path: "logout",
    icon: <LogoutIcon />,
  },
];

const ProfileNavbar = () => {
  const isLargeScreen = useMediaQuery("(min-with: 1024px)");

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/my-profile/${path}`);
  };

  return (
    <div className="sticky w-full h-full border-r border-gray-700">
      <List>
        <Divider orientation="vertical" />
        {profileMenu.map((item, index) => (
          <div key={index}>
            <ListItem>
              <ListItemButton onClick={() => handleNavigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default ProfileNavbar;
