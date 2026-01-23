import React, { useState } from "react";
import {
  FaFlask,
  FaIndustry,
  FaTruck,
  FaBox,
  FaThLarge,
  FaStream,
} from "react-icons/fa";

function SupplyChain() {
  const [events] = useState([
    {
      id: 1,
      title: "Testing Event",
      location: "AYUSH Lab, Mumbai",
      status: "Verified",
      details: "Samples tested for quality. Report ID: TST-0098",
      date: "2025-09-12",
      time: "10:30 AM",
      icon: <FaFlask size={28} className="event-icon" />,
    },
    {
      id: 2,
      title: "Processing Event",
      location: "Ayur Processing Unit, Gujarat",
      status: "Verified",
      details: "Batch processed with GMP compliance. Batch ID: PRC-0234",
      date: "2025-09-13",
      time: "02:15 PM",
      icon: <FaIndustry size={28} className="event-icon" />,
    },
    {
      id: 3,
      title: "Transport Event",
      location: "Transport to Gujarat",
      status: "Verified",
      details: "Shipment ID: TRN-0456. Cold chain maintained at 5°C.",
      date: "2025-09-14",
      time: "09:45 AM",
      icon: <FaTruck size={28} className="event-icon" />,
    },
    {
      id: 4,
      title: "Packaging Event",
      location: "Packaging Unit, Delhi",
      status: "Pending",
      details: "Awaiting quality clearance before packaging. Expected in 24h.",
      date: "2025-09-15",
      time: "11:00 AM",
      icon: <FaBox size={28} className="event-icon" />,
    },
  ]);

  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("card");

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // 🔹 Filter + Sort by Date/Time (newest first)
  const filteredEvents = events
    .filter((event) =>
      filter === "all" ? true : event.status.toLowerCase() === filter
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA; // newest first
    });

  return (
    <div className="supplychain">
      <div className="header-bar">
        <h1>Recent Supply Chain Events</h1>

        {/* View Switcher */}
        <div className="view-switcher">
          <button
            className={viewMode === "card" ? "active" : ""}
            onClick={() => setViewMode("card")}
          >
            <FaThLarge /> Card View
          </button>
          <button
            className={viewMode === "timeline" ? "active" : ""}
            onClick={() => setViewMode("timeline")}
          >
            <FaStream /> Timeline View
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-bar">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "verified" ? "active" : ""}
          onClick={() => setFilter("verified")}
        >
          Verified
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Events */}
      <div className={`event-list ${viewMode}`}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card ${event.status.toLowerCase()}`}
              onClick={() => toggleExpand(event.id)}
            >
              <div className="event-header">
                <div className="event-title">
                  {event.icon}
                  <h2>{event.title}</h2>
                </div>
                <span className={`status ${event.status.toLowerCase()}`}>
                  {event.status}
                </span>
              </div>

              {/* Date & Time */}
              <p className="event-datetime">
                {event.date} • {event.time}
              </p>

              <p>{event.location}</p>

              {expanded === event.id && (
                <div className="event-details">
                  <p>{event.details}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-events">No events found for this filter.</p>
        )}
      </div>
    </div>
  );
}

export default SupplyChain;
