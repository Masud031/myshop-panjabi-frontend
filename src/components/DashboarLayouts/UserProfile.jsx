/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import md5 from "md5";

import avatarImg from "../../../src/assets/download (2).jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../src/redux/features/auth/authSlice";
import { useEditProfileMutation } from "../../redux/features/auth/authapi";
import { showToast } from "../../utils/showToast";

/* ✅ Gravatar helper */
const getGravatarUrl = (email, size = 200) => {
  if (!email) return "";
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [editProfile, { isLoading }] = useEditProfileMutation();

  /* ✅ Load user data */
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        bio: user.bio || "",
      });

      setImagePreview(user.profileImage || "");
    }
  }, [user]);

  /* ✅ Cleanup blob URL */
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /* ✅ Input handler */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ✅ Image select + validation + compression */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files are allowed");
      return;
    }

    if (file.size > MAX_SIZE) {
      showToast("Image must be under 2MB");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5, // target size
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      setImageFile(compressedFile);
      setImagePreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      showToast("Image compression failed");
    }
  };

  /* ✅ Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", formData.username);
    form.append("bio", formData.bio);

    if (imageFile) {
      form.append("profileImage", imageFile);
    }

    try {
      const response = await editProfile({
        id: user._id,
        profileData: form,
      }).unwrap();

      dispatch(setUser(response.data));
      showToast("Profile updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      showToast("Failed to update profile");
    }
  };

  const profileImageSrc =
    imagePreview ||
    user?.profileImage ||
    getGravatarUrl(user?.email) ||
    avatarImg;

  return (
    <div className="container mx-auto p-6 mt-5">
      {/* Profile Display */}
      <div className="flex items-center mb-6">
        <div className="relative w-32 h-32">
          <img
            src={profileImageSrc}
            alt="profile"
            className="w-32 h-32 object-cover rounded-full ring"
          />

          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <span className="text-white text-sm animate-pulse">
                Uploading...
              </span>
            </div>
          )}
        </div>

        <div className="ml-6 space-y-1">
          <h2 className="text-2xl font-bold">
            Username: {formData.username || "N/A"}
          </h2>
          <p className="text-gray-700">Bio: {formData.bio || "N/A"}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto text-blue-500 hover:text-blue-700"
        >
          ✏️
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="block text-sm font-medium">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="block text-sm font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm"
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
