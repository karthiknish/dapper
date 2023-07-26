import Link from "next/link";

function Footer() {
  return (
    <div className="flex p-2 gap-4 bottom-0">
      <Link className="text-blue-600 hover:underline" href="/about">
        About
      </Link>
      <Link className="text-blue-600 hover:underline" href="/contact">
        Contact
      </Link>
    </div>
  );
}

export default Footer;
