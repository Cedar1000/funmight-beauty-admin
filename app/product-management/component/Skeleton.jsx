import React from "react";
import { Card, Space } from "antd";

const SkeletonLoader = () => {
  const skeletonBox = (height, width = "100%", borderRadius = "8px") => (
    <div
      style={{
        height,
        width,
        backgroundColor: "#E0E0E0",
        borderRadius,
        marginBottom: "10px",
      }}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      <main>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header Skeleton */}
          {skeletonBox("40px", "30%", "8px")}

          {/* Main Content Layout */}
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {/* Left Section */}
            <div style={{ flex: 2 }}>
              {/* Product Information Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "60%")}
                {skeletonBox("200px")}
              </Card>

              {/* Media Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "40%")}
                {skeletonBox("200px", "100%", "8px")}
              </Card>

              {/* Pricing Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                <Space direction="vertical" style={{ width: "100%" }}>
                  {skeletonBox("40px")}
                  <div style={{ display: "flex", gap: "10px" }}>
                    {skeletonBox("40px", "50%")}
                    {skeletonBox("40px", "50%")}
                  </div>
                </Space>
              </Card>

              {/* Inventory Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                {skeletonBox("40px")}
              </Card>

              {/* Variation Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                {skeletonBox("40px")}
              </Card>

              {/* Shipping Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                <div style={{ display: "flex", gap: "10px" }}>
                  {skeletonBox("40px", "25%")}
                  {skeletonBox("40px", "25%")}
                  {skeletonBox("40px", "25%")}
                  {skeletonBox("40px", "25%")}
                </div>
              </Card>
            </div>

            {/* Right Section */}
            <div style={{ flex: 1 }}>
              {/* Category Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                {skeletonBox("40px")}
              </Card>

              {/* Tags Card */}
              <Card style={{ marginBottom: "20px" }}>
                {skeletonBox("20px", "50%")}
                {skeletonBox("40px")}
              </Card>

              {/* Status Card */}
              <Card>
                {skeletonBox("20px", "50%")}
                {skeletonBox("40px")}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkeletonLoader;
