import Link from "next/link";
import Head from "next/head";
import { getProducts } from "./api/contentful";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Dapr from "../assets/daprd.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Home({ products }) {
  const [showSplash, setShowSplash] = useState(true);
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-prev" onClick={onClick}>
        <FaArrowLeft />
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

  // Sample random images for the slider.
  const randomImages = [
    "https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_106176-1539.jpg?w=1480&t=st=1690464786~exp=1690465386~hmac=be3cd1b5b45ecf8dda989996d2edb0c6a076ff146a8ce6defc738b86334f6670",
    "https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_120329-2087.jpg?w=1480&t=st=1690464762~exp=1690465362~hmac=d88b3f71e5b9b29578d3c1059ab4c534177fb42ad42547fcb87a2818a631d9a7",
    "https://img.freepik.com/free-psd/new-collection-fashion-sale-web-banner-template_120329-1507.jpg?w=1800&t=st=1690464734~exp=1690465334~hmac=f65d50806b0b09ce4b641c829ef4042b5d27aff9afe3a5c63826917a275cc77f",
  ];

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
      </Head>
      <div className="container mx-auto px-4">
        <main>
          <Slider className="mt-10" {...sliderSettings}>
            {randomImages.map((img, index) => (
              <div key={index}>
                <img
                  className="w-full h-64 object-cover"
                  src={img}
                  alt={`Random Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>

          <h2 className="text-2xl font-bold mt-8 mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map(
              (product, index) =>
                product.fields.featured && (
                  <Link
                    key={index}
                    href={`/${product.fields.category}/${product.sys.id}`}
                  >
                    <div className="border p-4 cursor-pointer">
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
