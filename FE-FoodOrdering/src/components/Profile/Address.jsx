import { Button, Card } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const Address = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-16">
      <h1 className="text-xl font-bold mb-5">My Favorite Restaurants</h1>
      <div className="grid grid-cols-3 gap-3 mx-20">
        {[1, 1, 1, 1, 1].map((item, index) => {
          return (
            <div key={index}>
              <Card>
                <div className="flex gap-3 p-5">
                  <HomeIcon />
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Home</h2>
                    <p className="text-gray-400 text-justify text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto sint officiis fuga illum voluptate illo? Quas optio
                      suscipit ratione sequi corporis rem quia debitis. Sapiente
                      culpa saepe adipisci laboriosam et.
                    </p>
                    {/* <Button sx={{ marginTop: 2 }} fullWidth variant="outlined">
                      Select
                    </Button> */}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Address;
