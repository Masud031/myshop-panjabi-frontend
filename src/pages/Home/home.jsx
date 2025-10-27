import CategoriesBar from "../../components/CategoriesBar";
import Blogs from "../Blog/Blogs";
import Banner from "./Banner";
import Category from "./Category";
import Deals from "./Deals";
import Features from "./Features";
import TrandProducts from "./TrandProducts";
import Trands from "./trands";


const Home = () => {
    return (
        <> 
            <div className="mt-28">
            <CategoriesBar />
            </div>
            <Banner/>
            <Category/>
            <Trands/>
            <TrandProducts/>
            <Deals/>
            <Features/>
            <Blogs/>
        </>
    );
};

export default Home;
