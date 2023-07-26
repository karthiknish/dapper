import React from "react";
import Head from "next/head";
import Router from "next/router";
import { getProduct } from "../api/contentful";
import StarRating from "../../components/Starrating";
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../../util/cart";
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
      <div className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <button
            className="bg-blue-600 text-white px-5 my-2 py-2 rounded hover:bg-blue-700 focus:outline-none"
            onClick={() => Router.push("/")}
          >
            <IoChevronBackOutline />
          </button>

          <img
            className="w-1/2 h-64 object-cover rounded-md mb-4"
            src={product.fields.image}
            alt={product.fields.title}
          />
          <h1 className="text-2xl font-bold mb-2 text-black">
            {product.fields.title}
          </h1>
          <p className="text-green-600 font-medium mb-4">
            £{product.fields.price}
          </p>
          <StarRating rating={product.fields.rating} />

          <Description input={product.fields.description} />
          <button
            className="bg-yellow-500 p-2 rounded my-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
export async function getServerSideProps(context) {
  console.log(context.params);
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
