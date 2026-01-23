import React, { useState } from "react";

const CompliancePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    standard: "",
    results: "",
    body: "",
    validUntil: "",
    certified: false,
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "AYUSH Compliance – Ashwagandha",
      batch: "BATCH1001",
      status: "Certified",
      date: "2025-09-11",
    },
    {
      id: 2,
      title: "ISO Compliance – Tulsi Extract",
      batch: "BATCH1002",
      status: "Pending",
      date: "2025-09-12",
    },
    {
      id: 3,
      title: "WHO-GMP Compliance – Neem Powder",
      batch: "BATCH1003",
      status: "Certified",
      date: "2025-09-14",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: activities.length + 1,
      title: `${formData.standard} Compliance – ${formData.product}`,
      batch: "BATCH" + (1000 + activities.length + 1),
      status: formData.certified ? "Certified" : "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setActivities([newActivity, ...activities]);
    alert("Compliance record created:\n" + JSON.stringify(formData, null, 2));
    setShowModal(false);
  };

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((act) => act.status === filter);

  return (
    <div className="compliance-container">
      <h1 className="dashboard-title">Regulatory Compliance</h1>

      {/* Summary */}
      <div className="summary-section">
        <div className="summary-card">
          Overall Compliance <span>95%</span>
        </div>
        <div className="summary-card">
          AYUSH Compliant <span>98%</span>
        </div>
        <div className="summary-card">
          WHO-GMP Compliant <span>95%</span>
        </div>
        <div className="summary-card">
          ISO Compliant <span>92%</span>
        </div>
      </div>

      {/* Compliance Details */}
      <div className="compliance-section">
        <div
          className="compliance-card"
          title="Government AYUSH regulatory compliance"
        >
          <h3>AYUSH Guidelines</h3>
          <div className="progress-bar">
            <div className="progress green" style={{ width: "98%" }}></div>
          </div>
          <p>
            Compliance Rate: <strong>98%</strong>
          </p>
          <ul>
            <li>✔ Manufacturing practices compliant</li>
            <li>✔ Quality control measures in place</li>
            <li>✔ Documentation requirements met</li>
          </ul>
        </div>

        <div
          className="compliance-card"
          title="WHO Good Manufacturing Practices"
        >
          <h3>WHO-GMP Standards</h3>
          <div className="progress-bar">
            <div className="progress green" style={{ width: "95%" }}></div>
          </div>
          <p>
            Compliance Rate: <strong>95%</strong>
          </p>
          <ul>
            <li>✔ International manufacturing compliance</li>
            <li>✔ Quality assurance maintained</li>
            <li>✔ Process validation complete</li>
          </ul>
        </div>

        <div className="compliance-card" title="ISO Quality Standards">
          <h3>ISO Standards</h3>
          <div className="progress-bar">
            <div className="progress yellow" style={{ width: "92%" }}></div>
          </div>
          <p>
            Compliance Rate: <strong>92%</strong>
          </p>
          <ul>
            <li>✔ Quality management systems</li>
            <li>✔ Continuous improvement processes</li>
            <li>✔ Risk management protocols</li>
          </ul>
        </div>
      </div>

      {/* Add Record */}
      <button className="add-btn" onClick={() => setShowModal(true)}>
        + Add Compliance Record
      </button>

      {/* Recent Activities */}
      <div className="activities-section">
        <h2>Recent Compliance Activities</h2>

        {/* Filter */}
        <div className="filter-bar">
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Certified">Certified</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <ul className="activity-list">
          {filteredActivities.map((activity) => (
            <li key={activity.id} className="activity-item">
              <div className="activity-info">
                <strong>{activity.title}</strong>
                <span className="batch">Batch: {activity.batch}</span>
              </div>
              <div className="activity-meta">
                <span
                  className={`status-badge ${
                    activity.status === "Certified" ? "certified" : "pending"
                  }`}
                >
                  {activity.status}
                </span>
                <span className="date">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Compliance Record</h2>
            <form onSubmit={handleSubmit}>
              <label>Product</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder="Choose a product..."
                required
              />

              <label>Compliance Standard</label>
              <input
                type="text"
                name="standard"
                value={formData.standard}
                onChange={handleInputChange}
                placeholder="Choose a standard..."
                required
              />

              <label>Test Results (JSON format)</label>
              <textarea
                name="results"
                value={formData.results}
                onChange={handleInputChange}
                placeholder='{"purity": 99.5, "moisture": 8.2}'
              />

              <label>Certification Body</label>
              <input
                type="text"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="e.g., AYUSH Certification Lab"
              />

              <label>Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleInputChange}
              />

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="certified"
                  checked={formData.certified}
                  onChange={handleInputChange}
                />
                Product is certified
              </label>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Create Record
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompliancePage;
