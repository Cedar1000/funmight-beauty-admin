"use client"; 

import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation"; 
import { usePathname } from "next/navigation"; 
import Link from "next/link";
import cookie from "react-cookies";

const Sidebar = () => {
  const router = useRouter(); 
  const pathname = usePathname();


  const items = [
    { label: "Dashboard", key: "/dashboard", icon: <AppstoreOutlined /> },
    {
      label: "Product Management",
      key: "/product-management",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: "Order Management",
      key: "/order-management",
      icon: <LineChartOutlined />,
    },
    { label: "Reports", key: "/reports" },
  ];

  
 const onMenuClick = (e) => {
   if (e.key === "logout") {
     // Handle logout
     cookie.remove("token", { path: "/" });
     cookie.remove("user", { path: "/" });
     router.push("/signin"); 
   } else {
     router.push(e.key); 
   }
 };

  return (
    <aside className="w-64 fixed top-0 left-0 h-full bg-black text-white">
      <Link href="/">
        <h1 className="text-2xl mb-8 font-bold py-16 px-6 text-[#B8336A]">
          FunMight
        </h1>
      </Link>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[pathname]}
        onClick={onMenuClick}
        items={items}
        style={{
          backgroundColor: "black",
        }}
      />

      {/* Bottom Section (Logout Button) */}
      <div className="p-4 fixed w-64 bottom-0 border-t border-gray-700">
        <Menu
          theme="dark"
          mode="vertical"
          onClick={onMenuClick}
          items={[
            {
              label: "Logout",
              key: "logout",
              icon: <LogoutOutlined />,
              style: { color: "red" },
            },
          ]}
          style={{
            backgroundColor: "black",
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
