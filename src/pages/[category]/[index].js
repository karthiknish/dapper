import React from "react";
import Head from "next/head";
import { getProduct } from "../api/contentful";
import StarRating from "../../components/Starrating";
import { addToCart } from "../../util/cart";
import Description from "@/components/Description";
import { motion } from "framer-motion"
function Index({ product }) {
  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
  };

  return (
    <>
      <Head>
        <title>{product.fields.title}</title>
      </Head>

      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full py-4 flex flex-col md:flex-row gap-8">
          <img
            className="w-full h-full object-cover max-w-xl rounded-md mb-4 md:mb-0 md:mr-4"
            src={product.fields.image}
            alt={product.fields.title}
          />
          <div className="mt-4 md:mt-0 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2 text-black leading-tight">
              {product.fields.title}
            </h1>
            <p className="text-green-600 font-semibold mb-4 text-xl">
              £{product.fields.price}
            </p>
            <StarRating rating={product.fields.rating} />
            <Description className="mt-4" input={product.fields.description} />
            <button
              className="mt-6 bg-yellow-500 p-3 rounded-md text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300"
              onClick={() => {
                handleAddToCart();
                fbq("track", "AddToCart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const entryId = context.params.index;
  const product = await getProduct(entryId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
