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
    address: {
      street: "",
      city: "",
      state: "",
      coordinates: { lat: 0, lng: 0 },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfile(formData));
    setFormData({
      name: "",
      description: "",
      photo: "",
      address: {
        street: "",
        city: "",
        state: "",
        coordinates: { lat: 0, lng: 0 },
      },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const [editingProfile, setEditingProfile] = useState(null);

  const handleProfileEdit = (profile) => {
    setEditingProfile(profile);
  };

  const handleProfileSave = (profile) => {
    dispatch(updateProfile({ ...profile, id: profile.id }));
    setEditingProfile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <div className="grid gap-4">
          <div>
            <label className="block mb-1">Name</label>
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
            <label className="block mb-1">Description</label>
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
            <label className="block mb-1">Upload Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </div>
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
                className="flex items-center justify-between p-4 border rounded"
              >
                <div className="flex items-center gap-4">
                  {profile.photo && (
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    {editingProfile?.id === profile.id ? (
                      <>
                        <input
                          type="text"
                          className="font-semibold"
                          value={editingProfile.name}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="text-gray-600"
                          value={editingProfile.description}
                          onChange={(e) =>
                            setEditingProfile({
                              ...editingProfile,
                              description: e.target.value,
                            })
                          }
                        />
                      </>
                    ) : (
                      <>
                        <div className="font-semibold">{profile.name}</div>
                        <div className="text-gray-600">
                          {profile.description}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {editingProfile?.id === profile.id ? (
                    <button
                      onClick={() => handleProfileSave(editingProfile)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleProfileEdit(profile)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => dispatch(deleteProfile(profile.id))}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
