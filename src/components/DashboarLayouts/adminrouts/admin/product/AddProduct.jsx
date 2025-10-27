/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../../redux/features/products/productsApi";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Panjabi", value: "panjabi" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];

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

// 🟢 Subcategories specific to Panjabi
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

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [product, setProduct] = useState({
    name: "",
    productCode: "",
    category: "",
    subcategory: "", // 🟢 new
    description: "",
    price: "",
    color: "",
    stock: {},
  });

  const [sizeInput, setSizeInput] = useState("");
  const [qtyInput, setQtyInput] = useState("");
  const [image, setImage] = useState("");

  const calculateDiscount = (oldP, newP) => {
    if (!oldP || !newP || Number(oldP) <= 0) return 0;
    const discount = ((oldP - newP) / oldP) * 100;
    return Math.round(discount);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...product, [name]: value };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      productCode,
      category,
      subcategory,
      price,
      color,
      description,
      stock,
    } = product;

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

    const finalProductCode = productCode?.trim() || generateProductCode();

    try {
      await addProduct({
        ...product,
        productCode: finalProductCode,
        image,
        author: user?._id,
      }).unwrap();

      alert(`✅ Product added successfully! Code: ${finalProductCode}`);

      setProduct({
        name: "",
        productCode: "",
        category: "",
        subcategory: "",
        description: "",
        price: "",
        color: "",
        stock: {},
        discountPercent: 0,
      });
      setImage("");
      setSizeInput("");
      setQtyInput("");
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 🟢 Product Name & Code */}
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

        {/* 🟢 Category Selection */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {/* 🟢 Subcategory only if category === 'Panjabi' */}
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

        {/* 🟢 Old & New Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            type="number"
            label="Old Price"
            name="oldPrice"
            placeholder="e.g., 1500"
            value={product.oldPrice}
            onChange={handleChange}
          />
          <TextInput
            type="number"
            label="New Price"
            name="price"
            placeholder="e.g., 1200"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        {/* Discount Display */}
        {product.oldPrice && product.price && (
          <p className="text-sm text-green-600 font-semibold">
            Discount: {product.discountPercent || 0}% OFF
          </p>
        )}

        {/* Size / Quantity Input */}
        <div className="flex flex-wrap items-end gap-4">
          <TextInput
            type="number"
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Added Sizes */}
        {Object.entries(product.stock).length > 0 && (
          <div>
            <h4 className="font-semibold mt-4 mb-2">Added Sizes:</h4>
            <ul className="list-disc pl-6">
              {Object.entries(product.stock).map(([size, qty]) => (
                <li key={size}>
                  Size {size}: {qty} pcs
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image Upload */}
        <UploadImage
          label="Image"
          name="image"
          id="image"
          placeholder="Upload image"
          setImage={setImage}
        />

        {/* Description */}
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
            className="add-product-InputCSS"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="add-product-btn" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
