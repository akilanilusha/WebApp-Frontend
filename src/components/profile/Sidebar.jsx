import React from "react";
import "./TouristDashboard.css";

import logo1 from "../../assets/profile/tripgenixlogo2.jpeg";
import {
  FaSuitcase,
  FaCreditCard,
  FaHeart,
  FaBookmark,
  FaGift,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className="sidebar">
      
       
        <div className="logo-container">
          <img src={logo1} alt="TripGenix Logo" />
        </div>

      <ul className="menu">
  <li>
    <FaSuitcase className="menu-icon" />
    My Bookings
  </li>

  <li>
    <FaCreditCard className="menu-icon" />
    Payments
  </li>

  <li>
    <FaBookmark className="menu-icon" />
    Saved
  </li>

  <li>
    <FaHeart className="menu-icon" />
    Wishlist
  </li>

  <li>
    <FaGift className="menu-icon" />
    Rewards & Loyalty
  </li>

  <li>
    <FaHeadset className="menu-icon" />
    Support
  </li>

  <li>
    <FaCog className="menu-icon" />
    Settings
  </li>

  <li className="logout">
    <FaSignOutAlt className="menu-icon" />
    Logout
  </li>
</ul>

     
    </div>
  );
}
