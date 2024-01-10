import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { removeToken } from "../helpers/component/utils";
import { useNavigate } from "react-router-dom";

const Header = ({ user, auth, signOut }) => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    removeToken("AuthToken");
    signOut(auth);
  };

  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand>
          <img
            src="/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={user.photoURL} rounded />}
          >
            {user && (
              <Dropdown.Header>
               {user.displayName && <span className="block text-cyan-700 capitalize mb-3 truncate text-sm font-bold">
                  {user.displayName}
                </span>}
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
            )}
            <Dropdown.Item onClick={()=> navigate("/profile")}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={logoutHandle} className="font-bold">Logout</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
