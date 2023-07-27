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
  function aggregateSalesData(orders) {
    let salesByCategory = {};
    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const category = item?.fields?.category[0];
        const price = item?.fields?.price;
        if (salesByCategory[category]) {
          salesByCategory[category] += price;
        } else {
          salesByCategory[category] = price;
        }
      });
    });

    return {
      labels: Object.keys(salesByCategory),
      sales: Object.values(salesByCategory),
    };
  }
  const salesData = aggregateSalesData(orders);
  const data = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Sales ($)",
        data: salesData.sales,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <h2>Sales Data Over Time</h2>
      <Bar data={data} />
    </div>
  );
}

export default SalesData;