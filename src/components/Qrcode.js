import React, { useState } from "react";
import { FaQrcode, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
const QrVerification = () => {
  const [batchId, setBatchId] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    show: false,
    success: false,
    message: "",
  });
  const [qrPopup, setQrPopup] = useState(false);

  const handleVerify = () => {
    if (!batchId || batchId.length < 5) {
      setError("Invalid Input. Please enter a valid batch ID or QR code.");
      setPopup({
        show: true,
        success: false,
        message: "Invalid Batch ID. Try again.",
      });
      return;
    }
    setError("");
    setPopup({
      show: true,
      success: true,
      message: `Product verified with Batch ID: ${batchId}`,
    });
  };

  const products = [
    {
      name: "Ashwagandha",
      batchId: "BATCH001",
      qr: "QR-BATCH001-99j3s97d",
      quality: "Grade A",
      status: "tested",
      date: "06/09/2025",
    },
    {
      name: "Turmeric",
      batchId: "BATCH002",
      qr: "QR-BATCH002-nbyo1gLtz",
      quality: "Grade A",
      status: "processed",
      date: "08/09/2025",
    },
    {
      name: "Neem",
      batchId: "BATCH003",
      qr: "QR-BATCH003-8jkhsw7d",
      quality: "Grade B",
      status: "packaged",
      date: "09/09/2025",
    },
    {
      name: "Brahmi",
      batchId: "BATCH004",
      qr: "QR-BATCH004-puy5ns13t8",
      quality: "Grade A",
      status: "distributed",
      date: "10/09/2025",
    },
  ];

  return (
    <div className="qr-verification-page">
      <h2>QR Code Verification</h2>

      {/* === Stats Cards === */}
      <div className="stats">
        <div className="stat-card">
          Total Verifications <span>3</span>
        </div>
        <div className="stat-card">
          Successful Verifications <span>3</span>
        </div>
        <div className="stat-card">
          Today's Verifications <span>2</span>
        </div>
        <div className="stat-card">
          Success Rate <span>100%</span>
        </div>
      </div>

      <div className="qr-section">
        {/* === Quick Verification === */}
        <div className="quick-verification">
          <h3>Quick Verification</h3>
          <input
            type="text"
            placeholder="Enter Batch ID or QR Code"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />
          <div className="quick-actions">
            <button onClick={handleVerify}>
              <FaCheckCircle /> Verify
            </button>
            <button onClick={() => setQrPopup(true)}>
              <FaQrcode /> Scan QR
            </button>
          </div>
          {error && <div className="error">{error}</div>}
          {popup.show && (
            <div className="popup-overlay">
              <div className="popup">
                {popup.success ? (
                  <FaCheckCircle className="icon success" size={40} />
                ) : (
                  <FaTimesCircle className="icon error" size={40} />
                )}
                <h3>
                  {popup.success
                    ? "Verification Successful"
                    : "Verification Failed"}
                </h3>
                <p>{popup.message}</p>
                <button
                  onClick={() =>
                    setPopup({ show: false, success: false, message: "" })
                  }
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* === QR Code Popup === */}
          <AnimatePresence>
            {qrPopup && (
              <motion.div
                className="popup-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="popup"
                  initial={{ scale: 0.7, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="mb-3">Generated QR Code</h3>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="qr-code-container"
                  >
                    <QRCodeCanvas
                      value={"BatchID-001"}
                      size={200}
                      fgColor="black"
                      bgColor="white"
                      level="H"
                      includeMargin={true}
                    />
                  </motion.div>
                  <p className="mt-3 text-gray-600 text-sm">
                    {batchId ? `QR for Batch ID: ${batchId}` : "Demo QR Code"}
                  </p>
                  <button onClick={() => setQrPopup(false)}>Close</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="how-to">
            <h4>How to Verify</h4>
            <ol>
              <li>Enter the batch ID found on the product packaging</li>
              <li>Or use the camera to scan the QR code directly</li>
              <li>Get instant verification of product authenticity</li>
              <li>View complete traceability information</li>
            </ol>
          </div>
        </div>

        {/* === Recent Verifications === */}
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
      </div>

      {/* === Available Products === */}
      <div className="products">
        <h3>Available Products for Verification</h3>
        <div className="product-list">
          {products.map((p, i) => (
            <div className="product-card" key={i}>
              <h4>{p.name}</h4>
              <p>
                <strong>Batch ID:</strong> {p.batchId}
              </p>
              <p>
                <strong>QR Code:</strong> {p.qr}
              </p>
              <p>
                <strong>Quality:</strong> {p.quality}
              </p>
              <p>
                <strong>Collection:</strong> {p.date}
              </p>
              <span className={`status-badge ${p.status}`}>{p.status}</span>
              <button
                className="verify-btn"
                onClick={() =>
                  setPopup({
                    show: true,
                    success: true,
                    message: `${p.name} (${p.batchId}) Verified`,
                  })
                }
              >
                <FaCheckCircle /> Verify Product
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* === Popup Modal === */}
      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-qr">
            {popup.success ? (
              <FaCheckCircle className="icon success" size={40} />
            ) : (
              <FaTimesCircle className="icon error" size={40} />
            )}
            <h3>
              {popup.success
                ? "Verification Successful"
                : "Verification Failed"}
            </h3>
            <p>{popup.message}</p>
            <button
              onClick={() =>
                setPopup({ show: false, success: false, message: "" })
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrVerification;
