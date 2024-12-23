"use client";
import { Input, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Navbar = ({children, className}) => (
  <header className={`flex justify-between items-center bg-white ${className} `}>
    {/* <Input.Search placeholder="Search" className="w-80" /> */}
    {children}
    <div className="flex items-center space-x-10">
      <Badge count={5}>
        <BellOutlined style={{ fontSize: 20 }} />
      </Badge>
      <div className="flex items-center space-x-5">
        <Avatar icon={<UserOutlined />} />
        <p className="font-semibold text-2xl">FunMight</p>
      </div>
    </div>
  </header>
);

export default Navbar;
