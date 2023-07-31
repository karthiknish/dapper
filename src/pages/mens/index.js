import { getProducts } from "../api/contentful";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
function Index({ products }) {
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchProducts = async () => {
    let filteredProducts = await getProducts(category, sortOrder, "male");
    if (searchQuery.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedProducts(filteredProducts);
  };
  useEffect(() => {
    fetchProducts();
  }, [category, sortOrder, searchQuery]);
 
  const debouncedFetch = debounce(fetchProducts, 300);
  function debounce(func, delay) {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  }
  return (
    <>
      <Head>
        <title>Mens Products</title>
      </Head>
      <main className="p-6  min-h-screen">
        <div className="container mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              debouncedFetch();
            }}
            className="p-2 border-b-2 w-full mb-2 focus:outline-none focus:border-blue-500"
            placeholder="Search by product name..."
          />

          <h2 className="text-3xl font-bold mb-6 ">Mens Products</h2>
          <div className="mb-8 flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <label className="block mb-2">
                Category{" "}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 bg-white border rounded"
                >
                  <option value="">All</option>
                  <option value="shoes">Shoes</option>
                  <option value="pants">Pants</option>
                  <option value="tees">T shirt</option>
                  <option value="underwear">Underwear</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span>Price</span>
              <label className="ml-4">
                <input
                  className="mr-2"
                  type="radio"
                  value=""
                  checked={sortOrder === ""}
                  onChange={(e) => setSortOrder(e.target.value)}
                />
                Default
              </label>
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
              className="mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Apply Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => (
              <Link
                key={index}
                href={`/${product.fields.category}/${product.sys.id}`}
                className="border bg-white p-4 rounded-lg shadow hover:shadow-xl transition duration-300"
              >
                <img
                  className="w-full h-64 object-cover mb-4 rounded"
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
