import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);

function MarketingData() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/order");
      const data = await response.json();
      setOrders(data);
    }
    loadData();
  }, []);

  function aggregateMarketingData(orders) {
    let salesByCampaign = {};

    orders.forEach((order) => {
      const campaign = order.campaignName;
      const totalOrderValue = order.cartItems.reduce(
        (acc, item) => acc + item?.fields?.price,
        0
      );

      if (salesByCampaign[campaign]) {
        salesByCampaign[campaign] += totalOrderValue;
      } else {
        salesByCampaign[campaign] = totalOrderValue;
      }
    });

    return {
      labels: Object.keys(salesByCampaign),
      sales: Object.values(salesByCampaign),
    };
  }

  const marketingData = aggregateMarketingData(orders);

  const data = {
    labels: marketingData.labels,
    datasets: [
      {
        label: "Sales from Campaigns ($)",
        data: marketingData.sales,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Sales by Marketing Campaign</h2>
      <Bar data={data} />
    </div>
  );
}

export default MarketingData;
