import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";

import Logo from "../assets/logo.png";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { GoSignOut, GoSignIn } from "react-icons/go";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    Router.push("/");
  };
  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      setToken(userData);
    }
  }, []);

  return (
    <nav className="flex relative items-center justify-center p-2 bg-blue-100 text-white">
      <div className=" absolute hidden lg:flex left-0 ml-4 gap-2">
        <Link className="text-red-400  mr-2 hover:underline" href="/mens">
          Mens
        </Link>
        <Link className="text-red-400  mr-2 hover:underline" href="/womens">
          Womens
        </Link>
      </div>
      <div>
        <img
          onClick={() => Router.push("/")}
          width="150"
          className="cursor-pointer"
          src={Logo.src}
          alt="Logo"
        />
      </div>
      <button
        className="lg:hidden bg-black mr-2 absolute right-0 px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu className="text-2xl" />
      </button>
      <div
        className={
          !isOpen
            ? "lg:flex hidden flex-grow mx-4 right-0 absolute"
            : "z-20 absolute w-3/4  top-28 bg-black flex flex-col p-4 gap-4"
        }
      >
        <Link href="/search">
          <AiOutlineSearch
            className="text-red-400 text-2xl mr-2 hover:underline"
            href="/search"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link className="text-red-400 hover:underline" href="/admin">
            Admin
          </Link>
          <Link href="/cart">
            <AiOutlineShoppingCart className="text-2xl text-red-400" />
          </Link>

          {token === null ? (
            <Link href="/auth">
              <GoSignIn className="text-2xl text-red-400" />
            </Link>
          ) : (
            <>
              <AiOutlineUser
                onClick={() => Router.push("/account")}
                className="text-2xl text-red-400"
              />
              <GoSignOut onClick={signOut} className="text-2xl text-red-400" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
