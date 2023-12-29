import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainLayout from "./layout/MainLayout";
import { withoutAuthenticationHO } from "../src/shared/helpers/component/withoutAuthenticationHO";
import { withAuthenticationHO } from "../src/shared/helpers/component/withAuthenticationHO";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";
import { useState } from "react";
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser.email);
    } else {
      setUser(null);
    }
  });

  const Authenticated = () => {
    return <MainLayout user={user} signOut={signOut} auth={auth} />;
  };

  const UnAuthenticated = () => <Outlet />;
  return (
    <Routes>
      <Route path="/*" element={withAuthenticationHO(Authenticated)} />
      <Route path="/" element={withoutAuthenticationHO(UnAuthenticated)}>
        <Route index element={<Navigate to={"login"} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
