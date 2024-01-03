import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordSchema } from "./validation";
import clsx from "clsx";
import { Spinner } from "flowbite-react";

const auth = getAuth(app);

const ForgotPassword = () => {
  const { mutate: mutateForgotPwdFn, isLoading: forgotPwdIsLoading } =
    useMutation((data) => sendPasswordResetEmail(auth, data.email), {
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        toast.success("Password Reset Successfully, Check Your Email");
        formik.resetForm();
      },
    });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateForgotPwdFn(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      method="post"
      action=""
      className="max-w-lg mx-auto mt-20"
    >
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Forgot Password
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={clsx({ "is-error": formik.errors.email })}
          name="email"
        />
        <FormLabel name="Email address" htmlFor="floating_email" />
        <span className="text-red-500 text-xs">{formik.errors.email}</span>
      </div>
      <button
        type="submit"
        className={clsx(
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
          { disabled: forgotPwdIsLoading }
        )}
      >
        {forgotPwdIsLoading && (
          <Spinner
            color="info"
            className="mr-2"
            aria-label="Info spinner example"
          />
        )}
        Sent Verification code
      </button>
    </form>
  );
};

export default ForgotPassword;
