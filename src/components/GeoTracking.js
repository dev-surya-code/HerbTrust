import React, { useState } from "react";
import mapImage from "../assets/map.jpg";
import herbalGardenImage from "../assets/map.jpg"; // <-- your garden photo

function GeoTracking() {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const distributionData = [
    {
      region: "Samaspur, Uttar Pradesh",
      count: 1,
      color: "purple",
      top: "45%",
      left: "55%",
      details: {
        place: "Herbal Garden, Samaspur",
        address: "4V22+5QV, Samaspur, Uttar Pradesh 231304, India",
        lat: "25.100528°",
        long: "82.852054°",
        timestamp: "12/07/23 02:46 PM GMT +05:30",
        image: herbalGardenImage,
        mapsLink: "https://www.google.com/maps?q=25.100528,82.852054",
      },
    },
  ];

  // Close popup on outside click
  const handleClosePopup = (e) => {
    if (e.target.classList.contains("popup")) {
      setSelectedRegion(null);
    }
  };

  return (
    <div className="geo-container">
      <h2 className="geo-title">Geographic Distribution</h2>

      {/* Map with markers */}
      <div className="map-wrapper">
        <img src={mapImage} alt="India map" className="map-image" />

        {distributionData.map((item, index) => (
          <div
            key={index}
            className={`marker marker-${item.color}`}
            style={{ top: item.top, left: item.left }}
            onClick={() => setSelectedRegion(item)}
          ></div>
        ))}
      </div>
      <a
        href="https://www.google.com/maps?q=25.100528,82.852054"
        target="_blank"
        rel="noopener noreferrer"
        className="google-maps-link"
      >
        View on Google Maps
      </a>
      {/* Popup for selected region */}
      {selectedRegion && selectedRegion.details && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content">
            <button
              className="popup-close"
              onClick={() => setSelectedRegion(null)}
            >
              ✖
            </button>
            <h3>{selectedRegion.details.place}</h3>
            <p>
              <strong>Address:</strong> {selectedRegion.details.address}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedRegion.details.lat}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedRegion.details.long}
            </p>
            <p>
              <strong>Captured:</strong> {selectedRegion.details.timestamp}
            </p>

            {/* Garden Image */}
            {selectedRegion.details.image && (
              <img
                src={selectedRegion.details.image}
                alt={selectedRegion.details.place}
                className="popup-image"
              />
            )}

            {/* Google Maps Link */}
            {selectedRegion.details.mapsLink && (
              <a
                href={selectedRegion.details.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-link"
              >
                View on Google Maps
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GeoTracking;
