"use client"; 

import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation"; 
import { usePathname } from "next/navigation"; 

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
    router.push(e.key); 
  };

  return (
    <aside className="w-64 fixed top-0 left-0 h-full bg-black text-white">
      <h1 className="text-2xl mb-8 font-bold py-16 px-6 text-[#B8336A]">FunMight</h1>
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
    </aside>
  );
};

export default Sidebar;
