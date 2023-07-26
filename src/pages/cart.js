import Basket from "../components/Basket";
import Head from "next/head";
function cart() {
  return (
    <>
      <Head>
        <title>Cart | Dapper</title>
      </Head>
      <Basket />
    </>
  );
}

export default cart;
