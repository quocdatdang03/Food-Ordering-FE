import * as Yup from "yup";

export const createRestaurantValidation = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(5, "Name must be at least 5 characters"),
  description: Yup.string()
    .required("Description is required.")
    .min(5, "Description must be at least 5 characters"),
  cuisineType: Yup.string()
    .required("Cuisine Type is required.")
    .min(5, "Cuisine Type must be at least 5 characters"),
  openingHours: Yup.string().required("Opening Hours is required."),
  streetAddress: Yup.string().required("Street address is required."),
  city: Yup.string().required("City is required."),
  state: Yup.string().required("State/Province is required."),
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  facebook: Yup.string().required("Facebook is required."),
  instagram: Yup.string().required("Instagram is required."),
  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL."))
    .required("At least one image is required.")
    .min(1, "You must provide at least one image."),
});
