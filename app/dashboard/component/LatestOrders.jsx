"use client";

import { useState } from "react";
import { Card, Table, Tag, Dropdown, Modal, notification } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { intlMoneyFormat } from "@/utils/helpers";

const fetchOrders = async () => {
  const response = await axios.get("/orders");
  return response.data.doc;
};

const updateStatus = async ({ id, status }) => {
  const response = await axios.patch(`/orders/${id}`, { status });
  return response.data;
};

const LatestOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      notification.success({ message: "Status updated successfully!" });
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      notification.error({ message: "Failed to update status." });
    },
  });

  const handleStatusClick = (record) => {
    setSelectedOrder(record);
    setNewStatus(record.status);
    setIsDropdownOpen(true);
  };

  const handleDropdownChange = (status) => {
    if (status !== selectedOrder.status) {
      setNewStatus(status);
      setIsModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setSelectedOrder(null);
  };

  const handleConfirmUpdate = () => {
    mutation.mutate({ id: selectedOrder.id, status: newStatus });
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelUpdate = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

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
      render: (status, record) => {
        const color = {
          pending: "orange",
          shipping: "blue",
          refund: "red",
          completed: "green",
        }[status];
        return (
          <div className="relative">
            <Tag
              color={color}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusClick(record);
              }}
              className="cursor-pointer"
            >
              {status}
            </Tag>
            {isDropdownOpen && selectedOrder?.id === record.id && (
              <>
                {/* Dark overlay */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={handleCloseDropdown}
                ></div>
                {/* Dropdown */}
                <div className="absolute z-50 bg-white shadow-lg rounded-md mt-2">
                  {["pending", "completed"].map(
                    (option) => (
                      <div
                        key={option}
                        onClick={() => handleDropdownChange(option)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        );
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
    <>
      <Card title="Latest Orders" className="mt-6">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="custom-table"
        />
      </Card>
      <Modal
        title="Confirm Status Update"
        open={isModalOpen}
        onOk={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
        okText="Update"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to update the status to{" "}
          <strong>{newStatus}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default LatestOrders;
