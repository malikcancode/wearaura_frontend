import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "rgba(167, 139, 250, 0.6)",
  "rgba(192, 132, 252, 0.6)",
  "rgba(232, 121, 249, 0.6)",
  "rgba(244, 114, 182, 0.6)",
  "rgba(251, 113, 133, 0.6)",
  "rgba(250, 204, 21, 0.6)",
];

const BORDER_COLORS = [
  "rgba(167, 139, 250, 1)",
  "rgba(192, 132, 252, 1)",
  "rgba(232, 121, 249, 1)",
  "rgba(244, 114, 182, 1)",
  "rgba(251, 113, 133, 1)",
  "rgba(250, 204, 21, 1)",
];

function ProductChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");

        const categoryCounts = {};
        res.data.products.forEach((product) => {
          categoryCounts[product.category] =
            (categoryCounts[product.category] || 0) + 1;
        });

        const labels = Object.keys(categoryCounts);
        const dataValues = Object.values(categoryCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Products",
              data: dataValues,
              backgroundColor: COLORS.slice(0, labels.length),
              borderColor: BORDER_COLORS.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-[#2c2545] rounded-xl p-8">
      <h2 className="text-xl font-semibold mb-6 text-white text-start">
        Product Category Distribution
      </h2>

      {chartData ? (
        <div className="flex justify-center items-center">
          <div className="w-full max-w-[500px] h-[300px]">
            <Doughnut
              data={chartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#fff" },
                  },
                  tooltip: {
                    backgroundColor: "#1f1b2e",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-white text-center">Loading...</p>
      )}
    </div>
  );
}

export default ProductChart;
