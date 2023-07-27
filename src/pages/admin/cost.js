import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);
function SalesData() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/order");
      const data = await response.json();
      setOrders(data);
      console.log(data);
    }
    loadData();
  }, []);
  function aggregateCostBenefitData(orders) {
    let salesByCategory = {};
    let costsByCategory = {};

    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const category = item?.fields?.category[0];
        const price = item?.fields?.price;
        const cost = price * 0.7;

        if (salesByCategory[category]) {
          salesByCategory[category] += price;
        } else {
          salesByCategory[category] = price;
        }

        // Aggregate costs
        if (costsByCategory[category]) {
          costsByCategory[category] += cost;
        } else {
          costsByCategory[category] = cost;
        }
      });
    });

    const netBenefits = Object.keys(salesByCategory).reduce((acc, category) => {
      acc[category] = salesByCategory[category] - costsByCategory[category];
      return acc;
    }, {});

    return {
      labels: Object.keys(netBenefits),
      netBenefits: Object.values(netBenefits),
    };
  }

  const costBenefitData = aggregateCostBenefitData(orders);
  const data = {
    labels: costBenefitData.labels,
    datasets: [
      {
        label: "Net Benefit ($)",
        data: costBenefitData.netBenefits,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Cost-Benefit Analysis Over Time</h2>
      <Bar data={data} />
    </div>
  );
}

export default SalesData;
