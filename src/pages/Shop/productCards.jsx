import Ratings from "../../components/Ratings";


// eslint-disable-next-line react/prop-types
const ProductCards = ({products}) => {
    console.log(products);
    return (
        <div className=" grid grid-cols-3 mx-auto">
            {
                // eslint-disable-next-line react/prop-types
                products.map((product, index) => (
                    <div key={index} className="product_card ">
                        
                        <img src={product?.image} alt={product.name}
                        className="h-40 w-40 rounded-lg" />
                        <h3>{product.name}</h3>
                        <p>{product.price}{product?.oldprice} 
                        <s>{product?.oldprice}</s>:null</p>
                        
                        <Ratings ratings={product?.rating}/>

                        <button>Add to Cart</button>
                    </div>
                ))
            }
            
        </div>
    );
};

export default ProductCards;
