/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../../redux/features/products/productsApi";
import { useTranslation } from "react-i18next";



const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const panjabiSubcategories = [
  { label: "By Size", value: "by-size" },
  { label: "By Color", value: "by-color" },
  { label: "By Style", value: "by-style" },
  { label: "By Price", value: "by-price" },
];

const generateProductCode = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `PRD-${randomNum}`;
};

export default function AddProduct() {
  const { user } = useSelector((state) => state.auth);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const uploadRef = useRef(null); // ✅ correct ref hook for UploadImage
  const { t } = useTranslation();

  const categories = [
  { label: t("select_category"), value: "" },
  { label: t("panjabi"), value: "panjabi" },
  { label: t("kids_panjabi"), value: "kids-panjabi" },
  { label: t("accessories"), value: "accessories" },
  { label: t("dress"), value: "dress" },
  { label: t("sheroany"), value: "sheroany" },
  { label: t("cosmetics"), value: "cosmetics" },
  { label: t("Trending"), value: "trending" },
  { label: t("big_size"), value: "big-size" },
];

  const initialState = {
    name: "",
    productCode: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    oldPrice: "",
    color: "",
    stock: {},
    discountPercent: 0,
  };

  const [product, setProduct] = useState(initialState);
  const [sizeInput, setSizeInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [image, setImage] = useState("");

  const calculateDiscount = (oldP, newP) => {
    if (!oldP || !newP || Number(oldP) <= 0) return 0;
    return Math.round(((oldP - newP) / oldP) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...product, [name]: value };

    if (name === "oldPrice" || name === "price") {
      const oldP = name === "oldPrice" ? value : updated.oldPrice;
      const newP = name === "price" ? value : updated.price;
      updated.discountPercent = calculateDiscount(Number(oldP), Number(newP));
    }

    setProduct(updated);
  };

  const handleAddSizeQty = () => {
    if (!sizeInput || !qtyInput || Number(qtyInput) <= 0) {
      alert("Please enter valid size and quantity.");
      return;
    }

    setProduct((prev) => ({
      ...prev,
      stock: { ...prev.stock, [sizeInput]: Number(qtyInput) },
    }));

    setSizeInput("");
    setQtyInput("");
  };

  const handleRemoveSize = (size) => {
    const updatedStock = { ...product.stock };
    delete updatedStock[size];
    setProduct((prev) => ({ ...prev, stock: updatedStock }));
  };

  // ✅ Clear all fields (including image)
  const handleClearForm = () => {
    setProduct(initialState);
    setImage("");
    setSizeInput("");
    setQtyInput("");

    // ✅ Clear UploadImage input
    if (uploadRef.current) {
      uploadRef.current.clearFile();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, price, color, description, stock } = product;

    if (
      !name ||
      !category ||
      !price ||
      !color ||
      !description ||
      Object.keys(stock).length === 0 ||
      !image
    ) {
      alert("Please fill in all fields and add at least one size.");
      return;
    }

    const finalProductCode =
      product.productCode?.trim() || generateProductCode();

    try {
      await addProduct({
        ...product,
        productCode: finalProductCode,
        image,
        author: user?._id,
      }).unwrap();

      alert(`✅ Product added successfully! Code: ${finalProductCode}`);
      handleClearForm();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name & Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="text"
            label="Product Name"
            name="name"
            placeholder="Ex: Panjabi Premium Cotton"
            value={product.name}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            label="Product Code (optional)"
            name="productCode"
            placeholder="Ex: PRD-1001"
            value={product.productCode}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {product.category === "panjabi" && (
          <SelectInput
            label="Subcategory (Optional)"
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            options={[
              { label: "Select Subcategory", value: "" },
              ...panjabiSubcategories,
            ]}
          />
        )}

        {/* Color */}
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        {/* Price Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="number"
            label="New Price"
            name="price"
            placeholder="e.g., 1200"
            value={product.price}
            onChange={handleChange}
          />
          <TextInput
            type="number"
            label="Old Price"
            name="oldPrice"
            placeholder="e.g., 1500"
            value={product.oldPrice}
            onChange={handleChange}
          />
        </div>

        {/* Discount */}
        {product.oldPrice && product.price && (
          <p className="text-sm text-green-600 font-semibold">
            Discount: {product.discountPercent || 0}% OFF
          </p>
        )}

        {/* Size & Quantity */}
        <div className="flex flex-wrap items-end gap-4">
          <TextInput
            type="text"
            label="Size"
            name="sizeInput"
            placeholder="e.g., 40"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
          />
          <TextInput
            type="number"
            label="Qty"
            name="qtyInput"
            placeholder="e.g., 6"
            value={qtyInput}
            onChange={(e) => setQtyInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddSizeQty}
            className="bg-blue-500 hover:bg-primary-color-dark text-white px-4 py-2 rounded transition"
          >
            Add
          </button>
        </div>

        {/* Added Sizes */}
        {Object.keys(product.stock).length > 0 && (
          <div>
            <h4 className="font-semibold mt-4 mb-2">Added Sizes:</h4>
            <ul className="list-disc pl-6">
              {Object.entries(product.stock).map(([size, qty]) => (
                <li
                  key={size}
                  className="flex items-center justify-between mb-1"
                >
                  <span>
                    Size {size}: {qty} pcs
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Image Upload */}
        <UploadImage
          label="Image"
          name="image"
          id="image"
          placeholder="Upload image"
          setImage={setImage}
          ref={uploadRef} // ✅ works fine now
        />

        {/* ✅ Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            value={product.description}
            onChange={handleChange}
            className="add-product-InputCSS w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* ✅ Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>

          <button
            type="button"
            onClick={handleClearForm}
            className="bg-primary hover:bg-primary-color-dark text-white px-6 py-2 rounded transition"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}