import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedProfile } from "../features/UserProfile/ProfileSlice";
import MapContainer from "./MapContainer";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";

const AllProfiles = () => {
  const { profiles, selectedProfile } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const [searchedItem, setSearchedItem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchedItem.toLowerCase()) ||
      profile.description.toLowerCase().includes(searchedItem.toLowerCase())
  );

  const handleShowSummary = (profile) => {
    setLoading(true);
    dispatch(setSelectedProfile(profile));
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="md:w-full">
        <SearchBar value={searchedItem} onChange={setSearchedItem} />
        <div className="grid gap-4 mt-4">
          {filteredProfiles.map((profile) =>
            profile.id !== 1 ? (
              <div key={profile.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-center md:text-start">
                      {profile.name}
                    </h3>
                    <p className="text-gray-600 text-center md:text-start text-wrap">
                      {profile.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShowSummary(profile)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${profile.id}`)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
      </div>
      <div className="md:w-full sticky top-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <MapContainer selectedProfile={selectedProfile} />
        )}
      </div>
    </div>
  );
};

export default AllProfiles;
