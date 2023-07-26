import Link from "next/link";
import Head from "next/head";
import { getProducts } from "./api/contentful";
import Search from "../components/Search";
export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Dapper</title>
      </Head>
      <div className="container mx-auto px-4">
        <main>
          <h2 className="text-xl font-semibold my-4">Featured Products</h2>

          <div className="grid grid-cols-2 gap-4">
            {products.map(
              (product, index) =>
                product.fields.featured && (
                  <Link
                    key={index}
                    href={`/${product.fields.category}/${product.sys.id}`}
                  >
                    {console.log(product)}
                    <div className="border p-4">
                      <img
                        className="w-full h-64 object-cover"
                        src={product.fields.image}
                        alt={product.fields.title}
                      />
                      <h3 className="mt-2 font-medium">
                        {product.fields.title}
                      </h3>
                      <p className="text-green-600 font-semibold">
                        £{product.fields.price}
                      </p>
                    </div>
                  </Link>
                )
            )}
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
