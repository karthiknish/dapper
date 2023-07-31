import dbConnect from "../../util/dbConnect";
import Contact from "../../models/Contact";
export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      try {
        if (req.query.id) {
          const contact = await Contact.findById(req.query.id);
          if (!contact) {
            return res
              .status(404)
              .json({ success: false, message: "Contact not found" });
          }
          res.status(200).json({ success: true, data: contact });
        } else {
          // Get all entries
          const contacts = await Contact.find({});
          res.status(200).json({ success: true, data: contacts });
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "POST":
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const validateEmail = (email) => {
        return !!email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
  