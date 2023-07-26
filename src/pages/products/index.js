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
        <h2 className="text-xl font-semibold my-4">All Products</h2>

        <div className="grid grid-cols-4 m-3 gap-4">
          {products.map((product, index) => (
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
                <h3 className="mt-2 font-medium">{product.fields.title}</h3>
                <p className="text-green-600 font-semibold">
                  £{product.fields.price}
                </p>
              </div>
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
