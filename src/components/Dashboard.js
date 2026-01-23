import React, { useEffect, useState } from "react";
import mapImage from "../assets/map.jpg";
import {
  FaLeaf,
  FaLink,
  FaCheckCircle,
  FaUsers,
  FaBell,
  FaShieldAlt,
  FaCertificate,
  FaUserCircle,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard({ setActivePage }) {
  const [role, setRole] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }

    // Mock notifications (later replace with backend API)
    setNotifications([
      {
        id: 1,
        type: "success",
        message: "Batch BT002 verified successfully",
        time: "2m ago",
      },
      {
        id: 2,
        type: "warning",
        message: "Cold chain disrupted for Batch BT003",
        time: "10m ago",
      },
      {
        id: 3,
        type: "info",
        message: "New stakeholder added: Herbal Pharma Ltd.",
        time: "30m ago",
      },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <div className="dashboard animate__animated animate__fadeInRight">
      {/* Header Section */}
      <div className="header">
        <h1>Dashboard Overview</h1>

        <div className="header-right">
          {/* Notifications */}
          <div className="notifications">
            <FaBell
              size={24}
              className="bell-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            />

            {showNotifications && (
              <div className="notification-dropdown">
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  <ul>
                    {notifications.map((n) => (
                      <li key={n.id} className={`notif-item ${n.type}`}>
                        {n.type === "success" && (
                          <FaCheckCircle className="notif-icon" />
                        )}
                        {n.type === "warning" && (
                          <FaExclamationTriangle className="notif-icon" />
                        )}
                        {n.type === "info" && (
                          <FaCertificate className="notif-icon" />
                        )}
                        <div className="notif-text">
                          <span>{n.message}</span>
                          <small>{n.time}</small>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <FaUserCircle
              size={28}
              className="user-icon"
              onClick={() => setShowProfile(!showProfile)}
            />
            <span className="user-role">{role || "Guest"}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt size={20} />{" "}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card animate__animated animate__zoomIn">
          <FaLeaf size={32} className="icon green" />
          <h2>4</h2>
          <p>Total Herbs Tracked</p>
        </div>

        <div className="stat-card animate__animated animate__zoomIn animate__delay-2s">
          <FaCheckCircle size={32} className="icon success" />
          <h2>4</h2>
          <p>Verified Products</p>
        </div>

        <div className="stat-card animate__animated animate__zoomIn animate__delay-3s">
          <FaUsers size={32} className="icon purple" />
          <h2>4</h2>
          <p>Active Stakeholders</p>
        </div>
      </div>

      {/* Supply Chain Events */}
      <div className="events-network">
        <div className="events">
          <div
            className="section clickable"
            onClick={() => setActivePage("supplychain")}
          >
            <h2>Recent Supply Chain Events</h2>
            <ul>
              <li>
                Testing Event at AYUSH Lab, Mumbai - <span>Verified</span>
              </li>
              <li>
                Processing Event at Ayur Processing Unit, Gujarat -{" "}
                <span>Verified</span>
              </li>
              <li>
                Transport Event to Gujarat - <span>Verified</span>
              </li>
            </ul>
            <p className="view-more">Click to view all events →</p>
          </div>
        </div>
      </div>

      {/* Geo + QR Section */}
      <div className="geo-qr">
        <div className="geo" onClick={() => setActivePage("geo")}>
          <h2>Geographic Distribution</h2>
          <img src={mapImage} alt="map" width={200} height={300} />
          <div className="distribution">
            <div>North India: 3,247</div>
            <div>South India: 4,156</div>
          </div>
        </div>
        <div className="qr">
          <h2>Recent QR Verifications</h2>
          <div className="recent-verifications">
            <h3>Recent Verifications</h3>
            <div className="verification-item">
              <FaCheckCircle className="icon success" /> Ashwagandha
              <span className="status good">Verified</span>
              <small>Bangalore Health Center – 06/09/2025</small>
            </div>
            <div className="verification-item">
              <FaCheckCircle className="icon success" /> Turmeric
              <span className="status good">Verified</span>
              <small>Delhi Ayurvedic Store – 08/09/2025</small>
            </div>
            <div className="verification-item">
              <FaCheckCircle className="icon success" /> Neem
              <span className="status good">Verified</span>
              <small>Mumbai Pharmacy – 09/09/2025</small>
            </div>
            <div className="verification-item">
              <FaCheckCircle className="icon success" /> Brahmi
              <span className="status good">Verified</span>
              <small>Coimbatore Health Center – 10/09/2025</small>
            </div>
          </div>
          <button onClick={() => setActivePage("qr")}>
            Generate New QR Code
          </button>
        </div>
      </div>

      {/* Compliance + Alerts */}
      <div className="compliance-alerts">
        <div className="compliance">
          <h2 style={{ color: "rgb(0, 170, 255)" }}>
            Regulatory Compliance Status
          </h2>
          <div className="compliance-grid">
            <div className="comp-card">
              <FaCheckCircle className="comp-icon success" size={28} />
              <div>
                <h3>AYUSH Guidelines</h3>
                <p>
                  All batches compliant <strong>98%</strong>
                </p>
              </div>
            </div>
            <div className="comp-card">
              <FaShieldAlt className="comp-icon warning" size={28} />
              <div>
                <h3>WHO-GMP</h3>
                <p>
                  Manufacturing standards <strong>95%</strong>
                </p>
              </div>
            </div>
            <div className="comp-card">
              <FaCertificate className="comp-icon info" size={28} />
              <div>
                <h3>ISO Standards</h3>
                <p>
                  Quality assurance <strong>92%</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="alerts">
          <h2>System Alerts</h2>
          <div className="alert-item alert-temp">
            Temperature Alert: Cold chain disrupted for batch BT003 (2 Hours
            ago)
          </div>
          <div className="alert-item alert-quality">
            Quality Failure: Batch BT005 failed purity test (5 Hours ago)
          </div>
          <div className="alert-item alert-update">
            System Update: New version deployed successfully (1 Hour ago)
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
