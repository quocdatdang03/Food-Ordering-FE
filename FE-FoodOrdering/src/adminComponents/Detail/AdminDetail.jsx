import { Button, Card, CardContent, CardHeader, Chip } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const AdminDetail = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-x-5 mb-7">
        <h1 className="text-4xl md:text-5xl font-bold">
          Tasty VietNam Restaurant
        </h1>
        <Button
          variant="contained"
          color={true ? "error" : "success"}
          sx={{ color: "white" }}
        >
          {true ? "CLOSE" : "OPEN"}
        </Button>
      </div>

      <Card>
        <CardHeader title="Restaurant" />
        <CardContent>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Owner</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>Dat Dang</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Restaurant Name</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>Tasty VietNam Restaurant</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Cuisine Type</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>Vietnamese food</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Opening Hours</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <span>Mon-Sun 9.00 AM - 9.00 PM</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <div className="min-w-48">Status</div>
            <p className="text-gray-400">
              <span className="mr-5">-</span>
              <Chip
                color={true ? "success" : "error"}
                label={true ? "Open" : "Closed"}
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
                  <span>Da Nang</span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Street Address</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>72 Dinh Tien Hoang, Hai Chau</span>
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
                  <span>dat03122003@gmail.com</span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Mobile</div>
                <p className="text-gray-400">
                  <span className="mr-5">-</span>
                  <span>+8444198125</span>
                </p>
              </div>
              <div className="flex items-center mb-3">
                <div className="min-w-48">Social Media</div>
                <p className="text-gray-300 flex items-center">
                  <span className="mr-5">-</span>
                  <div className="flex items-center gap-x-3">
                    <a href="#">
                      <FacebookIcon fontSize="large" />
                    </a>
                    <a href="#">
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
