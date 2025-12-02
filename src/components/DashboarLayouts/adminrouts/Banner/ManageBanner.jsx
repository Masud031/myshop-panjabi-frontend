/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useGetAllBannersQuery, useUploadBannerMutation } from "../../../../redux/features/Banner/bannersApi";
import Loading from "../../../loading";

const ManageBanner = () => {
     console.log("🟡 ManageBanner component mounted");
  const { data, isLoading } = useGetAllBannersQuery();
  const [uploadBanner, { isLoading: isUploading }] = useUploadBannerMutation();

   console.log("🔥 ManageBanner loaded");
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("data:", data);

  const [route, setRoute] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

    useEffect(() => {
    console.log("📦 Banner API Response:", data);
    if (error) console.error("❌ Error fetching banners:", error);
  }, [data, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!route || !bannerImage) {
      showToast("Please select a route and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("route", route);
    formData.append("heading", heading);
    formData.append("paragraph", paragraph);
    formData.append("bannerImage", bannerImage);

    try {
    const result = await uploadBanner(formData).unwrap();
      console.log("✅ Upload successful:", result);
      showToast("✅ Banner updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to update banner.");
    }
  };

  if (isLoading) return <Loading />;

  const banners = data?.banners || [];
    console.log("📋 Banners found:", banners);

  return (
    <section className="p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Category Banners</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select route */}
          <div>
            <label className="block font-medium mb-1">Select Route</label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200"
            >
              <option value="">Select Category Route</option>
              <option value="/category/panjabi">/category/panjabi</option>
              <option value="/category/kids-panjabi">/category/kids-panjabi</option>
              <option value="/category/accessories">/category/accessories</option>
              <option value="/category/trending">/category/trending</option>
              <option value="/category/dress">/category/dress</option>
              <option value="/category/sheroany">/category/sheroany</option>
              <option value="/category/cosmetics">/category/cosmetics</option>
            </select>
          </div>

          {/* Heading */}
          <div>
            <label className="block font-medium mb-1">Heading</label>
            <input
              type="text"
              placeholder="Banner heading..."
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Paragraph */}
          <div>
            <label className="block font-medium mb-1">Paragraph</label>
            <textarea
              placeholder="Banner paragraph text..."
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows="3"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block font-medium mb-1">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-4"
          >
            {isUploading ? "Updating..." : "Update Banner"}
          </button>
        </form>

        {/* Show current banners */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Existing Banners</h3>
          {banners.length === 0 ? (
            <p className="text-gray-500">No banners yet.</p>
          ) : (
            <ul className="space-y-3">
              {banners.map((b, i) => (
                <li key={i} className="flex items-center gap-4 border p-3 rounded">
                  <img
                    src={b.imageUrl}
                    alt="banner"
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-blue-700">{b.route}</p>
                    <p className="text-sm">{b.heading}</p>
                    <p className="text-xs text-gray-500">{b.paragraph}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageBanner;
