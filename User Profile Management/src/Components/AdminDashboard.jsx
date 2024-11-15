import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProfile,
  updateProfile,
  deleteProfile,
} from "../features/UserProfile/ProfileSlice";

const AdminDashboard = () => {
  const { profiles } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
    contactInfo: "",
    interests: "",
    address: {
      street: "",
      city: "",
      state: "",
      coordinates: { lat: 0, lng: 0 },
    },
  });

  const [editingProfile, setEditingProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfile(formData));
    setFormData({
      name: "",
      description: "",
      photo: "",
      contactInfo: "",
      interests: "",
      address: {
        street: "",
        city: "",
        state: "",
        coordinates: { lat: 0, lng: 0 },
      },
    });
  };

  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit) {
        setEditingProfile({ ...editingProfile, photo: reader.result });
      } else {
        setFormData({ ...formData, photo: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoordinateChange = (e, field, isEdit = false) => {
    const value = parseFloat(e.target.value) || 0;
    if (isEdit) {
      setEditingProfile({
        ...editingProfile,
        address: {
          ...editingProfile.address,
          coordinates: {
            ...editingProfile.address.coordinates,
            [field]: value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          coordinates: {
            ...formData.address.coordinates,
            [field]: value,
          },
        },
      });
    }
  };

  const handleProfileEdit = (profile) => {
    setEditingProfile(profile);
  };

  const handleProfileSave = () => {
    dispatch(updateProfile(editingProfile));
    setEditingProfile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">
        Admin Dashboard
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <div className="grid gap-4">
          <div>
            <label className="block mb-1">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">
              Description<span className="text-red-600">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows={3}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-1">
              Contact Information<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Interests/Hobbies</label>
            <input
              type="text"
              value={formData.interests}
              onChange={(e) =>
                setFormData({ ...formData, interests: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">
              Upload Image<span className="text-red-600">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                Latitude<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                step={0.0001}
                onChange={(e) => handleCoordinateChange(e, "lat")}
                className="w-full p-2 border rounded"
                placeholder="Enter latitude"
                required
              />
            </div>
            <div>
              <label className="block mb-1">
                Longitude<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                step={0.0001}
                onChange={(e) => handleCoordinateChange(e, "lng")}
                className="w-full p-2 border rounded"
                placeholder="Enter longitude"
                required
              />
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-400 mt-3">
          <p>
            Fields marked with (<span className="text-red-600">*</span>) are
            required.
          </p>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Profile
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Manage Profiles</h3>
        <div className="grid gap-4">
          {profiles.map((profile) =>
            profile.id !== 1 ? (
              <div
                key={profile.id}
                className="flex flex-col md:flex-row gap-4 items-center justify-between p-3 border rounded"
              >
                <div className="flex items-center gap-10">
                  {profile.photo && (
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col w-72">
                    {editingProfile?.id === profile.id ? (
                      <div className="w-[5%]">
                        <textarea
                          placeholder="Enter Name"
                          type="text"
                          value={editingProfile.name}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              name: e.target.value,
                            })
                          }
                          className="p-2 border rounded"
                        />
                        <textarea
                          placeholder="Enter Description"
                          value={editingProfile.description}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              description: e.target.value,
                            })
                          }
                          className="p-2 border rounded"
                        />
                        <textarea
                          placeholder="Enter Contact"
                          type="number"
                          value={editingProfile.contactInfo}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              contactInfo: e.target.value,
                            })
                          }
                          className="p-2 border rounded"
                        />
                        <textarea
                          placeholder="Enter Hobby"
                          type="text"
                          value={editingProfile.interests}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              interests: e.target.value,
                            })
                          }
                          className="p-2 border rounded"
                        />
                        <textarea
                          placeholder="Enter Latitude"
                          type="number"
                          value={editingProfile.address.coordinates.lat}
                          onChange={(e) =>
                            handleCoordinateChange(e, "lat", true)
                          }
                          className="p-2 border rounded"
                        />
                        <textarea
                          placeholder="Enter Longitude"
                          type="number"
                          value={editingProfile.address.coordinates.lng}
                          onChange={(e) =>
                            handleCoordinateChange(e, "lng", true)
                          }
                          className="p-2 border rounded"
                        />
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="p-2 border rounded w-[2000%] md:w-[1000%]"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="font-semibold">{profile.name}</div>
                        <div className="text-gray-600 text-wrap w-full h-16 overflow-scroll ">
                          {profile.description}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Contact:</span>{" "}
                          {profile.contactInfo}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Interests:</span>{" "}
                          {profile.interests}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Latitude:</span>{" "}
                          {profile.address.coordinates.lat}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Longitude:</span>{" "}
                          {profile.address.coordinates.lng}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-[50%] md:flex-col md:items-center">
                  {editingProfile?.id === profile.id ? (
                    <button
                      onClick={handleProfileSave}
                      className="px-4 py-2 w-[50%] bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProfileEdit(profile)}
                      className="px-4 py-2 w-[50%] bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(deleteProfile(profile.id))}
                    className="px-4 py-2 w-[50%] bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
