"use client";
import { Card, Table, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios"; 
import Link from "next/link";
import Skeleton from "react-loading-skeleton"; 
import { intlMoneyFormat } from "@/utils/helpers";

const fetchOrders = async () => {
  const response = await axios.get("/orders");
  return response.data.doc; 
};

const LatestOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return (
      <Card title="Latest Orders" className="mt-6">
        <Skeleton count={5} height={50} className="mb-2" />
      </Card>
    );
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) =>
        record.products.reduce((total, product) => total + product.quantity, 0),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (price, record) => intlMoneyFormat(price + record.shipping),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = {
          Pending: "orange",
          Shipping: "blue",
          Refund: "red",
          Completed: "green",
        }[status];
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Details",
      key: "details",
      render: (text, record) => (
        <Link href={`/dashboard/${record.id}`}>
          <p className="text-blue-500">View Details</p>
        </Link>
      ),
    },
  ];

  return (
    <Card title="Latest Orders" className="mt-6">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="custom-table"
      />
    </Card>
  );
};

export default LatestOrders;
