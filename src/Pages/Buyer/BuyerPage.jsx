import React from "react";
import HeroSection from "./HeroSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedProducts from "./FeaturedProducts";
import ProductShowcase from "./ProductShowcase";
import PromotionalBanners from "./PromotionalBanners";
import Testimonials from "./Testimonials";

function BuyerPage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ProductShowcase />
      <PromotionalBanners />
      <Testimonials />
    </>
  );
}

export default BuyerPage;
