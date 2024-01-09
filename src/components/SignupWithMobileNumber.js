import React, { useState } from "react";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app);
const SignupWithMobileNumber = () => {
  const navigate = useNavigate();
  const [mobileNo, setMobileNo] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container"
    );

    try {
      const { verificationId } = await signInWithPhoneNumber(
        auth,
        mobileNo,
        recaptchaVerifier
      );

      navigate(`/auth/verify-otp/${verificationId}`);
    } catch (error) {
      toast.error(error);
      console.log({ error });
    }
  };

  return (
    <form className="max-w-lg mx-auto mt-20">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">
        Signup with Mobile
      </h1>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          onChange={(e) => setMobileNo(e.target.value)}
          name="number"
        />
        <FormLabel name="Enter a Number" htmlFor="floating_number" />
      </div>
      {mobileNo && <div id="recaptcha-container" className="mb-6"></div>}

      <button
        type="submit"
        onClick={handleLogin}
        className={
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        Verify Code
      </button>
    </form>
  );
};

export default SignupWithMobileNumber;
