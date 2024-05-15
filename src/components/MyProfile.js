import React, { useEffect, useState } from "react";
import FormControl from "../shared/components/FormControl";
import FormLabel from "../shared/components/FormLabel";
import { useFormik } from "formik";
import { updateProfileSchema } from "./validation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app, storage } from "../firebase";
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const MyProfile = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState();

  const { mutate: mutateSignupFn, isLoading: signUpIsLoading } = useMutation(
    async (data) => {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              // Update profile with username and photoURL
              await updateProfile(user, {
                displayName: data.username,
                photoURL: data.photoURL,
              });

              resolve(user);
            } catch (error) {
              reject(error);
            } finally {
              unsubscribe();
            }
          } else {
            reject(new Error("User is not authenticated"));
            unsubscribe();
          }
        });
      });
    },

    {
      onSuccess: () => {
        toast.success("Profile Name and Photo Updated Successfully!");
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
    onSubmit: async (values) => {
      try {
        let photoURL = null;
        // Upload photo to Firebase Storage if selected
        if (profilePic) {
          const photoURL = await uploadImageToStorage(profilePic);
          // Update profile with username and photoURL
          mutateSignupFn({ ...values, photoURL });
        }
      } catch (error) {
        toast.error(error.message);
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  // Function to upload image to Firebase Storage
  const uploadImageToStorage = async (imageFile) => {
    try {
      const storage = getStorage();
      const user = auth.currentUser;
      const fileRef = ref(storage, user.uid + '/profilesPics/' + imageFile.name);
      await uploadBytes(fileRef, imageFile);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.error("Error uploading image to storage:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoURL(user.photoURL);
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
          <div className='mb-3 text-blue-700 font-medium'>Upload Profile Picture</div>
        <div className='image-Card'>
          <input type='file' name="myImage" onChange={(e) => setProfilePic(e.target.files[0])} id='input-file' />
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
