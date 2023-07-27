import Router from "next/router";
function Id({ order }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/order?id=${order._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the order");
      }

      Router.push("/admin");
    } catch (error) {
      console.error("Error deleting the order:", error);
      alert("There was an error deleting the order.");
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Order Details for {order.name}
      </h1>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded mt-4 hover:bg-red-700 active:bg-red-800 focus:outline-none"
      >
        Delete Order
      </button>
      {console.log(order.totalPrice)}
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
              £{item.fields.price.toFixed(2)}
            </span>
            {"-"}
            <span className="text-lg font-medium">{item.quantity}</span>
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
