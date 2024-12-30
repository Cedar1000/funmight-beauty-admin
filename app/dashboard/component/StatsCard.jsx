"use client";

import { Card, Statistic, Button, Modal, Input, message, List } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { ShoppingOutlined } from "@ant-design/icons";

const fetchOverviewData = async () => {
  const response = await axios.get("/orders/get-overview");
  return response.data.data;
};

const StatsCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["overviewData"],
    queryFn: fetchOverviewData,
  });

  // Modal State
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isOperationModalVisible, setIsOperationModalVisible] = useState(false);
  const [currentType, setCurrentType] = useState(""); // 'tag' or 'category'
  const [currentAction, setCurrentAction] = useState(""); // 'create', 'edit', or 'delete'
  const [name, setName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [items, setItems] = useState([]); // Fetched tags or categories

  // Show the action modal for Tag or Category
  // const showActionModal = async (type) => {
  //   setCurrentType(type);
  //   setIsActionModalVisible(true);

  //   // Fetch existing tags/categories
  //   try {
  //     const response = await axios.get(`/${type}s`);
  //     setItems(response.data.data); // Adjust response structure if needed
  //   } catch (error) {
  //     message.error(`Failed to fetch ${type}s. Please try again.`);
  //   }
  // };

  const closeActionModal = () => {
    setIsActionModalVisible(false);
    setCurrentType("");
    setItems([]);
  };

  // Show the operation modal for Create/Edit/Delete
  const showOperationModal = (action, id = "", name = "") => {
    setCurrentAction(action);
    setSelectedId(id);
    setName(name);
    setIsOperationModalVisible(true);
    setIsActionModalVisible(false); // Close the action modal
  };

  const closeOperationModal = () => {
    setIsOperationModalVisible(false);
    setCurrentAction("");
    setName("");
    setSelectedId("");
  };

  // Handle API Operations
const handleOperation = async () => {
  try {
    if (currentAction === "create") {
      await axios.post(`/${currentType}`, { name }); // Correct path
      message.success(`${currentType} created successfully!`);
    } else if (currentAction === "edit") {
      await axios.patch(`/${currentType}/${selectedId}`, { name }); // Correct path
      message.success(`${currentType} updated successfully!`);
    } else if (currentAction === "delete") {
      await axios.delete(`/${currentType}/${selectedId}`); // Correct path
      message.success(`${currentType} deleted successfully!`);
    }
    closeOperationModal();
  } catch (error) {
    message.error(
      `Failed to ${currentAction} ${currentType}. Please try again.`
    );
  }
};

const showActionModal = async (type) => {
  setCurrentType(type);
  setIsActionModalVisible(true);

  // Fetch existing tags/categories
  try {
    const response = await axios.get(`/${type}`); 
    setItems(response.data.doc); 
  } catch (error) {
    message.error(`Failed to fetch ${type}. Please try again.`);
  }
};


  // Loading and error handling
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
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full p-4 rounded-lg shadow-md bg-white">
        <p className="text-red-500">
          Error fetching data. Please try again later.
        </p>
      </Card>
    );
  }

  const { pending, completed, shipping, total } = data;

  return (
    <Card className="w-full p-4 rounded-lg shadow-md bg-white">
      <div className="">
        <div className="flex justify-between">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
            <ShoppingOutlined />
          </div>
          <p>This week</p>
        </div>
        <div className="ml-4 mt-10 grid items-center grid-cols-2 lg:grid-cols-4 gap-4">
          <Statistic title="Orders" value={total} />
          <Statistic title="Pending" value={pending} />
          <Statistic title="Shipping" value={shipping} />
          <Statistic title="Completed" value={completed} />
        </div>
        <div className="mt-16 flex gap-5  justify-between">
          <Button
            className="bg-[#B8336A] "
            type="primary"
            onClick={() => showActionModal("tags")}
          >
            Manage Tags
          </Button>
          <Button
            className="bg-[#B8336A] "
            type="primary"
            onClick={() => showActionModal("category")}
          >
            Manage Categories
          </Button>
        </div>
      </div>

      {/* Action Modal */}
      <Modal
        title={`Manage ${
          currentType.charAt(0).toUpperCase() + currentType.slice(1)
        }`}
        open={isActionModalVisible}
        onCancel={closeActionModal}
        footer={null}
      >
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Button
                  key={item.id}
                  type="link"
                  onClick={() => showOperationModal("edit", item.id, item.name)}
                >
                  Edit
                </Button>,
                <Button
                  key={item.id}
                  type="link"
                  danger
                  onClick={() => showOperationModal("delete", item.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
        <Button
          block
          type="primary"
          onClick={() => showOperationModal("create")}
          className="bg-[#B8336A]"
        >
          Create New{" "}
          {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
        </Button>
      </Modal>

      {/* Operation Modal */}
      <Modal
        title={`${
          currentAction.charAt(0).toUpperCase() + currentAction.slice(1)
        } ${currentType.charAt(0).toUpperCase() + currentType.slice(1)}`}
        open={isOperationModalVisible}
        onOk={handleOperation}
        onCancel={closeOperationModal}
        okText={currentAction === "delete" ? "Confirm" : "Save"}
        cancelText="Cancel"
      >
        {currentAction !== "delete" ? (
          <Input
            placeholder={`Enter ${currentType} name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p>Are you sure you want to delete this {currentType}?</p>
        )}
      </Modal>
    </Card>
  );
};

export default StatsCard;
