import { Button, Card, CardContent, CardHeader, Chip } from "@mui/material";
import React, { useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatusAction } from "../../Redux/Restaurant/Action";
import { useNavigate } from "react-router-dom";

const AdminDetail = () => {
  const { restaurantReducer } = useSelector((store) => store);
  const jwtToken = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(restaurantReducer.ownerRestaurant);
  });

  const handleChangeRestaurantStatus = () => {
    const restaurantId = restaurantReducer.ownerRestaurant?.id;
    dispatch(updateRestaurantStatusAction(jwtToken, restaurantId));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mb-7">
        <h1 className="text-4xl md:text-5xl font-bold">
          {restaurantReducer.ownerRestaurant?.name}
        </h1>
        <div className="flex items-center justify-around gap-3">
          <Button
            variant="contained"
            color={
              restaurantReducer.ownerRestaurant?.open ? "error" : "success"
            }
            sx={{ color: "white" }}
            onClick={handleChangeRestaurantStatus}
          >
            {restaurantReducer.ownerRestaurant?.open ? "CLOSE" : "OPEN"}
          </Button>
          <Button
            variant="contained"
            className="uppercase"
            color="info"
            style={{ color: "white" }}
            onClick={() => navigate("edit")}
          >
            Update
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader title="Restaurant" />
        <CardContent>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Owner</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>{restaurantReducer.ownerRestaurant?.owner?.fullName}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Restaurant Name</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>{restaurantReducer.ownerRestaurant?.name}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Cuisine Type</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>{restaurantReducer.ownerRestaurant?.cuisineType}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Opening Hours</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>{restaurantReducer.ownerRestaurant?.openingHours}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Status</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <Chip
                color={
                  restaurantReducer.ownerRestaurant?.open ? "success" : "error"
                }
                label={
                  restaurantReducer.ownerRestaurant?.open ? "Open" : "Closed"
                }
                sx={{ color: "white" }}
              />
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader title="Address" />
            <CardContent>
              <div className="flex items-center mb-3">
                <div className="min-w-48">City</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>
                    {restaurantReducer.ownerRestaurant?.address?.city}
                  </span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Street Address</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>
                    {restaurantReducer.ownerRestaurant?.address?.streetAddress}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-7">
          <Card>
            <CardHeader title="Contact" />
            <CardContent>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Email</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>
                    {
                      restaurantReducer.ownerRestaurant?.contactInformation
                        ?.email
                    }
                  </span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Mobile</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>
                    {
                      restaurantReducer.ownerRestaurant?.contactInformation
                        ?.phoneNumber
                    }
                  </span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Social Media</div>
                <p className="text-gray-300 flex items-center">
                  <span className="mr-5">-</span>
                  <div className="flex items-center gap-x-3">
                    <a
                      href={
                        restaurantReducer.ownerRestaurant?.contactInformation
                          ?.facebook
                      }
                    >
                      <FacebookIcon fontSize="large" />
                    </a>
                    <a
                      href={
                        restaurantReducer.ownerRestaurant?.contactInformation
                          ?.instagram
                      }
                    >
                      <InstagramIcon fontSize="large" />
                    </a>
                  </div>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;
