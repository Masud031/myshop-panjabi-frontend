/* eslint-disable react/prop-types */
// src/components/dashboard/ProductSizesMiniTable.jsx


const ProductSizesMiniTable = ({ sizes }) => {
  if (!sizes || Object.keys(sizes).length === 0) return null;

  const sizeKeys = Object.keys(sizes);

  return (
    <table
      className="border text-[10px] text-center"
      style={{ borderCollapse: "collapse", marginTop: "2px" }}
    >
      <thead>
        <tr>
          {sizeKeys.map((size) => (
            <th key={size} className="border px-1 bg-gray-100">
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {sizeKeys.map((size) => (
            <td key={size} className="border px-1">
              {sizes[size]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ProductSizesMiniTable;
