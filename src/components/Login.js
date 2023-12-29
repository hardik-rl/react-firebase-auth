import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import FormLabel from "../shared/components/FormLabel";
import FormControl from "../shared/components/FormControl";
import { useNavigate } from "react-router-dom";
import { setToken } from "../shared/helpers/component/utils";

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
    if (auth?.currentUser) {
      setToken("AuthToken", auth?.currentUser?.accessToken);
      navigate("/");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      action=""
      className="max-w-md mx-auto mt-20"
    >
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Login
      </h1>

      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          name="floating_email"
        />
        <FormLabel name="Email address" htmlFor="floating_email" />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <FormControl
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          name="floating_password"
        />
        <FormLabel name="Password" htmlFor="floating_password" />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
