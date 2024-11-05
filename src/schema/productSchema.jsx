import * as yup from "yup";

export const productSchema = yup
  .object({
    name: yup
      .string()
      .required("Product Name is required")
      .min(3, "Minimum 3 characters length"),

    listing_price: yup.string().required("Listing Price is required"),
    min_selling_price: yup.string().required("Min. Selling Price is required"),
    // model: yup.string().required("Model is required"),
    // sku: yup.string().required("sku is required"),
    short_description: yup
      .string()
      .required("Short Description is required")
      .min(3, "Must be at least 3 characters."),

    whats_in_the_box: yup.string().required("Whats in the box is required"),
    status: yup.boolean(),
    stock_item: yup.boolean(),
    in_stock: yup.boolean(),
    on_discount: yup.boolean(),
    // .oneOf([true], "Must Accept Terms and Conditions"),
  })
  .required();

export const addressSchema = yup
  .object({
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
  })
  .required();
