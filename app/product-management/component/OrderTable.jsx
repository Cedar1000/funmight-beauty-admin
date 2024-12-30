"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Pagination,
  Button,
  Space,
  Tooltip,
  message,
  Modal,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "@/utils/axios";
import moment from "moment";
import { intlMoneyFormat } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const OrdersTable = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("All Products");

  // Modal state
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pageSize = 10;

  const fetchOrders = async (status, page) => {
    setLoading(true);
    try {
      const response = await axios.get("/products");
      const allData = response.data.doc.map((item) => ({
        key: item.id,
        product: item.name,
        quantity: 1, // Placeholder for quantity
        date: moment(item.createdAt).format("MMM D, YYYY"),
        revenue: intlMoneyFormat(0),
        profit: intlMoneyFormat(0),
        status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      }));

      const filteredData =
        status === "All Products"
          ? allData
          : allData.filter((item) => item.status === status);

      const paginatedData = filteredData.slice(
        (page - 1) * pageSize,
        page * pageSize
      );

      setData(paginatedData);
      setTotal(filteredData.length);
    } catch (error) {
      message.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filter, currentPage);
  }, [filter, currentPage]);

  const handleEdit = (record) => {
    router.push(`/product-management/${record.key}`);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(`/products/${selectedProduct.key}`);
      message.success(`Deleted product: ${selectedProduct.product}`);
      fetchOrders(filter, currentPage); // Refresh data after deletion
    } catch (error) {
      message.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedProduct(null);
    }
  };

  const showDeleteModal = (record) => {
    setSelectedProduct(record);
    setIsDeleteModalVisible(true);
  };

  const columns = [
    { title: "Product ID", dataIndex: "key", key: "key" },
    { title: "Products", dataIndex: "product", key: "product" },
    { title: "QTY", dataIndex: "quantity", key: "quantity" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Revenue", dataIndex: "revenue", key: "revenue" },
    { title: "Net Profit", dataIndex: "profit", key: "profit" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          {
            Published: "green",
            "Out of Stock": "orange",
            Draft: "blue",
          }[status] || "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ color: "#ff4d4f", cursor: "pointer" }}
              onClick={() => showDeleteModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          marginBottom: 16,
          border: "1px solid #d9d9d9",
          padding: 8,
          borderRadius: 4,
        }}
      >
        <div>
          {["All Products", "Published", "Out of Stock", "Draft"].map(
            (status) => (
              <Button
                key={status}
                type="default"
                style={
                  filter === status
                    ? { backgroundColor: "#FDCCA14D", border: "none" }
                    : { border: "none" }
                }
                onClick={() => setFilter(status)}
              >
                {status}
              </Button>
            )
          )}
        </div>
      </div>
      <Card
        title="PRODUCTS"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: 8 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
          rowKey="key"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <div>
            Showing {currentPage * pageSize - pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, total)} of {total} entries
          </div>
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            style={{ alignSelf: "flex-end" }}
          />
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the product{" "}
          <strong>{selectedProduct?.product}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default OrdersTable;
