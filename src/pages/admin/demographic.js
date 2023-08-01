import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";
Chart.register(...registerables);
function demographic() {
  const [users, setUsers] = useState([]);
  const [viewMode, setViewMode] = useState("category");
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    }
    loadData();
  }, []);
  function aggregateSalesDataByLocation(users) {
    let salesByLocation = {};

    users.forEach((user) => {
      user.orders.forEach((order) => {
        const location = order.city; // Use city as a location for this example
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
    const salesData = aggregateSalesDataByCategory(users);

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
    const salesData = aggregateSalesDataByGender(users);
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

  return <div>demographic</div>;
}

export default demographic;
