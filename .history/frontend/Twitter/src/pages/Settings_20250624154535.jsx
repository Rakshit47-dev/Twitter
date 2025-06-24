import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { Pencil, Save, Trash2 } from "lucide-react";
import axios from "axios";

const SettingsPage = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    user_name: "",
    user_email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        `${import.meta.env.VITE_API_URL}/user/${storedUser.user_id}`,
        userData
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Profile updated!");
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      toast.error("Failed to update profile.");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/user/${storedUser.user_id}`);
      localStorage.clear();
      toast.success("Account deleted successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Error deleting account.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Account Settings</h2>

      <div className="space-y-4">
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

        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            name="user_email"
            value={userData.user_email}
            disabled
            className="w-full px-4 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
          />
        </div>

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
            onClick={() => setIsModalOpen(true)}
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-gray-800 p-6 text-white shadow-xl">
            <Dialog.Title className="text-lg font-bold text-red-400 mb-4">Confirm Deletion</Dialog.Title>
            <p className="mb-4 text-gray-300">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
