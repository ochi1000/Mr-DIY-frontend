/* eslint-disable no-unused-vars */
import Categories from "../Section/Categories";
import FlashSales from "../Section/FlashSales";
import FrequentPurchased from "../Section/FrequentPurchased";
import Hero from "../Section/Hero";
import TopSelling from "../Section/TopSelling";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <TopSelling />
      <FlashSales />
      <FrequentPurchased />
      <Footer />
      {/* <div className="p-20 flex flex-col items-center justify-center">
        <h1 className=" text-base lg:text-8xl font-bold text-blue-600">
          Mr DIY Project
        </h1>

        <p className=" text-lg">Seamless and convenient shopping experience</p>
      </div> */}
    </>
  );
};

export default Home;
