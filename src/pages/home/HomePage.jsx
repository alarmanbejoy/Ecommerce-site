import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Loader } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <HeroSection />
        <Category />
        <HomePageProductCard />
        <Track />
        <Testimonial />
        <Loader/>
      </Layout>
    </div>
  );
};

export default HomePage;
