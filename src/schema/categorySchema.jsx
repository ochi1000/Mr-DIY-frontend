import * as yup from "yup";

export const categorySchema = yup
  .object({
    name: yup
      .string()
      .required("Category name is required")
      .min(3, "Minimum 3 characters length"),
    description: yup.string().required("Category description is required"),

    // email: yup
    //   .string()
    //   .email("Kindly provide a valid email address")
    //   .required("Email is required"),
    // password: yup
    //   .string()
    //   .required("password is required")
    //   .min(8, "Must be at least 8 characters."),
    // acceptTerms: yup
    //   .boolean()
    //   .oneOf([true], "Must Accept Terms and Conditions"),
  })
  .required();
