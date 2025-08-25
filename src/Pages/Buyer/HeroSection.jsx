import { useEffect, useState } from "react";
import { Link } from "react-router";

const HeroSection = () => {
  const images = [
    "/HeroSectionImages/herosection1.jpg",
    "/HeroSectionImages/herosection2.jpg",
    "/HeroSectionImages/herosection3.jpg",
    "/HeroSectionImages/herosection4.jpg",
    "/HeroSectionImages/herosection5.jpg",
    "/HeroSectionImages/herosection6.jpg",
    "/HeroSectionImages/herosection7.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#10212B] py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#EFFBDB]/80 text-sm uppercase tracking-wider">
                Discover Timeless Comfort And Style
              </p>
              <h1 className="text-4xl uppercase lg:text-6xl font-bold text-[#8FA464] leading-tight">
                WearAura
              </h1>
              <p className="text-[#EFFBDB]/90 text-lg max-w-md">
                Crafted with precision and inspired by modern trends, WearAura
                offers a fashion-forward collection for both men and women.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="bg-[#8FA464] text-[#10212B] font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#8FA464]/90 transition-colors"
              >
                Shop Now
              </Link>
              <button className="border border-[#EFFBDB]/40 text-[#EFFBDB]/90 px-8 py-3 rounded-lg hover:border-[#8FA464] hover:text-[#8FA464] transition-colors">
                Explore More
              </button>
            </div>

            {/* Thumbnails */}
            <div className="hidden sm:flex space-x-4 pt-8">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg p-1 transition-all duration-300 ${
                    idx === currentIndex
                      ? "ring-2 ring-[#8FA464]"
                      : "bg-[#EFFBDB] shadow-sm"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="relative">
            <div className="relative w-full h-80 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl bg-[#EFFBDB] backdrop-blur-lg border border-[#EFFBDB]/40">
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Showcase"
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 opacity-100"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10212B]/90 via-transparent to-transparent pointer-events-none"></div>

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#EFFBDB]/70 text-[#10212B] text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
                Featured Look
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
