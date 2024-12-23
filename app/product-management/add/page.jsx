"use client";

import {
  Card,
  Input,
  Select,
  Button,
  Space,
  Upload,
  message,
  Breadcrumb,
  Checkbox,
} from "antd";
import { PlusOutlined, InboxOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import Sidebar from "@/app/components/layout/Sidebar";
import { useState } from "react";

const { Option } = Select;
const { Dragger } = Upload;

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);

  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    tags: "",
    status: "Draft",
    basePrice: "",
    discountType: "",
    discountValue: "",
    taxClass: "",
    vatAmount: "",
    quantity: "",
    variations: [{ type: "", value: "" }],
    shipping: {
      weight: "",
      height: "",
      length: "",
      width: "",
    },
    images: [],
  });

  const handleInputChange = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      shipping: { ...prev.shipping, [field]: value },
    }));
  };

   const handleVariantChange = (index, field, value) => {
     const updatedVariations = [...productData.variations];
     updatedVariations[index][field] = value;

     setProductData((prev) => ({
       ...prev,
       variations: updatedVariations,
     }));
   };

   const addVariant = () => {
     setProductData((prev) => ({
       ...prev,
       variations: [...prev.variations, { type: "", value: "" }],
     }));
   };

   const deleteVariant = (index) => {
     const updatedVariations = productData.variations.filter(
       (_, i) => i !== index
     );

     setProductData((prev) => ({
       ...prev,
       variations: updatedVariations,
     }));
   };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, file],
      }));
      message.success(`${file.name} uploaded successfully.`);
    }, 1000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white ml-64 overflow-y-auto px-3">
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
          {/* Breadcrumb */}
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Add Product</Breadcrumb.Item>
          </Breadcrumb>

          <Card
            title="Add Product"
            style={{
              border: "none",
              boxShadow: "none",
            }}
            styles={{
              header: {
                borderBottom: "none",
              },
            }}
            extra={
              <Space>
                <Button icon={<CloseOutlined />}>Cancel</Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  loading={loading}
                >
                  Add Product
                </Button>
              </Space>
            }
          >
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {/* Left Section */}
              <div style={{ flex: 2, minWidth: "60%" }}>
                {/* General Information */}
                <Card
                  title="General Information"
                  bordered={false}
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
                    marginBottom: "14px",
                  }}
                >
                  {/* Product Name */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="productName"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Product Name
                    </label>
                    <Input
                      id="productName"
                      placeholder="Type product name here..."
                      value={productData.productName}
                      onChange={(e) =>
                        handleInputChange("productName", e.target.value)
                      }
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #d9d9d9",
                        backgroundColor: "#F9F9FC",
                        color: "black",
                        caretColor: "black",
                      }}
                    />
                  </div>

                  {/* Product Description */}
                  <div style={{ marginBottom: "10px" }}>
                    <label
                      htmlFor="productDescription"
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Product Description
                    </label>
                    <Input.TextArea
                      id="productDescription"
                      placeholder="Type product description here..."
                      rows={3}
                      value={productData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #d9d9d9",
                        backgroundColor: "#F9F9FC",
                        color: "black",
                        caretColor: "black",
                      }}
                    />
                  </div>
                </Card>

                {/* Media */}
                <Card
                  title="Media"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
                    marginBottom: "14px",
                  }}
                >
                  <Dragger
                    customRequest={handleUpload}
                    accept="image/*"
                    multiple={false}
                    style={{
                      padding: "20px",
                      border: "2px dashed #F9F9FC",
                      borderRadius: "8px",
                      backgroundColor: "#F9F9FC",
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: "#FD8A1C" }} />
                    </p>
                    <p>Drag and drop image here, or click to add image</p>
                  </Dragger>
                </Card>

                {/* Pricing */}
                <Card
                  title="Pricing"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "14px",
                  }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {/* Base Price */}
                    <div>
                      <label
                        htmlFor="basePrice"
                        style={{
                          display: "block",
                          marginBottom: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Base Price
                      </label>
                      <Input
                        id="basePrice"
                        placeholder="Type base price here..."
                        value={productData.basePrice}
                        onChange={(e) =>
                          handleInputChange("basePrice", e.target.value)
                        }
                        style={{
                          borderRadius: "8px",
                          backgroundColor: "#F9F9FC",
                          color: "black",
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      {/* Discount Type */}
                      <div className="w-full">
                        <label
                          htmlFor="discountType"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          Discount Type
                        </label>
                        <Select
                          id="discountType"
                          placeholder="Select a discount type"
                          value={productData.discountType}
                          onChange={(value) =>
                            handleInputChange("discountType", value)
                          }
                          styles={{
                            header: {
                              borderBottom: "none",
                            },
                          }}
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                          }}
                        >
                          <Option value="percentage">Percentage</Option>
                          <Option value="fixed">Fixed Amount</Option>
                        </Select>
                      </div>

                      {/* Discount Percentage */}
                      <div style={{ width: "100%" }}>
                        <label
                          htmlFor="discountValue"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          Discount Percentage (%)
                        </label>
                        <Input
                          id="discountValue"
                          placeholder="Type discount percentage..."
                          value={productData.discountValue}
                          onChange={(e) =>
                            handleInputChange("discountValue", e.target.value)
                          }
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                            color: "black",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                      {/* Tax Class */}
                      <div className="w-full">
                        <label
                          htmlFor="taxClass"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          Tax Class
                        </label>
                        <Select
                          id="taxClass"
                          placeholder="Select a tax class"
                          value={productData.taxClass}
                          onChange={(value) =>
                            handleInputChange("taxClass", value)
                          }
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                          }}
                        >
                          <Option value="standard">Standard</Option>
                          <Option value="reduced">Reduced</Option>
                        </Select>
                      </div>

                      {/* VAT Amount */}
                      <div className="w-full">
                        <label
                          htmlFor="vatAmount"
                          style={{
                            display: "block",
                            marginBottom: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          VAT Amount (%)
                        </label>
                        <Input
                          id="vatAmount"
                          placeholder="Type VAT amount..."
                          value={productData.vatAmount}
                          onChange={(e) =>
                            handleInputChange("vatAmount", e.target.value)
                          }
                          style={{
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                            color: "black",
                          }}
                        />
                      </div>
                    </div>
                  </Space>
                </Card>

                {/* Inventory */}
                <Card
                  title="Inventory"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <Input placeholder="Type product quantity here..." />
                </Card>

                {/* Variation */}
                <Card
                  title="Variation"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {productData.variations.map((variant, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center gap-4"
                      >
                        {/* Variation Type */}
                        <Select
                          placeholder="Select a variation"
                          style={{
                            flex: 1,
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                            color: "black",
                          }}
                          styles={{
                            dropdownStyle: {
                              backgroundColor: "#F9F9FC",
                              color: "black",
                            },
                          }}
                          value={variant.type}
                          onChange={(value) =>
                            handleVariantChange(index, "type", value)
                          }
                        >
                          <Option value="color">Color</Option>
                          <Option value="size">Size</Option>
                        </Select>

                        {/* Variation Value */}
                        <Input
                          placeholder="Variation..."
                          value={variant.value}
                          onChange={(e) =>
                            handleVariantChange(index, "value", e.target.value)
                          }
                          style={{
                            flex: 1,
                            borderRadius: "8px",
                            backgroundColor: "#F9F9FC",
                            color: "black",
                          }}
                        />

                        {/* Delete Button */}
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          danger
                          onClick={() => deleteVariant(index)}
                        />
                      </div>
                    ))}
                  </Space>

                  {/* Add Variant Button */}
                  <Button
                    type="primary"
                    style={{
                      marginTop: "10px",
                      background: "#FDCCA1",
                      color: "#353535",
                      border: "none",
                    }}
                    icon={<PlusOutlined />}
                    onClick={addVariant}
                  >
                    Add Variant
                  </Button>
                </Card>

                {/* Shipping */}
                <Card
                  title="Shipping"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Checkbox style={{ marginBottom: "10px" }}>
                    This is a physical product
                  </Checkbox>
                  <Space direction="horizontal" style={{ width: "100%" }}>
                    <Input
                      placeholder="Weight (kg)"
                      value={productData.shipping.weight}
                      className="bg-[#F9F9FC] p-2"
                      onChange={(e) =>
                        handleShippingChange("weight", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Height (cm)"
                      value={productData.shipping.height}
                      className="bg-[#F9F9FC] p-2"
                      onChange={(e) =>
                        handleShippingChange("height", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Length (cm)"
                      value={productData.shipping.length}
                      className="bg-[#F9F9FC] p-2"
                      onChange={(e) =>
                        handleShippingChange("length", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Width (cm)"
                      value={productData.shipping.width}
                      className="bg-[#F9F9FC] p-2"
                      onChange={(e) =>
                        handleShippingChange("width", e.target.value)
                      }
                    />
                  </Space>
                </Card>
              </div>

              {/* Right Section */}
              <div style={{ flex: 1, minWidth: "30%" }}>
                <Card
                  title="Category"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom: "20px",
                  }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Select placeholder="Select Category">
                      <Option value="electronics">Electronics</Option>
                      <Option value="fashion">Fashion</Option>
                    </Select>
                    <Input placeholder="Product Tags" />
                  </Space>
                </Card>

                <Card
                  title="Status"
                  styles={{
                    header: {
                      borderBottom: "none",
                    },
                  }}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Select
                    placeholder="Product Status"
                    style={{ width: "100%" }}
                  >
                    <Option value="published">Published</Option>
                    <Option value="draft">Draft</Option>
                  </Select>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
