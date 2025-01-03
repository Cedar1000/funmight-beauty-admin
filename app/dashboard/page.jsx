"use client";
import { useState } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import Navbar from "@/app/components/layout/Navbar";
import axios from "@/utils/axios";
import StatsCard from "./component/StatsCard";
import SalesSummary from "./component/SalesSummary";
import LatestOrders from "./component/LatestOrders";
import { UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import SearchBar from "../components/layout/SearchBar";

const Dashboard = () =>{
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(`/orders/search/${query}`); // Example API endpoint
        setSearchResults(response.data.doc || []);
      } catch (error) {
        console.error("Error searching orders:", error);
        setSearchResults([]);
      }
    };

    const getLink = (result) => `/dashboard/${result.id}`;
  
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white ml-64  overflow-y-auto  p-6">
        <Navbar className={`pr-[53px] pl-[69px] pt-12 pb-16`}>
          <SearchBar
            order="Orders"
            onSearch={handleSearch}
            searchResults={searchResults}
            getLink={getLink} 
          />
        </Navbar>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* <StatsCard
            title="Customers"
            value="1,250"
            description="Active: 1,180"
            icon={<UserOutlined />}
          /> */}
            <StatsCard
              title="Orders"
              value="100"
              text="Pending"
              textValue="20"
              final="Completed"
              finalValue="80"
              description="Pending: 20, Completed: 80"
              icon={<ShoppingOutlined />}
            />
            <SalesSummary />
          </div>
          <LatestOrders />
        </div>
      </main>
    </div>
  );};

export default Dashboard;
