import React from "react";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="max-w-[500px] p-9 flex flex-col justify-center items-center shadow-xxl mx-5">
        <div className="mb-5">
          <CheckCircleIcon sx={{ fontSize: 58, color: "#4ec153" }} />
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <h1 className="font-bold text-2xl">Payment Succeeded!</h1>
          <p className="text-sm text-gray-400 text-center">
            Your transaction was completed successfully. Thank you for your
            purchase!
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{
              background: "#4ec153",
              marginTop: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Go to Home Page
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
