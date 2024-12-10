import { useState } from 'react';
import products from '../../assets/product.json';
import ProductCards from '../Shop/productCards';

const TrandProducts = () => {
    const[visibleProduct, setVisibleProduct]=useState(8);

const handleLoadmore = () => {
    setVisibleProduct(preCount=>preCount+4);
 
}

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trandind Products </h2>
            <p className='section__subheader'>Discover the hotest picks,Elevent
                 your Style with joy </p>
                 {/* products cards  */}
           <div className='mt-8'>
           <ProductCards products={products.slice(0,visibleProduct)}/>

           </div>
            {/* load more btn */}
            <div className='product__btn'>
                {
                    visibleProduct < products.length && (
                        <button onClick={handleLoadmore} className='btn'>Load More</button>
                    )
                }

            </div>



        </section>
    );
};

export default TrandProducts;
