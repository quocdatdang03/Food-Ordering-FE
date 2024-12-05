import * as Yup from "yup";

export const createIngredientCategoryFormValidation = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters"),
});
