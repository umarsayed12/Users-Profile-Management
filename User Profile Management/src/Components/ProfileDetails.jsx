import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedProfile } from "../features/UserProfile/ProfileSlice";
import Map from "./Map";

const ProfileDetails = () => {
  const { id } = useParams();
  const { profiles, selectedProfile } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = profiles.find((p) => p.id.toString() === id);

  if (!profile) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  const handleBackToList = () => {
    dispatch(setSelectedProfile(null));
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.description}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Address:</span>{" "}
            {profile.address.street}, {profile.address.city},{" "}
            {profile.address.state}
          </p>
          <p>
            <span className="font-medium">Coordinates:</span> Lat:{" "}
            {profile.address.coordinates.lat}, Lng:{" "}
            {profile.address.coordinates.lng}
          </p>
          {/* Add more profile details as needed */}
        </div>
        <button
          onClick={handleBackToList}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Profiles
        </button>
      </div>
      <div className="sticky top-4">
        <Map selectedProfile={profile} />
      </div>
    </div>
  );
};

export default ProfileDetails;
