import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { removeToken } from "../helpers/component/utils";
import { useNavigate } from "react-router-dom";
import favicon from "../../img/favicon.svg";

const Header = ({ user, auth, signOut }) => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    removeToken("AuthToken");
    signOut(auth);
  };

  return (
    <div>
      <Navbar className="pt-4 mb-8" fluid rounded>
        <Navbar.Brand>
          <img
            src={favicon}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Firebase Authentication
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            className="!min-w-28"
            arrowIcon={false}
            inline
            label={
              <Avatar
                status="online"
                alt="User settings"
                img={user?.photoURL}
                rounded
              />
            }
          >
            <Dropdown.Header>
              {user?.displayName && (
                <span className="block text-cyan-700 capitalize truncate text-sm font-bold">
                  {user.displayName}
                </span>
              )}
              {user?.email && (
                <span className="block truncate mt-3 text-sm font-medium">
                  {user.email}
                </span>
              )}
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/profile")}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logoutHandle} className="font-bold">
              Logout
            </Dropdown.Item>
          </Dropdown>
          {/* <Navbar.Toggle /> */}
        </div>
        {/* <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Collapse> */}
      </Navbar>
    </div>
  );
};

export default Header;
