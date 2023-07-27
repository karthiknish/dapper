import React, { useState, useEffect } from "react";

function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load the current campaigns and orders from your API
    async function loadData() {
      const responseCampaigns = await fetch("/api/campaigns");
      const campaignsData = await responseCampaigns.json();

      const responseOrders = await fetch("/api/orders");
      const ordersData = await responseOrders.json();

      setCampaigns(campaignsData);
      setOrders(ordersData);
    }

    loadData();
  }, []);

  const addCampaign = async () => {
    // ... (as previously written)
  };

  const linkOrderToCampaign = async (orderId) => {
    // Make an API call to link the order with the selected campaign
    const response = await fetch(
      `/api/campaigns/${selectedCampaign}/link-order`,
      {
        method: "POST",
        body: JSON.stringify({ orderId }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (data.success) {
      // Update local state or refetch campaigns
    } else {
      console.error("Error linking order:", data.message);
    }
  };

  return (
    <div>
      <h2>Manage Campaigns</h2>
      <div>
        <input
          type="text"
          value={newCampaignName}
          onChange={(e) => setNewCampaignName(e.target.value)}
          placeholder="New campaign name"
        />
        <button onClick={addCampaign}>Add Campaign</button>
      </div>
      <ul>
        {campaigns.map((campaign) => (
          <li
            key={campaign._id}
            onClick={() => setSelectedCampaign(campaign._id)}
          >
            {campaign.name}
          </li>
        ))}
      </ul>
      <h3>Link Order to Selected Campaign</h3>
      <select onChange={(e) => linkOrderToCampaign(e.target.value)}>
        <option value="">Select an order to link...</option>
        {orders.map((order) => (
          <option key={order._id} value={order._id}>
            {order.orderNumber}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminCampaigns;
