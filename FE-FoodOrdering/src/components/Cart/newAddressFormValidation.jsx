import * as Yup from "yup";

// Yup is used for validating form
export const newAddressFormValidation = Yup.object({
  streetAddress: Yup.string().required("Please enter your street address"),
  state: Yup.string().required("Please enter your state"),
  city: Yup.string().required("Please enter your city"),
});
