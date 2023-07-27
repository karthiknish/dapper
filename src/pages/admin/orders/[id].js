import React from "react";
function Id({ order }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Order Details for {order.name}
      </h1>
      {order.cartItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded shadow-md"
        >
          <img
            src={item.fields.image}
            alt={item.fields.title}
            className="w-full md:w-1/2 h-64 object-cover rounded"
          />
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-xl font-semibold">{item.fields.title}</h2>
            <span className="text-lg font-medium">
              ${item.fields.price.toFixed(2)}
            </span>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Shipping Details:</h3>
              <address className="mt-2 not-italic">
                {order.addressLine1} <br />
                {order.addressLine2 && `${order.addressLine2} <br/>`}
                {order.city}, {order.state} {order.zip}
              </address>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Contact:</h3>
              <p>{order.phone}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Id;
export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/order?id=${id}`);
    console.log(res);
    const order = await res.json();

    if (!order) {
      return {
        notFound: true,
      };
    }

    return {
      props: { order },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { order: "1" },
    };
  }
}
