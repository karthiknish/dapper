import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  name: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
});

export default AddressSchema;
