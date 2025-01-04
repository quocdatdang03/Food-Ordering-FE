import * as Yup from "yup";

export const forgotPasswordFormValidation = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});
