import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import Search from "./Search";
import Logo from "../assets/logo.png";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { GoSignOut, GoSignIn } from "react-icons/go";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);

  const signOut = () => {
    localStorage.removeItem("token");
    Router.push("/");
  };
  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      setToken(userData);
    }
  }, []);

  return (
    <nav className="flex relative items-center justify-between p-4 bg-blue-100 text-white">
      <img
        onClick={() => Router.push("/")}
        width="150"
        className="cursor-pointer"
        src={Logo.src}
        alt="Logo"
      />

      <button
        className="lg:hidden bg-black mr-2 absolute right-0 px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu className="text-2xl" />
      </button>

      <div
        className={
          !isOpen
            ? "lg:flex hidden flex-grow mx-4"
            : "z-20 absolute w-3/4 top-28 bg-black flex flex-col p-4 gap-4"
        }
      >
        <Search />
        <div className="flex items-center space-x-4">
          <Link className="text-red-400 hover:underline" href="/products">
            Products
          </Link>
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
