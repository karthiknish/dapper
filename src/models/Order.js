import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  cartItems: [{ type: mongoose.Schema.Types.Mixed }],
  email: String,
});

export default OrderSchema;
