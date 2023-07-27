import mongoose from "mongoose";
import AddressSchema from "./Address";
import OrderSchema from "./Order";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  sex: String,
  addresses: [AddressSchema],
  orders: [OrderSchema],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
