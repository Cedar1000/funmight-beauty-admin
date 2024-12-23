"use client";
import { Card, Statistic } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios"; // Adjust the path for your axios instance
import { ShoppingOutlined } from "@ant-design/icons"; // Add this import

const fetchOverviewData = async () => {
  const response = await axios.get("/orders/get-overview");
  return response.data.data;
};

const StatsCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["overviewData"],
    queryFn: fetchOverviewData,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <Card className="w-full p-4 rounded-lg shadow-md bg-white">
        <div className="animate-pulse flex justify-between items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <p className="w-24 bg-gray-300 h-4 rounded-sm"></p>
        </div>
        <div className="ml-4 flex justify-between items-start">
          <Statistic
            title={<span className="text-gray-500 text-sm">Loading...</span>}
            value="..."
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-500 text-sm">Loading...</span>}
            value="..."
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-500 text-sm">Loading...</span>}
            value="..."
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
        </div>
      </Card>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Card className="w-full p-4 rounded-lg shadow-md bg-white">
        <p className="text-red-500">
          Error fetching data. Please try again later.
        </p>
      </Card>
    );
  }

  // Destructure the fetched data
  const { pending, completed, shipping, total } = data;

  return (
    <Card className="w-full p-4 rounded-lg shadow-md bg-white">
      <div className="">
        <div className="flex justify-between ">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
            <ShoppingOutlined /> {/* Shopping icon */}
          </div>
          <p>This week</p>
        </div>
        {/* Statistics Section */}
        <div className="ml-4 mt-20  grid items-center grid-cols-2 lg:grid-cols-4 gap-4">
          <Statistic
            title={<span className="text-gray-500 text-sm">Orders</span>}
            value={total}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-500 text-sm">Pending</span>}
            value={pending}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-500 text-sm">Shipping</span>}
            value={shipping}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-500 text-sm">Completed</span>}
            value={completed}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
