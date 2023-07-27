import dbConnect from "../../util/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, password, age, sex } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      sex,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } else {
    res.status(405).end(); // Method not allowed
  }
}
