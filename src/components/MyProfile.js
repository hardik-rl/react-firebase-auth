import React from "react";
import FormControl from "../shared/components/FormControl";
import FormLabel from "../shared/components/FormLabel";
import { useFormik } from "formik";
import { updateProfileSchema } from "./validation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app } from "../firebase";
import clsx from "clsx";
import { Spinner } from "flowbite-react";

const MyProfile = () => {
  const auth = getAuth(app);

  const { mutate: mutateSignupFn, isLoading: signUpIsLoading } = useMutation(
    (data) =>
      onAuthStateChanged(auth, (user) => {
        return updateProfile(user, {
          displayName: data.username,
          photoURL: "https://picsum.photos/200/300",
        });
      }),

    {
      onSuccess: () => {
        toast.success("Prodile Update Successfully!");
        setTimeout(() => {
          formik.handleReset();
        }, 3000);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: updateProfileSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutateSignupFn(values);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto mt-20">
        <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          My Profile
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
        <button
          type="submit"
          className={clsx(
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-6 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
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
          Save
        </button>
      </form>
    </>
  );
};

export default MyProfile;
