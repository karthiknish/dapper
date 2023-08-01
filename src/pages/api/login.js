import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully!", token, email });
  }else if (req.method === "GET") {
    const { email } = req.query;
    if (!email) {
    
      const users = await User.find({}, '-password');  
      return res.status(200).json(users);
    }
    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required." });
    }

    const user = await User.findOne({ email }, '-password');  

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);

  } else {
    res.status(405).end();
  }
}
