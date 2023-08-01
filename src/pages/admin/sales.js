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
    }
    loadData();
  }, []);
  function aggregateSalesData(orders) {
    let salesByCategory = {};
    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const category = item?.fields?.category[0];
        const price = item?.fields?.price;
        const genderKey = `${category}-${order.gender}`;
        if (salesByCategoryAndGender[genderKey]) {
          salesByCategoryAndGender[genderKey] += price;
        } else {
          salesByCategoryAndGender[genderKey] = price;
        }
      });
    });

    return {
      labels: Object.keys(salesByCategory),
      sales: Object.values(salesByCategory),
    };
  }
  const salesData = aggregateSalesData(orders);
  const categories = [
    ...new Set(
      orders.flatMap((order) =>
        order.cartItems.map((item) => item?.fields?.category[0])
      )
    ),
  ];
  const maleSales = categories.map(
    (category) => aggregatedData[`${category}-male`] || 0
  );
  const femaleSales = categories.map(
    (category) => aggregatedData[`${category}-female`] || 0
  );
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Male Sales ($)",
        data: maleSales,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Female Sales ($)",
        data: femaleSales,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
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
