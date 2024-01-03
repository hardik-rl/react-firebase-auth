import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { signupSchema } from "./validation";

const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: mutateSignupFn } = useMutation(
    (data) => createUserWithEmailAndPassword(auth, data.email, data.password),
    {
      onSuccess: () => {
        sendEmailVerification(auth.currentUser);
        toast.success("Verification Email Sent to Your Email!");
        setTimeout(() => {
          formik.handleReset();
        }, 3000);
        navigate("/auth/login");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateSignupFn(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-20">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        SignUp
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="email"
          onChange={formik.handleChange}
          name="email"
          value={formik.values.email}
        />
        <FormLabel name="Email address" htmlFor="floating_email" />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="password"
          onChange={formik.handleChange}
          name="password"
          value={formik.values.password}
        />
        <FormLabel name="Password" htmlFor="floating_password" />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <div className="mb-4 text-right">
        <Link className="text-indigo-600 text-md" to="/auth/login">
          Already have an account? <strong>Login</strong>
        </Link>
      </div>
    </form>
  );
};

export default Signup;
