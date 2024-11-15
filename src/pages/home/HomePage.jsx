import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import Category from '../../components/category/Category';
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard';


const HomePage = () => {
    return (
        <div>
            <Layout>
                
                <HeroSection/>
                <Category/>
                <HomePageProductCard/>

           

            </Layout>
     
            
        </div>
    );
};

export default HomePage;