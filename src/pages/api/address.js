import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
export default async function handler(req, res) {
  const { email } = req.body;
 
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    console.log(user);
    if (user && user.addresses && user.addresses.length > 0) {
      return res.status(200).json({ address: user.addresses[0] });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
