import Link from "next/link";
import Router from "next/router";
import Search from "./Search";
import Logo from "../assets/logo.png";
function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 border-b">
      <img
        onClick={() => Router.push("/")}
        width="13%"
        className="ml-4"
        src={Logo.src}
      />

      <div className="flex items-center">
        <Search />
        <div className="ml-4 flex items-center space-x-4">
          <Link href="/products" className="text-blue-600 hover:underline">
            Products
          </Link>
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
