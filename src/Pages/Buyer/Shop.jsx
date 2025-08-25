import HeroSection from "../../Components/HeroSection";
import ProductGrid from "../../Components/ProductGrid";
import TopFilterbar from "../../Components/TopFilterbar";

function Shop() {
  return (
    <div className="min-h-screen bg-[#EFFBDB]">
      <HeroSection />
      <div className="px-3 py-5 bg-[#EFFBDB]">
        <TopFilterbar />
        <ProductGrid />
      </div>
    </div>
  );
}

export default Shop;
