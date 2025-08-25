function HeroSection() {
  return (
    <div className="h-80 bg-[#10212B] flex flex-col md:flex-row items-center justify-between px-8">
      {/* Text Section */}
      <div className="text-[#EFFBDB] max-w-2xl py-4 md:py-0">
        <h1 className="text-4xl font-bold mb-4">
          20% OFF ONLY TODAY AND GET SPECIAL GIFT!
        </h1>
        <p className="text-lg mb-6">
          Today only, enjoy amazing 20% off and receive an exclusive gift!
          Elevate your wardrobe now!
        </p>
        <button className="bg-[#8FA464] text-[#10212B] font-semibold px-8 py-3 rounded-md hover:bg-[#EFFBDB] hover:text-[#10212B] transition duration-300">
          Shop Now
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 h-60 md:h-80 mt-4 md:mt-0">
        <img
          src="/Sliders/menslider.png"
          alt="Promotional"
          className="w-full h-full hidden sm:block object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}

export default HeroSection;
