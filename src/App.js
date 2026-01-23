import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SupplyChain from "./components/SupplyChain";
import GeoTracking from "./components/GeoTracking";
import QrVerification from "./components/Qrcode";
import CompliancePage from "./components/Compliance";
import StakeholderManagement from "./components/StakeHolders";
import AuthPage from "./components/AuthPage"; // 🔑 login/signup page
import LoadingScreen from "./components/LoadingScreen"; // ⏳ splash screen

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState(null); // logged in user info
  const [loading, setLoading] = useState(true);

  // 🔹 Auto-login on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Show splash screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    localStorage.setItem("userRole", loggedInUser.role);
    setActivePage("dashboard");
  };

  // Handle logout
  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");

    // Redirect to login page (replace prevents back button issue)
    window.location.replace("/");
  };

  // If still loading → show splash screen
  if (loading) {
    return <LoadingScreen />;
  }

  // If no user → show login/signup page
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // If logged in → show dashboard + sidebar
  return (
    <div className="app">
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        {activePage === "dashboard" && (
          <Dashboard setActivePage={setActivePage} onLogout={handleLogout} />
        )}
        {activePage === "supplychain" && <SupplyChain />}
        {activePage === "geo" && <GeoTracking />}
        {activePage === "qr" && <QrVerification />}
        {activePage === "compliance" && <CompliancePage />}
        {activePage === "stakeholder" && <StakeholderManagement />}
      </div>
    </div>
  );
}

export default App;
