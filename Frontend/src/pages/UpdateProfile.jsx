import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // For submit button loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/current-user`,
          { withCredentials: true }
        );

        const user = res.data.data?.user;
        if (!user) {
          throw new Error("No user data received");
        }

        setUpdatedData({
          fullname: user.fullname || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          address: user.address || "",
          city: user.city || "",
          postalCode: user.postalCode || "",
        });

        setPreviewAvatar(user.avatar || "/default-avatar.png");
      } catch (err) {
        console.error("Failed to fetch user:", err);
        alert("Please login to access this page");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
  
    try {
      const formData = new FormData();
      console.log("updatedData");
      // Append all fields
      Object.entries(updatedData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Append avatar if changed
      if (avatar) {
        formData.append("avatar", avatar);
      }
  
      // Use the correct endpoint
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update`, // Make sure this matches your backend route
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
  
      alert("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Update error details:", {
        message: err.message,
        response: err.response?.data,
        config: err.config
      });
      
      alert(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const fields = [
    { name: "fullname", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "postalCode", label: "Postal Code", type: "text" },
  ];

  // Group fields into pairs (2 per row)
  const fieldRows = [];
  for (let i = 0; i < fields.length; i += 2) {
    fieldRows.push(fields.slice(i, i + 2));
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <div className="mb-6 flex flex-col items-center">
          <img
            src={previewAvatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gray-300"
          />
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Input Fields: 2 per row */}
        {fieldRows.map((row, rowIndex) => (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            key={rowIndex}
          >
            {row.map((field) => (
              <div key={field.name}>
                <label className="block font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={updatedData[field.name]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  required={field.name === "fullname" || field.name === "email"}
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          disabled={updating}
          className={`w-full py-2 rounded text-white font-medium ${
            updating ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;