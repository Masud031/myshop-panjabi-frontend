import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from '../../../assets/product.json';
import ProductCards from '../../../pages/Shop/productCards'; // Adjust the path as per your file structure

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);

  console.log(filteredProducts);

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.!
        </p>
      </section>
      {/* Products cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
