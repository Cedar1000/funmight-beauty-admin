"use client";
import { Input, Badge, Avatar } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import cookie from "react-cookies";

const Navbar = ({children, className}) => {
   const [userFromCookie, setUserFromCookie] = useState(null);
   useEffect(() => {
     const savedUser = cookie.load("user");
     if (savedUser) {
       setUserFromCookie(
         typeof savedUser === "string" ? JSON.parse(savedUser) : savedUser
       );
     }
   }, []);

  
  return (
    <header
      className={`flex justify-between items-center bg-white ${className} `}
    >
      {/* <Input.Search placeholder="Search" className="w-80" /> */}
      {children}
      <div className="flex items-center space-x-10">
       
        <div className="flex items-center space-x-5">
          <Avatar icon={<UserOutlined />} />
          <p className="font-semibold text-2xl">
            {userFromCookie
              ? `${userFromCookie?.firstName} ${userFromCookie?.lastName}`
              : "FunMight"}
          </p>
        </div>
      </div>
    </header>
  )};

export default Navbar;
