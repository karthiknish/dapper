import React from "react";
import Head from "next/head";
import Router from "next/router";
import { getProduct } from "../api/contentful";
import StarRating from "../../components/Starrating";
import { IoChevronBackOutline } from "react-icons/io5";
import { addToCart } from "../../util/cart";
import Description from "@/components/Description";

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

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        <button
          className="mb-8 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 focus:outline-none"
          onClick={() => Router.back()}
        >
          <IoChevronBackOutline size={24} />
        </button>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row">
          <img
            className="w-full  h-64 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
            src={product.fields.image}
            alt={product.fields.title}
          />
          <div className="mt-4 md:mt-0 md:w-1/2">
            <h1 className="text-2xl font-bold mb-2 text-black">
              {product.fields.title}
            </h1>
            <p className="text-green-600 font-medium mb-4">
              £{product.fields.price}
            </p>
            <StarRating rating={product.fields.rating} />
            <Description className="mt-4" input={product.fields.description} />
            <button
              className="w-full mt-6 bg-yellow-500 p-2 rounded text-white hover:bg-yellow-600 focus:outline-none transition duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
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
