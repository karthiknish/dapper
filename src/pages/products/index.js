import { getProducts } from "../api/contentful";
import Link from "next/link";
import Head from "next/head";

function Index({ products }) {
  return (
    <>
      <Head>
        <title>All Products</title>
      </Head>
      <main className="m-4">
        <h2 className="text-2xl font-bold my-4">All Products</h2>

        <div className="flex flex-wrap justify-between">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/${product.fields.category}/${product.sys.id}`}
              className="border m-2 w-64 flex flex-col items-center p-4 hover:border-green-600 hover:shadow-lg transition duration-300"
            >
              <img
                className="w-full h-64 object-cover mb-2"
                src={product.fields.image}
                alt={product.fields.title}
              />
              <h3 className="font-medium text-lg">{product.fields.title}</h3>
              <p className="text-green-600 font-semibold mt-2">
                £{product.fields.price}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Index;

export async function getStaticProps() {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 1,
  };
}
