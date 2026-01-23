import React, { useState } from "react";
import {
  FaUsers,
  FaTractor,
  FaShoppingCart,
  FaIndustry,
  FaSearch,
} from "react-icons/fa";

const StakeholderManagement = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Name");

  const stakeholders = [
    // 👩‍🌾 Farmers
    {
      name: "Raj Kumar",
      role: "Farmer",
      org: "Green Valley Farm",
      location: "Rajasthan, India",
      joined: "15/01/2023",
      status: "active",
      rating: 4.8,
      herbs: 45,
      lastActive: "08/01/2024",
    },
    {
      name: "Sunita Devi",
      role: "Farmer",
      org: "Organic Roots",
      location: "Punjab, India",
      joined: "11/05/2022",
      status: "inactive",
      rating: 4.3,
      herbs: 20,
      lastActive: "12/08/2023",
    },

    // 🏭 Manufacturers
    {
      name: "Aarav Singh",
      role: "Manufacturer",
      org: "Ayur Processing Unit",
      location: "Delhi, India",
      joined: "20/03/2022",
      status: "active",
      rating: 4.5,
      herbs: 30,
      lastActive: "05/12/2023",
    },
    {
      name: "Meera Patel",
      role: "Manufacturer",
      org: "HerbalCare Ltd.",
      location: "Ahmedabad, India",
      joined: "02/09/2021",
      status: "inactive",
      rating: 4.1,
      herbs: 15,
      lastActive: "20/07/2023",
    },

    // 🛒 Consumers
    {
      name: "Neha Verma",
      role: "Consumer",
      org: "Ayurveda Wellness Club",
      location: "Mumbai, India",
      joined: "10/07/2021",
      status: "inactive",
      rating: 4.2,
      herbs: 0,
      lastActive: "15/06/2023",
    },
    {
      name: "Rohan Sharma",
      role: "Consumer",
      org: "Wellness Market",
      location: "Bangalore, India",
      joined: "12/01/2023",
      status: "active",
      rating: 4.7,
      herbs: 5,
      lastActive: "10/02/2024",
    },
  ];

  const filterOptions = ["All", "Farmers", "Manufacturers", "Consumers"];
  // 🔎 Filter + search
  // Mapping filter labels to actual stakeholder roles
const filterMap = {
  All: "All",
  Farmers: "Farmer",
  Manufacturers: "Manufacturer",
  Consumers: "Consumer",
};

// 🔎 Filter + search
const filteredStakeholders = stakeholders
  .filter((s) =>
    activeFilter === "All" ? true : s.role === filterMap[activeFilter]
  )
  .filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.org.toLowerCase().includes(search.toLowerCase())
  );


  // ⬇️ Sorting
  const sortedStakeholders = [...filteredStakeholders].sort((a, b) => {
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Rating") return b.rating - a.rating;
    if (sortBy === "Last Active")
      return new Date(b.lastActive) - new Date(a.lastActive);
    return 0;
  });

  return (
    <div className="stakeholder-page">
      <h2 className="page-title">Stakeholder Management</h2>
      <p className="subtitle">
        Manage and monitor all stakeholders in the supply chain
      </p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <FaUsers className="icon" />
          <div>
            <h3>Total Stakeholders</h3>
            <p>{stakeholders.length}</p>
          </div>
        </div>
        <div className="card">
          <FaUsers className="icon active" />
          <div>
            <h3>Active Stakeholders</h3>
            <p>{stakeholders.filter((s) => s.status === "active").length}</p>
          </div>
        </div>
        <div className="card">
          <FaTractor className="icon" />
          <div>
            <h3>Farmers</h3>
            <p>{stakeholders.filter((s) => s.role === "Farmer").length}</p>
          </div>
        </div>
        <div className="card">
          <FaIndustry className="icon" />
          <div>
            <h3>Manufacturers</h3>
            <p>
              {stakeholders.filter((s) => s.role === "Manufacturer").length}
            </p>
          </div>
        </div>
        <div className="card">
          <FaShoppingCart className="icon" />
          <div>
            <h3>Consumers</h3>
            <p>{stakeholders.filter((s) => s.role === "Consumer").length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search + Sort Controls */}
      <div className="controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="sort-dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Name">Sort by Name</option>
          <option value="Rating">Sort by Rating</option>
          <option value="Last Active">Sort by Last Active</option>
        </select>
      </div>

      {/* Stakeholder Categories */}
      <div className="categories">
        <div className="category">
          <FaTractor /> Farmers{" "}
          <span>
            {
              stakeholders.filter(
                (s) => s.role === "Farmer" && s.status === "active"
              ).length
            }{" "}
            active
          </span>
        </div>
        <div className="category">
          <FaIndustry /> Manufacturers{" "}
          <span>
            {
              stakeholders.filter(
                (s) => s.role === "Manufacturer" && s.status === "active"
              ).length
            }{" "}
            active
          </span>
        </div>
        <div className="category">
          <FaShoppingCart /> Consumers{" "}
          <span>
            {
              stakeholders.filter(
                (s) => s.role === "Consumer" && s.status === "active"
              ).length
            }{" "}
            active
          </span>
        </div>
      </div>

      {/* Stakeholder List */}
      <div className="stakeholder-list">
        <h3>All Stakeholders</h3>
        {sortedStakeholders.map((s, i) => (
          <div key={i} className="stakeholder-card">
            <div className="info">
              <strong>{s.name}</strong>
              <p>{s.org}</p>
              <p className="meta">
                {s.location} • Joined {s.joined}
              </p>
            </div>
            <div className="status">
              <span className={`badge ${s.status}`}>{s.status}</span>
              <p>⭐ {s.rating}</p>
              <p>{s.herbs} Herbs Collected</p>
              <small>Last active: {s.lastActive}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StakeholderManagement;
