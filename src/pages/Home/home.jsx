import { useTranslation } from "react-i18next";
import CategoriesBar from "../../components/CategoriesBar";
import Blogs from "../Blog/Blogs";
import Banner from "./Banner";
import Category from "./Category";
import Deals from "./Deals";
import Features from "./Features";
import TrandProducts from "./TrandProducts";
import Trands from "./trands";
import KidsBanner from "./KidsBanner";
import AdultBanner from "./AdultBanner";
import WeddingBanner from "./WeddingBanner";
import Big_size_Banner from "./Big_size_Banner";


const Home = () => {
      const { t } = useTranslation();
    return (
        <> 
            <div className="mt-20">
            <CategoriesBar />
            </div>

            <Banner/>
             <section className="px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">{t("categories")}</h2>
            <Category />
             </section>

             <WeddingBanner/>
         <TrandProducts />
          <KidsBanner/>
          <Big_size_Banner/>
            <AdultBanner/>
    
      <section className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">{t("trending")}</h2>
        <Trands />
       
      </section>

            {/* <TrandProducts/> */}
            <Deals/>
            <Features/>
            <Blogs/>
        </>
    );
};

export default Home;
