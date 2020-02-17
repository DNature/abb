import * as yup from "yup";

export const emailNotLongEnough = "email must be at least 3 characters";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const invalidEmail = "email must be a valid email";
export const invalidCredentials = "invalid credentials";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
  password: registerPasswordValidation
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(invalidCredentials)
    .required("required")
    .max(255, invalidCredentials),
  password: yup
    .string()
    .min(3, invalidCredentials)
    .max(255, invalidCredentials)
    .required(invalidCredentials)
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
});
