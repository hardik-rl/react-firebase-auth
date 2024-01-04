import React, { useEffect, useState } from "react";
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordSchema } from "./validation";
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState(null);
  const getCurrentUrl = new URLSearchParams(window.location.search);
  const actionCode = getCurrentUrl.get("oobCode");
  const { mutate: mutateForgotPwdFn, isLoading: forgotPwdIsLoading } =
    useMutation(() => verifyPasswordResetCode(auth, actionCode), {
      onError: (error) => {
        toast.error(error.response.data.message);
      },
      onSuccess: () => {
        confirmPasswordReset(auth, actionCode, newPassword).then(() => {
          toast.success("Password Reset Successfully");
          formik.resetForm();
          navigate("/auth/login");
        });
      },
    });

  const formik = useFormik({
    initialValues: {
      // email: "",
      password: "",
      // password_confirmation: "",
    },
    validationSchema: resetPasswordSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateForgotPwdFn(values);
      setNewPassword(values.password);
    },
  });

  useEffect(() => {
    if (!actionCode) {
      return navigate("/auth/login");
    }
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      method="post"
      action=""
      className="max-w-lg mx-auto mt-20"
    >
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Reset Password
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={clsx({ "is-error": formik.errors.password })}
          name="password"
        />
        <FormLabel name="Password" htmlFor="password" />
        <span className="text-red-500 text-xs">{formik.errors.password}</span>
      </div>
      {/* <div className="relative z-0 w-full mb-5 group">
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
      </div> */}
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
        Reset
      </button>
    </form>
  );
};

export default ResetPassword;
