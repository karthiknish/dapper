import Link from "next/link";
import Head from "next/head";
import { getProducts } from "./api/contentful";
export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Dapper</title>
      </Head>
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Welcome to My E-commerce Site</h1>
          <nav>
            <Link
              href="/products"
              className="mx-2 text-blue-600 hover:underline"
            >
              Products
            </Link>

            <Link href="/about" className="mx-2 text-blue-600 hover:underline">
              About
            </Link>

            <Link
              href="/contact"
              className="mx-2 text-blue-600 hover:underline"
            >
              Contact
            </Link>
          </nav>
        </header>

        <main>
          <h2 className="text-xl font-semibold my-4">Featured Products</h2>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product, index) => (
              <Link href={`/${product.fields.title}`}>
                <div key={index} className="border p-4">
                  <img
                    className="w-full h-64 object-cover"
                    src={product.fields.image}
                    alt={product.fields.title}
                  />
                  <h3 className="mt-2 font-medium">{product.fields.title}</h3>
                  <p className="text-green-600 font-semibold">
                    £{product.fields.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-4 py-4 border-t">
          <p className="text-center">Copyright © 2023 E-commerce Site</p>
        </footer>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
}
