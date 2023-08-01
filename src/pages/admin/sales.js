import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);
function SalesData() {
  const [orders, setOrders] = useState([]);
  const [viewMode, setViewMode] = useState("category");
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/order");
      const data = await response.json();
      setOrders(data);
    }
    loadData();
  }, []);

  function aggregateSalesDataByCategory(orders) {
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
  function aggregateSalesDataByGender(orders) {
    const salesByGender = {};

    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const price = item?.fields?.price;
        salesByGender[item?.fields?.gender] += price;
      });
    });

    return {
      labels: Object.keys(salesByGender),
      sales: Object.values(salesByGender),
    };
  }
  function aggregateSalesDataByLocation(users) {
    let salesByLocation = {};

    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        const location = item.city;
        const totalOrderValue = order.cartItems.reduce(
          (sum, item) => sum + item?.fields?.price,
          0
        );
        if (salesByLocation[location]) {
          salesByLocation[location] += totalOrderValue;
        } else {
          salesByLocation[location] = totalOrderValue;
        }
      });
    });

    return {
      labels: Object.keys(salesByLocation),
      sales: Object.values(salesByLocation),
    };
  }

  let chartData;
  if (viewMode === "category") {
    const salesData = aggregateSalesDataByCategory(orders);
    chartData = {
      labels: salesData.labels,
      datasets: [
        {
          label: "Sales by Category ($)",
          data: salesData.sales,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  } else if (viewMode === "gender") {
    const salesData = aggregateSalesDataByGender(orders);
    chartData = {
      labels: salesData.labels,
      datasets: [
        {
          label: "Sales by Gender ($)",
          data: salesData.sales,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  } else if (viewMode === "location") {
    const salesData = aggregateSalesDataByLocation(users);
    chartData = {
      labels: salesData.labels,
      datasets: [
        {
          label: "Sales by Location ($)",
          data: salesData.sales,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  }
  return (
    <div>
      <h2>Sales Data Over Time</h2>
      <div>
        <label>
          <input
            type="radio"
            value="category"
            checked={viewMode === "category"}
            onChange={() => setViewMode("category")}
          />
          By Category
        </label>
        <label>
          <input
            type="radio"
            value="gender"
            checked={viewMode === "gender"}
            onChange={() => setViewMode("gender")}
          />
          By Gender
        </label>
        <label>
          <input
            type="radio"
            value="location"
            checked={viewMode === "location"}
            onChange={() => setViewMode("location")}
          />
          By Location
        </label>
      </div>
      <Bar data={chartData} />
    </div>
  );
}

export default SalesData;
