import * as Yup from "yup";

export const registerFormValidation = Yup.object({
  fullName: Yup.string()
    .min(5, "Full name must be at least 5 characters")
    .required("Full name is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm password do not match"
    ),
});
