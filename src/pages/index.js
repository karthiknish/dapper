import Link from "next/link";
import Head from "next/head";
import { getProducts } from "./api/contentful";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Dapr from "../assets/daprd.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Home({ products }) {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const storiesData = [
    {
      id: 1,
      name: "Jack Cook",
      avatar:
        "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      review: "I absolutely love this product. It has changed my life!",
      productUsed: "Product A",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      review: "This is a must-have for anyone. Best purchase I made this year.",
      productUsed: "Product B",
    },
    {
      id: 3,
      name: "Sara Paul",
      avatar:
        "https://images.pexels.com/photos/17751042/pexels-photo-17751042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      review: "This is a must-have for anyone. Best purchase I made this year.",
      productUsed: "Product B",
    },
    {
      id: 4,
      name: "Claire Jose",
      avatar:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      review: "Rate this high.",
      productUsed: "Product B",
    },
    {
      id: 5,
      name: "Warner Spencer",
      avatar:
        "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      review: "Perfect sizing and colorful products",
      productUsed: "Product B",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    } else {
      alert("Please enter a valid email address");
    }
  };
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-prev " onClick={onClick}>
        <FaArrowLeft className="" />
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  }

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 2000);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (showSplash) {
    return (
      <div className="fixed z-50 bg-blue-200 inset-0 flex items-center justify-center">
        <img src={Dapr.src} alt="Logo" className="w-40 h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dapper</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <style jsx global>{`
          body {
            font-family: "Poppins", sans-serif;
          }
        `}</style>
      </Head>
      <div className="flex flex-wrap">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:w-1/2">
          <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/mens"
                className="text-xl bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2">
          <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/5848886/pexels-photo-5848886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/womens"
                className="text-xl bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full">
          <div
            className="relative w-full h-screen bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/17279480/pexels-photo-17279480/free-photo-of-elegant-couple-posing-in-the-harbor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
            }}
          >
            <div className="absolute inset-8 mt-20 flex items-center justify-center gap-4">
              <Link
                href="/shop/men"
                className="text-xl bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Shop Men
              </Link>

              <Link
                href="/shop/women"
                className="text-xl bg-white py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <main>
          <h2 className="text-3xl font-semibold mt-12 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map(
              (product, index) =>
                product.fields.featured && (
                  <Link
                    key={index}
                    href={`/${product.fields.category}/${product.sys.id}`}
                    className="group border p-4 cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-md"
                  >
                    <img
                      className="w-full h-64 object-cover rounded-md"
                      src={product.fields.image}
                      alt={product.fields.title}
                    />
                    <h3 className="mt-4 font-medium text-xl">
                      {product.fields.title}
                    </h3>
                    <p className="text-green-600 font-semibold text-lg mt-2">
                      £{product.fields.price}
                    </p>
                  </Link>
                )
            )}
          </div>
        </main>
      </div>
      <div className="bg-gray-100 p-6 rounded-md shadow-md w-full  mx-auto">
        <h2 className="font-semibold text-lg mb-6 text-center">
          Customer Stories
        </h2>

        <Slider {...sliderSettings}>
          {storiesData.map((story) => (
            <div
              key={story.id}
              className="w-full h-full bg-white rounded-md p-4 shadow-md"
            >
              <img
                src={story.avatar}
                alt={story.name}
                className="w-full h-40 rounded-md object-cover mb-4"
              />
              <p className="font-medium">{story.name}</p>
              <p className="text-sm text-gray-500 truncate">{story.review}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="bg-gray-100 p-6 rounded-md shadow-md w-full mt-5 mx-auto">
        <h2 className="font-semibold text-lg mb-4">Join our Newsletter</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow p-2 rounded-md border focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <p>Thank you for subscribing!</p>
        )}
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
