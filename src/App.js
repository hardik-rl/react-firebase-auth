import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainLayout from "./layout/MainLayout";
import NotFound from "../src/shared/components/NotFound";
import withoutAuthenticationHO from "../src/shared/helpers/component/withoutAuthenticationHO";
import withAuthenticationHO from "../src/shared/helpers/component/withAuthenticationHO";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";
import { useState } from "react";
import ForgotPassword from "./components/ForgotPassword";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResetPassword from "./components/ResetPassword";
const auth = getAuth(app);

function App() {
  const queryClient = new QueryClient();

  const [user, setUser] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  const Authenticated = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={<MainLayout user={user} signOut={signOut} auth={auth} />}
        >
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>contact</h1>} />
        </Route>
      </Routes>
    );
  };

  const UnAuthenticated = () => <Outlet />;

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/*" element={withAuthenticationHO(Authenticated)} />
        <Route path="/auth" element={withoutAuthenticationHO(UnAuthenticated)}>
          <Route index element={<Navigate to={"login"} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
