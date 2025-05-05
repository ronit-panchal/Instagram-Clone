// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  BarChart2,
  User,
} from "lucide-react";
import "./sidebar.css";

const Sidebar = () => {
  const menuItems = [
    { icon: <Home />, label: "Home", path: "/home" },
    { icon: <Search />, label: "Search", path: "/search" },
    { icon: <Compass />, label: "Explore", path: "/explore" },
    { icon: <Film />, label: "Reels", path: "/reels" },
    { icon: <MessageCircle />, label: "Messages", path: "/message" },
    { icon: <Heart />, label: "Notifications", path: "/notifications" },
    { icon: <PlusSquare />, label: "Create", path: "/create" },
    { icon: <BarChart2 />, label: "Dashboard", path: "/dashboard" },
    { icon: <User />, label: "Login", path: "/Login" },
  ];

  return (
    <div className="sidebar">
      <NavLink to= "/home">
      <div className="logo">Convo</div>
      </NavLink>
      
      <div className="nav-links">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
