// components/UpdateProfileImage.jsx
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { useState } from "react";
import { showToast } from "../../../utils/showToast";

const UpdateProfileImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: imageUrl,
      });
     showToast("Profile image updated successfully!");
      window.location.reload(); // optional: to refresh navbar
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Update Profile Image
      </button>
    </div>
  );
};

export default UpdateProfileImage;
