"use client";
import Sidebar from "@/app/components/layout/Sidebar";
import Navbar from "@/app/components/layout/Navbar";
import StatsCard from "../dashboard/component/StatsCard";
import SalesSummary from "../dashboard/component/SalesSummary";
import LatestOrders from "../dashboard/component/LatestOrders";
import { UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import SearchBar from "../components/layout/SearchBar";
import OrdersTable from "./component/OrderTable";
import Link from "next/link";

const products = () => (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 bg-white ml-64  overflow-y-auto  px-3">
      <div className="p-8 space-y-14">
        <Navbar className={`pt-2 pb-2`}>
          <h1 className="text-2xl mb-8 font-bold ">Product</h1>
        </Navbar>
        <div className="flex justify-between items-center">
          <SearchBar order={`Products`} />
          <Link href="/product-management/add">
            <button className="bg-[#EDB88B] rounded-lg p-3">+ Add Product</button>
          </Link>
        </div>
      </div>
      <OrdersTable />
    </main>
  </div>
);

export default products;
