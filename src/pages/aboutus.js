import Head from "next/head";
function Index() {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className="flex flex-col md:flex-row p-2 items-center justify-center min-h-screen">
        <div className="md:w-2/3 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
          <img
            className="w-full rounded-lg shadow-lg"
            src="https://images.pexels.com/photos/1024036/pexels-photo-1024036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
        <div className="md:w-1/3 p-4">
          <p className="text-gray-700">
            Dapr is a modern fashion brand that offers stylish and comfortable
            clothing, shoes and accessories for men and women. Founded in 2018,
            Dapr aims to make the latest fashion trends accessible to everyone
            by providing high-quality products at affordable prices. Our product
            range includes t-shirts, jeans, dresses, jackets, sweaters, suits,
            shorts, skirts, blouses, shoes, bags, jewelry and more. We carefully
            select fabrics and materials to ensure our clothes are soft, durable
            and made to last. Our shoes and accessories are designed for
            everyday wear and feature on-trend colors and designs. At Dapr, we
            believe fashion should be fun and expressive. Our in-house designers
            take inspiration from runways around the world to create exclusive
          </p>
        </div>
      </div>
      <p className="p-4">
        Dapr collections full of bold prints, vivid colors and flattering
        silhouettes. We release new, limited-edition pieces each month so our
        customers always have access to what's hot right now. From business
        casual to night-on-the-town attire, Dapr has stylish options for every
        occasion. We pride ourselves on offering the same high-quality items
        found in designer boutiques at a fraction of the price. Every product we
        sell goes through rigorous inspection and testing to ensure it meets our
        strict standards. Based in Los Angeles, Dapr was founded by best friends
        and fashion enthusiasts James Holt and Eva Chen. James and Eva travel
        the world in search of the latest trends and the best materials to
        incorporate into Dapr designs. Their goal is to make shopping an
        enjoyable and rewarding experience by providing exceptional customer
        service and an easy, intuitive website. Dapr is dedicated to empowering
        customers to look and feel their best every day. Browse our collections
        today to discover fashionable finds effortlessly tailored to your
        personal style.
      </p>
    </>
  );
}

export default Index;
