import * as Yup from "yup";

export const createEventFormValidation = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters"),
  location: Yup.string().required("Location is required."),
  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL."))
    .required("At least one image is required.")
    .min(1, "You must provide at least one image."),
  startedDate: Yup.date()
    .required("Start date is required.")
    .typeError("Start date must be a valid date."),
  endsDate: Yup.date()
    .required("End date is required.")
    .typeError("End date must be a valid date.")
    .min(Yup.ref("startedDate"), "End date must be after start date."),
});
