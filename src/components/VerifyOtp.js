import {
  PhoneAuthProvider,
  getAuth,
  signInWithCredential,
} from "firebase/auth";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";
import { setToken } from "../shared/helpers/component/utils";

const VerifyOtp = () => {
  const auth = getAuth(app);
  const { verificationId } = useParams();

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const onVerify = async () => {
    try {
      if (otp !== null && verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        const res = await signInWithCredential(auth, credential);
        setToken("AuthToken", res.user.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <form className="max-w-lg mx-auto mt-20">
      <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white">
        Verify OTP
      </h1>

      <div className="otp-form-control">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="tel"
          renderInput={(props) => <input className="text-black" {...props} />}
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        />
      </div>
      <button
        onClick={onVerify}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mt-6 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Login
      </button>
    </form>
  );
};

export default VerifyOtp;
