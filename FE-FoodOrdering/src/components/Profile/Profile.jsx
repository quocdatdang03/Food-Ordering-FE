import React from "react";
import ProfileNavbar from "./ProfileNavbar";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Favorites from "./Favorites";
import Address from "./Address";
import Payments from "./Payments";
import Notification from "./Notification";
import Events from "./Events";

const Profile = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 sticky h-[100vh]">
        <ProfileNavbar />
      </div>
      <div className="col-span-9">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
