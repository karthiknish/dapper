import Link from "next/link";
import Search from "./Search";

function Nav() {
  return (
    <nav className="flex justify-between items-center py-4 border-b">
      <h1 className="text-2xl font-bold">Welcome to My E-commerce Site</h1>
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
