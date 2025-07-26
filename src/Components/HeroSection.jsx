function HeroSection() {
  return (
    <div className="h-80 bg-[#5a463a] bg-opacity-20 flex flex-col md:flex-row items-center justify-between px-8">
      <div className="text-white max-w-2xl py-4 md:py-0">
        <h1 className="text-4xl font-bold mb-4">
          20% OFF ONLY TODAY AND GET SPECIAL GIFT!
        </h1>
        <p className="text-lg mb-6">
          Today only, enjoy amazing 20% off and receive an exclusive gift!
          Elevate your wardrobe now!
        </p>
        <button className="text-[#3b2f27] bg-[#f2f2f2] font-semibold px-8 py-3 transition duration-300">
          Shop Now
        </button>
      </div>

      <div className="w-full md:w-1/2 h-60 md:h-80 mt-4 md:mt-0">
        <img
          src="/Sliders/menslider.png"
          alt="Promotional"
          className="w-full h-full hidden sm:block object-cover rounded"
        />
      </div>
    </div>
  );
}

export default HeroSection;
