import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LeafletMapContainer = ({ selectedProfile }) => {
  const mapStyles = {
    height: "400px", // Ensure height is set to fully display the map
    width: "100%",
  };

  const defaultCenter = [0, 0];
  const center = selectedProfile?.address?.coordinates
    ? [
        parseFloat(selectedProfile.address.coordinates.lat) || 0,
        parseFloat(selectedProfile.address.coordinates.lng) || 0,
      ]
    : defaultCenter;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {selectedProfile
            ? `${selectedProfile.name}'s Location`
            : "Select a Profile"}
        </h2>
        {selectedProfile && (
          <p className="text-gray-600">
            Coordinates: {selectedProfile.address?.coordinates?.lat},{" "}
            {selectedProfile.address?.coordinates?.lng}
          </p>
        )}
      </div>

      <div style={mapStyles} className="rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={selectedProfile ? 13 : 2}
          style={mapStyles}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedProfile?.address?.coordinates && (
            <Marker position={center} icon={customMarkerIcon}>
              <Popup>
                {selectedProfile.name} <br />
                Coordinates: {selectedProfile.address?.coordinates?.lat},{" "}
                {selectedProfile.address?.coordinates?.lng}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default LeafletMapContainer;
