"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { Image, Table, Tag } from "antd";
import Skeleton from "react-loading-skeleton";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import Sidebar from "@/app/components/layout/Sidebar";
import { intlMoneyFormat } from "@/utils/helpers";

const fetchOrders = async () => {
  const response = await axios.get("/orders");
  return response.data.doc; 
};

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton count={3} height={30} className="my-3" />
        <Skeleton count={5} height={40} className="my-3" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        <p>Error fetching order details. Please try again later.</p>
      </div>
    );
  }

  const order = data?.find((order) => order.id === id);

  if (!order) {
    return (
      <div className="p-6 text-gray-500">
        <p>Order not found.</p>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    shippingAddress,
    billingAddress,
    products,
    status,
    createdAt,
    price,
    shipping,
  } = order;

  const tableData = products.map((product) => ({
    key: product?._id || "unknown",
    product: product?.product?.name || "Unknown Product",
    quantity: product?.quantity || 0,
    rate: product?.product?.price || 0,
    amount: (product?.product?.price || 0) * (product?.quantity || 0),
    image: product?.product?.images?.[0]?.url || "",
  }));


  const columns = [
    {
      title: <span className=" font-semibold">Image</span>,
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Image
            src={image}
            alt="Product image"
            width={50}
            preview={false}
            className="rounded-md"
          />
        ) : null,
    },
    {
      title: <span className=" font-semibold">Product</span>,
      dataIndex: "product",
      key: "product",
    },
    {
      title: <span className=" font-semibold">Quantity</span>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <span className=" font-semibold">Rate</span>,
      dataIndex: "rate",
      key: "rate",
      render: (rate) => intlMoneyFormat(rate),
    },
    {
      title: <span className="font-semibold">Amount</span>,
      dataIndex: "amount",
      key: "amount",
      render: (amount) => intlMoneyFormat(amount),
    },
  ];

  

 // Function to get status styles
const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-orange-100 text-orange-700";
    case "Shipping":
      return "bg-blue-100 text-blue-700";
    case "Refund":
      return "bg-red-100 text-red-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};



  return (
    <div className="flex">
      <Sidebar />

      <main className=" min-h-screen flex-1 bg-white ml-64  overflow-y-auto  p-6">
        <section className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Order Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h3 className="text-xl mb-2 font-bold text-gray-700">
                Customer Information
              </h3>
              <p className="text-gray-600 flex items-center">
                <AiOutlineMail className="mr-2 text-xl" />
                {email}
              </p>
              <p className="text-gray-600 flex items-center">
                <AiOutlinePhone className="mr-2 text-xl" />
                {phone}
              </p>
              <p className="text-gray-600">
                <strong>Name:</strong> {firstName} {lastName}
              </p>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4">
              <h3 className="text-xl mb-2 font-bold text-gray-700">
                Shipping Information
              </h3>
              <p className="text-gray-600">
                <strong>Shipping Address:</strong> {shippingAddress}
              </p>
              <p className="text-gray-600">
                <strong>Billing Address:</strong> {billingAddress}
              </p>
            </div>
          </div>

          {/* Order Info */}
          <div className="space-y-4">
            <h3 className="text-xl mb-2 font-bold text-gray-700">
              Order Information
            </h3>
            <p className="text-gray-600">
              <strong>Status:</strong>{" "}
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  status
                )}`}
              >
                {status}
              </div>
            </p>
            <p className="text-gray-600 flex items-center">
              <AiOutlineCalendar className="mr-2 text-xl" />
              {new Date(createdAt).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <strong>Total Amount:</strong> {intlMoneyFormat(price + shipping)}
            </p>
          </div>
        </section>

        {/* Products Table */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Ordered Products
          </h3>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              className="custom-table"
              rowKey="key"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderDetails;
