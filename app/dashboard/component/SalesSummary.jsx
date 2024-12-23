"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";

const fetchSalesSummary = async () => {
  const response = await axios.get("/orders/get-sales-summary");
  return response.data.data;
};

const ChartSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-1/4 bg-gray-300 rounded mb-4"></div>{" "}
      {/* Header Skeleton */}
      <div className="h-64 bg-gray-200 rounded"></div> {/* Chart Skeleton */}
    </div>
  );
};

const SalesSummary = () => {
  const {
    data: salesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesSummary"],
    queryFn: fetchSalesSummary,
  });

  if (isLoading) {
    return (
      <div className="sales-summary-container">
        <ChartSkeleton />
      </div>
    );
  }

  if (isError) {
    return <p>Error fetching sales data. Please try again later.</p>;
  }

  // Map server data to chart labels and datasets
  const labels = salesData.map((item) => `Month ${item.month}`);
  const totals = salesData.map((item) => item.total);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: totals,
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === Math.floor(totals.length / 2)
            ? "#B8336A"
            : "#EC87B1"; // Highlight the middle bar
        },
        barThickness: 5,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Sales: $${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#666666",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => `$${value}`,
          color: "#666666",
        },
        grid: {
          color: "#EFEFEF",
          lineWidth: 1,
          borderDash: [4, 4],
        },
      },
    },
  };

  return (
    <div className="sales-summary-container ">
      <div className="header">
        <h2>Sales Summary</h2>
        <span className="bi-weekly-report">Bi-Weekly Report</span>
      </div>
      <div className="chart-container ">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesSummary;
