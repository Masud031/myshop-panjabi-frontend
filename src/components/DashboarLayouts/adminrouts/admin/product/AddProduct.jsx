import { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../../redux/features/products/productsApi';

const categories = [
  { label: 'Select Category', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewellery', value: 'jewellery' },
  { label: 'Cosmetics', value: 'cosmetics' },
];

const colors = [
  { label: 'Select Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    color: '',
    stock: {},
  });

  const [sizeInput, setSizeInput] = useState('');
  const [qtyInput, setQtyInput] = useState('');
  const [image, setImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSizeQty = () => {
    if (!sizeInput || !qtyInput || Number(qtyInput) <= 0 || Number(sizeInput) <= 0) {
      alert('Please enter valid size and quantity.');
      return;
    }

    setProduct((prev) => ({
      ...prev,
      stock: {
        ...prev.stock,
        [sizeInput]: Number(qtyInput),
      },
    }));

    setSizeInput('');
    setQtyInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, price, color, description, stock } = product;
    if (!name || !category || !price || !color || !description || Object.keys(stock).length === 0 || !image) {
      alert('Please fill in all fields and add at least one size.');
      return;
    }

    try {
      await addProduct({
        ...product,
        image,
        author: user?._id,
      }).unwrap();

      alert('Product added successfully!');
      setProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        color: '',
        stock: {},
      });
      setImage('');
      setSizeInput('');
      setQtyInput('');
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="text"
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        <TextInput
          type="number"
          label="Price"
          name="price"
          placeholder="e.g., 50"
          value={product.price}
          onChange={handleChange}
        />

        {/* Size/Qty Input */}
        <div className="flex items-end gap-4">
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

          {/* adding in trending products.its optional */}
          <div className="flex items-center gap-2">
         <input
          type="checkbox"
          id="isTrending"
          checked={product.isTrending || false}
          onChange={(e) =>
         setProduct((prev) => ({
          ...prev,
         isTrending: e.target.checked,
          }))
          }
          
  />
  <label htmlFor="isTrending" className="text-sm font-medium text-gray-700">
    Add to Trending
  </label>
</div>


          <button
            type="button"
            onClick={handleAddSizeQty}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

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

        <UploadImage
          label="Image"
          name="image"
          id="image"
          placeholder="Upload image"
          setImage={setImage}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
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

        <div>
          <button type="submit" className="add-product-btn" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
