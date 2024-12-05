import * as Yup from "yup";

export const createIngredientFormValidation = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters long."),
  category: Yup.string().required("Category is required."),
});
