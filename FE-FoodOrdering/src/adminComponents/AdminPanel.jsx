import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";
import AdminDashBoard from "./DashBoard/AdminDashBoard";
import AdminOrder from "./Order/AdminOrder";
import AdminMenu from "./Menu/AdminMenu";
import AdminCategory from "./Category/AdminCategory";
import AdminIngredient from "./Ingredient/AdminIngredient";
import AdminEvent from "./Event/AdminEvent";
import AdminDetail from "./Detail/AdminDetail";
import { AdminCreateMenuItemForm } from "./Menu/AdminCreateMenuItemForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantByIdAction,
  getRestaurantCategoriesAction,
} from "../Redux/Restaurant/Action";
import { getIngredientsOfRestaurantAction } from "../Redux/Ingredient/Action";
import { getMenuItemsByRestaurantIdAction } from "../Redux/Menu/Action";
import { AdminEditMenuItemForm } from "./Menu/AdminEditMenuItemForm";
import { getRestaurantOrdersAction } from "../Redux/RestaurantOrder/Action";
import AdminOrderDetails from "./Order/AdminOrderDetails";
import UpdateRestaurantForm from "./UpdateRestaurantForm";

const drawerWidth = 350;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isMobile ? 0 : open ? 0 : `-${drawerWidth}px`,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen is md
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const jwtToken = localStorage.getItem("jwtToken");
  const { restaurantReducer } = useSelector((store) => store);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const restaurantId = restaurantReducer.ownerRestaurant?.id;
    dispatch(getRestaurantCategoriesAction(restaurantId));

    dispatch(getIngredientsOfRestaurantAction(jwtToken, restaurantId));

    const requestDataOfMenuItems = {
      restaurantId: restaurantId,
      isVegetarian: false,
      isNonVegetarian: false,
      isSeasonal: false,
      foodCategory: "",
    };
    dispatch(getMenuItemsByRestaurantIdAction(requestDataOfMenuItems));

    const requestDataOfOrders = {
      restaurantId: restaurantId,
      orderStatus: "",
    };
    dispatch(getRestaurantOrdersAction(jwtToken, requestDataOfOrders));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open && !isMobile}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && !isMobile && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Restaurant Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: isMobile ? "#191c24" : "none",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"} // Switch variant based on screen size
        anchor="left"
        open={open}
        onClose={handleDrawerClose} // Required for "temporary" mode
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Admin side bar items */}
        <AdminSideBar />
      </Drawer>
      <Main open={open} isMobile={isMobile}>
        <DrawerHeader />
        <Routes>
          <Route path="" element={<AdminDashBoard />} />
          <Route path="/orders" element={<AdminOrder />} />
          <Route path="/orders/:orderId" element={<AdminOrderDetails />} />
          <Route path="/menus" element={<AdminMenu />} />
          <Route path="/menus/add-menu" element={<AdminCreateMenuItemForm />} />
          <Route
            path="/menus/edit-menu/:id"
            element={<AdminEditMenuItemForm />}
          />
          <Route path="/categories" element={<AdminCategory />} />
          <Route path="/ingredients" element={<AdminIngredient />} />
          <Route path="/events" element={<AdminEvent />} />
          <Route path="/details" element={<AdminDetail />} />
          <Route path="/details/edit" element={<UpdateRestaurantForm />} />
        </Routes>
      </Main>
    </Box>
  );
};

export default AdminPanel;
