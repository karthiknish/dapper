import dbConnect from "../../util/dbConnect";
import Contact from "../../models/Contact";
export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
