import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-12 py-8 border-t bg-gray-100 rounded-lg shadow-inner">
      <p className="text-center text-lg font-medium">Copyright © 2023 Dapr</p>
      <div className="flex p-2 gap-4 bottom-0">
        <Link className="text-blue-600 hover:underline" href="/about">
          About
        </Link>
        <Link className="text-blue-600 hover:underline" href="/contact">
          Contact
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
