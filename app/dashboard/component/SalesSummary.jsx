"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { intlMoneyFormat } from "@/utils/helpers"; 

// Fetch sales summary data
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

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Map server data to chart labels and datasets
  const labels = salesData?.map((item) => monthNames[item.month - 1]); // Convert month number to name
  const totals = salesData?.map((item) => item.total);

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
          label: (tooltipItem) => `Sales: ${intlMoneyFormat(tooltipItem.raw)}`, // Format currency
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
          callback: (value) => intlMoneyFormat(value), // Format currency
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
