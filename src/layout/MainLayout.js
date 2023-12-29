import React from "react";
import { Header } from "../shared/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ user, auth, signOut }) => {
  return (
    <div>
      <Header user={user} auth={auth} signOut={signOut} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
