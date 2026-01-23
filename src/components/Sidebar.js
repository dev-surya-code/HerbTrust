import React from "react";
import {
  FaChartBar,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaQrcode,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h2 className="logo">🌿 HerbTrust</h2>

      <button className="nav-btn" onClick={() => setActivePage("dashboard")}>
        <FaChartBar className="icon" /> Dashboard
      </button>

      <button className="nav-btn" onClick={() => setActivePage("supplychain")}>
        <FaProjectDiagram className="icon" /> Supply Chain
      </button>

      <button className="nav-btn" onClick={() => setActivePage("geo")}>
        <FaMapMarkerAlt className="icon" /> Geo-Tracking
      </button>

      <button className="nav-btn" onClick={() => setActivePage("qr")}>
        <FaQrcode className="icon" /> QR Verification
      </button>

      <button className="nav-btn" onClick={() => setActivePage("compliance")}>
        <FaCheckCircle className="icon" /> Compliance
      </button>

      <button className="nav-btn" onClick={() => setActivePage("stakeholder")}>
        <FaUsers className="icon" /> Stakeholders
      </button>
    </div>
  );
}

export default Sidebar;
