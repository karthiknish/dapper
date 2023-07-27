import dbConnect from "../../util/dbConnect";
import Campaign from "../../models/Campaign"; // Assuming you have a Campaign model

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const campaigns = await Campaign.find();
        res.status(200).json(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        res
          .status(500)
          .json({ message: "Server error", details: error.message });
      }
      break;

    case "POST":
      try {
        const { name } = req.body;
        const campaign = new Campaign({ name });
        await campaign.save();
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
