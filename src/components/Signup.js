import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { signupSchema } from "./validation";
import clsx from "clsx";
import { Spinner } from "flowbite-react";

const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: mutateSignupFn, isLoading: signUpIsLoading } = useMutation(
    (data) =>
      createUserWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          return updateProfile(userCredential.user, {
            displayName: data.username,
          });
        }
      ),
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
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: signupSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateSignupFn(values, { displayName: values.username });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-20">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        SignUp
      </h1>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="text"
          onChange={formik.handleChange}
          name="username"
          className={clsx({ "is-error": formik.errors.username })}
          value={formik.values.username}
        />
        <FormLabel name="Username" htmlFor="floating_username" />
        <span className="text-red-500 text-xs">{formik.errors.username}</span>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="email"
          onChange={formik.handleChange}
          name="email"
          className={clsx({ "is-error": formik.errors.email })}
          value={formik.values.email}
        />
        <FormLabel name="Email address" htmlFor="floating_email" />
        <span className="text-red-500 text-xs">{formik.errors.email}</span>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="password"
          onChange={formik.handleChange}
          name="password"
          className={clsx({ "is-error": formik.errors.password })}
          value={formik.values.password}
        />
        <FormLabel name="Password" htmlFor="floating_password" />
        <span className="text-red-500 text-xs">{formik.errors.password}</span>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="password"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          className={clsx({ "is-error": formik.errors.password_confirmation })}
          name="password_confirmation"
        />
        <FormLabel
          name="Confirmation Password"
          htmlFor="password_confirmation"
        />
        <span className="text-red-500 text-xs">
          {formik.errors.password_confirmation}
        </span>
      </div>
      <div className="mb-4 text-right">
        <Link
          className="text-gray-600 text-md"
          to="/auth/signup-with-mobile-number"
        >
          signup with <strong className="text-indigo-600">Mobile Number</strong>
        </Link>
      </div>
      <button
        type="submit"
        className={clsx(
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
          { disabled: signUpIsLoading }
        )}
      >
        {signUpIsLoading && (
          <Spinner
            color="info"
            className="mr-2"
            aria-label="Info spinner example"
          />
        )}
        SignUp
      </button>

      <div className="mt-4 text-right">
        <Link className="text-gray-600 text-sm" to="/auth/login">
          Already have an account? <strong className="text-indigo-600">Login</strong>
        </Link>
      </div>
    </form>
  );
};

export default Signup;
