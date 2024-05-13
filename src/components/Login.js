import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../shared/helpers/component/utils";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "./validation";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { Spinner } from "flowbite-react";

const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();

  const {
    mutate: mutateLoginFn,
    isLoading: loginIsLoading,
    // error: homehubLoginError,
    // isError: homehubLoginIsError,
  } = useMutation(
    (data) => signInWithEmailAndPassword(auth, data.email, data.password),
    {
      onSuccess: () => {
        toast.success("Login SuccessFully");
        if (auth?.currentUser) {
          setToken("AuthToken", auth?.currentUser?.accessToken);
          navigate("/");
        }
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
    validationSchema: loginSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateLoginFn(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-20">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        Login
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          className={clsx({ "is-error": formik.errors.email })}
        />
        <FormLabel name="Email address" htmlFor="floating_email" />
        <span className="text-red-500 text-xs">{formik.errors.email}</span>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          name="password"
          className={clsx({ "is-error": formik.errors.password })}
        />
        <FormLabel name="Password" htmlFor="floating_password" />
        <span className="text-red-500 text-xs">{formik.errors.password}</span>
      </div>
      <div className="mb-4 text-right">
        <Link
          className="text-indigo-600 text-md font-bold"
          to="/auth/forgot-password"
        >
          Forgot Password
        </Link>
      </div>
      <button
        type="submit"
        className={clsx(
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
          { disabled: loginIsLoading }
        )}
      >
        {loginIsLoading && (
          <Spinner
            color="info"
            className="mr-2"
            aria-label="Info spinner example"
          />
        )}
        Log in
      </button>
      <div className="mt-4 text-right">
        <a className="text-gray-600 text-sm" href="/auth/signup">
          Not registered yet? <strong className="text-indigo-600">Create an account</strong>
        </a>
      </div>
    </form>
  );
};

export default Login;
