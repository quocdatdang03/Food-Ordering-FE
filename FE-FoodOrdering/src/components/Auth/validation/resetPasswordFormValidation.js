import * as Yup from "yup";

export const resetPasswordFormValidation = Yup.object({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmNewPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Password and Confirm password do not match"
    ),
});
