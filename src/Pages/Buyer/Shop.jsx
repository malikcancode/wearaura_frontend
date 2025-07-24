import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/Sliders/slider1.webp",
  "/Sliders/slider2.webp",
  "/Sliders/slider3.webp",
];

function Shop() {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <div className="h-full overflow-x-hidden">
      <Slider {...settings}>
        {images.map((img, index) => (
          <section
            key={index}
            className="relative h-[100vh] w-full overflow-hidden"
          >
            <img
              src={img}
              alt={`slide-${index}`}
              className="absolute inset-0 w-full h-full object-cover aspect-auto -z-10"
            />

            <div className="relative z-10 h-full flex items-center px-6 md:px-16">
              <div className="max-w-xl text-[#5A463A]">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Welcome to Our Shop
                </h1>
                <p className="text-base md:text-lg mb-6">
                  Discover the latest fashion trends and elevate your style with
                  our exclusive collection.
                </p>
                <button className="bg-[#5a463a] text-white font-semibold px-6 py-3 cursor-pointer transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
}

export default Shop;
