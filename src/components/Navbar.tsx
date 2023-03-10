import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import MALLogoBlack from "../assets/img/logo_mal_black.png";
import MALLogoWhite from "../assets/img/logo_mal.png";

const Navbar = () => {
  const { user, logout } = UserAuth();
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
      setNav(!nav);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#2f51a3] w-full px-2 flex items-center justify-between h-[58px] font-bold">
      <div className="logo mx-2">
        <Link to="/">
          <img
            className="flex w-32 dark:hidden"
            src={MALLogoBlack}
            alt={MALLogoBlack}
          />
          <img
            className="hidden w-32 dark:flex"
            src={MALLogoWhite}
            alt={MALLogoWhite}
          />
        </Link>
      </div>
      {user ? (
        <div className="hidden md:block">
          <small className="text-white font-bold">Welcome {user?.email}</small>

          <button
            onClick={handleSignOut}
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-md shadow-lg hover:shadow-2xl"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent transition">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-button text-btnText px-5 py-2 ml-2 rounded-md shadow-lg hover:shadow-2xl"
          >
            Sign Up
          </Link>
        </div>
      )}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu  */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-16 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-500 z-10"
            : "fixed top-[-100%] h-[90%] flex flex-col items-center justify-between"
        }
      >
        <ul className="w-full list-none p-4">
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>
        {!user ? (
          <div className="flex flex-col w-full p-4">
            <Link to="/signup">
              <button
                onClick={handleNav}
                className="hover:cursor-pointer w-full m-y2 p-3 bg-button text-btnText rounded-md shadow-xl"
              >
                Sign up
              </button>
              <Link to="/signin">
                <button
                  onClick={handleNav}
                  className="hover:cursor-pointer w-full my-2 p-3 border-blue-500 text-accent  border-2 border-secondary rounded-md shadow-xl hover:border-none"
                >
                  Sign In
                </button>
              </Link>
            </Link>
          </div>
        ) : (
          <button
            onClick={handleSignOut}
            className="w-full m-y2 p-3 bg-button text-btnText rounded-md shadow-xl"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
