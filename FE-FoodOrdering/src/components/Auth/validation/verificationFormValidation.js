import * as Yup from "yup";

export const verificationFormValidation = Yup.object({
  verificationCode: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});
