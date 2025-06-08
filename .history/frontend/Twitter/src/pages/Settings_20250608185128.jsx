import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pencil, Save, Trash2 } from "lucide-react";
import axios from "axios";

const SettingsPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
  });
  const [editMode, setEditMode] = useState(false);

  console.log()

  useEffect(() => {
    if (storedUser) {
      setUserData({
        user_name: storedUser.user_name,
        user_email: storedUser.user_email,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/${storedUser.user_id}`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/user/${storedUser.user_id}`);
      localStorage.clear();
      toast.success("Account deleted successfully!");
      window.location.href = "/";
    } catch (err) {
      toast.error("Error deleting account.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Account Settings</h2>

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Username</label>
          <input
            name="user_name"
            value={userData.user_name}
            disabled={!editMode}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !editMode ? "cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            name="user_email"
            value={userData.user_email}
            disabled
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          {!editMode ? (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              onClick={() => setEditMode(true)}
            >
              <Pencil size={16} /> Edit
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              onClick={handleSave}
            >
              <Save size={16} /> Save
            </button>
          )}

          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
