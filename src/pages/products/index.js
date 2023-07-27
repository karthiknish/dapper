import { getProducts } from "../api/contentful";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
function Index({ products }) {
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const fetchProducts = async () => {
    const filteredProducts = await getProducts(category, sortOrder);
    setDisplayedProducts(filteredProducts);
  };
  return (
    <>
      <Head>
        <title>All Products</title>
      </Head>
      <main className="m-4">
        <h2 className="text-2xl font-bold my-4">All Products</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Filter by Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="ml-2 p-2 border"
            >
              <option value="">All</option>

              {/* Add other categories as options here */}
              <option value="shoes">Shoes</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
            </select>
          </label>

          <div className="mt-2 mb-4">
            <span>Sort by Price:</span>
            <label className="ml-4">
              <input
                className="mr-2"
                type="radio"
                value="asc"
                checked={sortOrder === "asc"}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              Low to High
            </label>
            <label className="ml-4">
              <input
                className="mr-2"
                type="radio"
                value="desc"
                checked={sortOrder === "desc"}
                onChange={(e) => setSortOrder(e.target.value)}
              />
              High to Low
            </label>
          </div>

          <button
            onClick={fetchProducts}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {displayedProducts.map((product, index) => (
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
