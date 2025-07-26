import { useEffect, useState } from "react";

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
    <section className="bg-[#F2F2F2] py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#606060] text-sm uppercase tracking-wider">
                Discover Timeless Comfort And Style
              </p>
              <h1 className="text-4xl uppercase lg:text-6xl font-bold text-[#3B2F27] leading-tight">
                WearAura
              </h1>
              <p className="text-[#606060] text-lg max-w-md">
                Crafted with precision and inspired by modern trends, WearAura
                offers a fashion-forward collection for both men and women.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#5A463A] text-white px-8 py-3 hover:bg-[#4a3a2e] transition-colors">
                Shop Now
              </button>
              <button className="border border-[#E0E0E0] text-[#606060] px-8 py-3 hover:border-[#5A463A] hover:text-[#5A463A] transition-colors">
                Explore More
              </button>
            </div>

            <div className="hidden sm:flex space-x-4 pt-8">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-16 rounded-lg p-1 transition-all duration-300 ${
                    idx === currentIndex
                      ? "ring-2 ring-[#5A463A]"
                      : "bg-white shadow-sm"
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

          <div className="relative">
            <div className="relative w-full h-80 lg:h-[28rem] rounded-2xl overflow-hidden shadow-2xl bg-white backdrop-blur-lg border border-[#eaeaea]">
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt="Showcase"
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#ffffffbb] via-transparent to-transparent pointer-events-none"></div>

              <div className="absolute top-4 left-4 bg-white/60 text-[#3B2F27] text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
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
