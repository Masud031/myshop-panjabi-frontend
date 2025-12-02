/* eslint-disable react/prop-types */
import axios from 'axios';
import  { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { getBaseUrl } from '../../../../../utils/baseurl';
import { showToast } from '../../../../../utils/showToast';


const UploadImage = forwardRef(({ name, setImage, label }, ref) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const fileInputRef = useRef(null);

     const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

    // Upload Base64 image to backend (Cloudinary or similar)
  const uploadSingleImage = async (base64) => {
    setLoading(true);
    try {
      const res = await axios.post(`${getBaseUrl()}/uploadImage`, {
        image: base64,
      });
      const imageUrl = res.data;
      setUrl(imageUrl);
      setImage(imageUrl);
     showToast("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("❌ Failed to upload image:", error);
     showToast("Upload failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };


     // Handle file select and upload
  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
    }
  };

   // ✅ Expose a method to parent component to clear the file input
  useImperativeHandle(ref, () => ({
    clearFile() {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setUrl("");
      setImage("");
    },
  }));

       
   return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        id={name}
        accept="image/*"
        onChange={uploadImage}
        className="add-product-InputCSS"
      />

      {loading && (
        <p className="mt-2 text-sm text-blue-600 font-medium">Uploading...</p>
      )}

      {url && !loading && (
        <div className="mt-3">
          <p className="text-green-600 text-sm mb-1">Image uploaded successfully!</p>
          <img
            src={url}
            alt="Uploaded"
            className="w-24 h-24 object-cover rounded border"
          />
        </div>
      )}
    </div>
  )
});

UploadImage.displayName = "UploadImage";

export default UploadImage