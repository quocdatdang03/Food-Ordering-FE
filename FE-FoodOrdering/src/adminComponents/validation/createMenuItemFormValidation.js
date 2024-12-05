import * as Yup from "yup";

export const createMenuItemFormValidation = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(5, "Name must be at least 5 characters long."),
  description: Yup.string()
    .required("Description is required.")
    .min(5, "Description must be at least 5 characters long."),
  price: Yup.number()
    .required("Price is required.")
    .min(0, "Price must be greater than or equal to 0."),
  images: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL."))
    .required("At least one image is required.")
    .min(1, "You must provide at least one image."),
  isVegetarian: Yup.boolean().required("Vegetarian status is required."),
  isSeasonal: Yup.boolean().required("Seasonal status is required."),
  category: Yup.string().required("Category is required."),
  restaurant: Yup.string().required("Restaurant is required."),
  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient name is required."))
    .min(1, "You must provide at least one ingredient."),
});
