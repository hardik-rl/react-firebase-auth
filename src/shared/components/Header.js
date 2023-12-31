import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import profileLogo from "../../img/profile-picture.jpeg";
import { removeToken } from "../helpers/component/utils";

const Header = ({ user, auth, signOut }) => {
  // console.log(auth);
  const logoutHandle = () => {
    removeToken("AuthToken");
    signOut(auth);
    console.log("sassas", auth, user);
  }

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
            label={<Avatar alt="User settings" img={profileLogo} rounded />}
          >
            {user && (
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">
                  {user}
                </span>
              </Dropdown.Header>
            )}
            <Dropdown.Item onClick={logoutHandle}>Logout</Dropdown.Item>
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
