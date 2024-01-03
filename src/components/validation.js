import { object, string } from "yup";

export const signupSchema = object({
  email: string().trim().email().required(),
  password: string()
    .min(8, "Password must have at least 8 characters")
    .required(),
});

export const loginSchema = object({
  email: string().trim().email().required(),
  password: string().required()
});

export const forgotPasswordSchema = object({
  email: string().email().required(),
});