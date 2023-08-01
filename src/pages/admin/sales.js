import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useState, useEffect } from "react";

Chart.register(...registerables);
function SalesData() {

  const[users,setUsers]=useState([])
  const [viewMode, setViewMode] = useState("category");
  useEffect(() => {
    async function loadData() {
      const response = await fetch("/api/login");

      const data = await response.json();
      console.log(data)
      setUsers(data);
    }
    loadData();
  }, []);

  function aggregateSalesDataByCategory(users) {
    let salesByCategory = {};
    users.forEach((user) => {
      user.orders.forEach((order) => {
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
    });
    return {
      labels: Object.keys(salesByCategory),
      sales: Object.values(salesByCategory),
    };}
  function aggregateSalesDataByGender(users) {
    const salesByGender = { male: 0, female: 0 };
    users.forEach((user) => {
      user.orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        console.log(item.fields)
        const price = item?.fields?.price;
        salesByGender[user?.sex] += price;
     
    });
  });
});
    return {
      labels: Object.keys(salesByGender),
      sales: Object.values(salesByGender),
    };
  }
  function aggregateSalesDataByLocation(users) {
    let salesByLocation = {};
    users.forEach((user) => {
      user.orders.forEach((order) =>  {    const location = order.city;
      order.cartItems.forEach((item) => {
        const totalOrderValue = order.cartItems.reduce(
          (sum, item) => sum + item?.fields?.price,
          0
        );
        if (salesByLocation[location]) {
          salesByLocation[location] += totalOrderValue;
        } else {
          salesByLocation[location] = totalOrderValue;
        }
      });   });
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
    <div className="p-4">
      <h2 className="text-2xl p-2">Sales Data Over Time</h2>
      <div className="flex gap-4">
        <label >
          <input
            type="radio"
            value="category"
            checked={viewMode === "category"}
            onChange={() => setViewMode("category")}
          />
         {' '}Category
        </label>
        <label>
          <input
            type="radio"
            value="gender"
            checked={viewMode === "gender"}
            onChange={() => setViewMode("gender")}
          />
           {' '}Gender
        </label>
        <label>
          <input
            type="radio"
            value="location"
            checked={viewMode === "location"}
            onChange={() => setViewMode("location")}
          />
          {' '}Location
        </label>
      </div>
      <Bar data={chartData} />
    </div>
  );
}

export default SalesData;
