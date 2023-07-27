import "@/styles/globals.css";
import Nav from "../components/Nav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav /> <Component {...pageProps} />
      <Footer />
    </>
  );
}
