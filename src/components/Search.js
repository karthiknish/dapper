import { useState, useEffect } from "react";
import { getProducts } from "../pages/api/contentful";
import Link from "next/link";
function Search() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleLinkClick = () => {
    setQuery("");
  };
  useEffect(() => {
    if (query === "") {
      setProducts([]);
      return;
    }

    let cancel = false;

    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      if (!cancel) {
        const results = fetchedProducts.filter((product) =>
          product.fields.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(results);
      }
    }

    fetchProducts();

    return () => {
      cancel = true;
    };
  }, [query]);

  return (
    <div className="relative flex-grow">
      <input
        className="bg-transparent w-full"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a product..."
      />

      <ul className="absolute top-full mt-2 w-full z-10 border border-black bg-white">
        {products.map((product) => (
          <Link
            key={product.sys.id}
            href={`/${product.fields.category}/${product.sys.id}`}
          >
            <li
              className="border border-gray-300 text-gray-700 text-2xl"
              onClick={handleLinkClick}
            >
              {product.fields.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Search;
