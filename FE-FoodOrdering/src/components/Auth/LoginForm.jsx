import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8 rounded shadow-md shadow-red-300">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Sign In
        </h1>
        <form className="space-y-4 md:space-y-6 text-white" action="#">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="text"
              name="email"
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // value={formik.values.streetAddress}
              // error={
              //   formik.errors.streetAddress &&
              //   Boolean(formik.errors.streetAddress)
              // }
              // helperText={
              //   formik.errors.streetAddress && formik.errors.streetAddress
              // }
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
              type="text"
              name="password"
            />
          </div>
          {/* <div className="flex items-center justify-between"></div> */}
          <Button fullWidth variant="contained" sx={{ paddingY: 1 }}>
            Sign in
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <span
              onClick={() => navigate("/account/register")}
              className="font-medium text-primary-600 hover:underline text-white cursor-pointer"
            >
              Sign up
            </span>
          </p>
          <p className="text-center">
            <span className="cursor-pointer hover:underline text-pink-500">
              Forgot password?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
