import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
async function getOrders() {
  try {
    await dbConnect();
    const usersWithOrders = await User.find({
      orders: { $exists: true, $not: { $size: 0 } },
    });
    const allOrders = usersWithOrders.reduce(
      (acc, user) => [...acc, ...user.orders],
      []
    );
    return allOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
async function getOrderById(id) {
  try {
    await dbConnect();

    const user = await User.findOne(
      { "orders._id": id },
      { orders: { $elemMatch: { _id: id } } }
    );
    return user ? user.orders[0] : null;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
}
async function submitOrder(email, order) {
  await dbConnect();
  try {
    let totalPrice = 0;
    order.cartItems.forEach((item) => {
      console.log(item);
      totalPrice += item.fields.price * item.quantity;
    });
    console.log(totalPrice);
    order.totalPrice = totalPrice;
    const user = await User.findOne({ email });
    if (user) {
      user.orders.push(order);
      const isAddressExists = user.addresses.some(
        (address) =>
          address.name === order.name &&
          address.addressLine1 === order.addressLine1 &&
          address.addressLine2 === order.addressLine2 &&
          address.city === order.city &&
          address.state === order.state &&
          address.zip === order.zip &&
          address.phone === order.phone
      );
      if (!isAddressExists) {
        user.addresses.push({
          name: order.name,
          addressLine1: order.addressLine1,
          addressLine2: order.addressLine2,
          city: order.city,
          state: order.state,
          zip: order.zip,
          phone: order.phone,
        });
      }
      await user.save();
    } else {
      const newUser = new User({
        email,
        orders: [order],
        addresses: [
          {
            name: order.name,
            addressLine1: order.addressLine1,
            addressLine2: order.addressLine2,
            city: order.city,
            state: order.state,
            zip: order.zip,
            phone: order.phone,
          },
        ],
      });
      await newUser.save();
    }
    return { success: true };
  } catch (error) {
    console.error("Error in submitOrder:", error);
    return { success: false, message: error.message };
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        console.log(id);
        if (id) {
          const order = await getOrderById(id);
          if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
          }
          return res.status(200).json(order);
        } else {
          const orders = await getOrders();
          if (!orders || orders.length === 0) {
            res.status(404).json({ message: "No orders found" });
            return;
          }
          return res.status(200).json(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        res
          .status(500)
          .json({ message: "Server error", details: error.message });
      }
      break;

    case "POST":
      const { email, order } = req.body;
      try {
        const result = await submitOrder(email, order);
        console.log(result);
        if (result && result.success) {
          res.status(200).json({ message: "Order submitted successfully" });
        } else {
          res
            .status(400)
            .json({ message: result.message || "Order submission failed" });
        }
      } catch (error) {
        console.error("Error while submitting order:", error);
        res
          .status(500)
          .json({ message: "Server error", details: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
