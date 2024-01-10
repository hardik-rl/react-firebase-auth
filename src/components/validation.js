import { object, ref, string } from "yup";

export const signupSchema = object({
  username: string().required(),
  email: string().trim().email().required(),
  password: string()
    .min(8, "Password must have at least 8 characters")
    .required(),
  password_confirmation: string()
    .required("Confirm Password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export const loginSchema = object({
  email: string().trim().email().required(),
  password: string().required(),
});

export const forgotPasswordSchema = object({
  email: string().email().required(),
});

export const resetPasswordSchema = object({
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: string()
    .required("Confirm Password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export const updateProfileSchema = object({
  username: string().required(),
});
