import * as Yup from "yup";

export const loginValidation = Yup.object({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|;:'",.<>\/\\`~]).{8,}$/,
      "Password must be at least 8 characters and include 1 uppercase, lowercase, number, and  1 special character"
    )
    .required("Required"),
});

export const registerValidation = Yup.object({
  name: Yup.string()
    .matches(
      /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/,
      "Full name must contain only letters and spaces (at least 2 characters per name)"
    )
    .required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|;:'",.<>\/\\`~]).{8,}$/,
      "Password must be at least 8 characters and include 1 uppercase, lowercase, number, and  1 special character"
    )
    .required("Password is required"),
});

export const modalValidation = Yup.object({
  todoName: Yup.string().required("Todo name is Required"),
  todoDescription: Yup.string(),
  todoDeadLine: Yup.string(),
});
