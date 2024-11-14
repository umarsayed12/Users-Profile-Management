import React from "react";

const Map = ({ selectedProfile }) => {
  if (!selectedProfile) {
    return (
      <div className="bg-white p-4 rounded-lg shadow h-96 flex items-center justify-center">
        <p className="text-gray-500">Select a profile to view location</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-96 relative">
        {/* Implement map integration here using Google Maps or Mapbox */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="font-semibold">{selectedProfile.name}'s Location</p>
            <p>{selectedProfile.address.street}</p>
            <p>
              {selectedProfile.address.city}, {selectedProfile.address.state}
            </p>
            <p>Lat: {selectedProfile.address.coordinates.lat}</p>
            <p>Lng: {selectedProfile.address.coordinates.lng}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
