const PromotionalBanners = () => {
  return (
    <section className="py-16 bg-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Banner */}
          <div className="bg-gradient-to-r from-[#D9CBB3] to-[#F2F2F2] rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#3B2F27] mb-4">
                Up To 30% Off & More!
              </h3>
              <p className="text-[#606060] mb-6">
                Discover amazing deals on our premium collection. Limited time
                offer!
              </p>
              <button className="bg-[#5A463A] text-white px-6 py-3  hover:bg-[#4a3a2e] transition-colors">
                Shop Now
              </button>
            </div>
            {/* <div className="absolute right-0 bottom-0 opacity-20">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Furniture"
                className="w-32 h-32 lg:w-48 lg:h-48 object-cover"
              />
            </div> */}
          </div>

          <div className="bg-gradient-to-r from-[#5A463A] to-[#4a3a2e] rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Up To 60% Off on shirts and pants!
              </h3>
              <p className="text-[#D9CBB3] mb-6">
                Transform your space with our exclusive collection at unbeatable
                prices.
              </p>
              <button className="bg-white text-[#5A463A] px-6 py-3 hover:bg-[#F2F2F2] transition-colors">
                Explore Deals
              </button>
            </div>
            {/* <div className="absolute right-0 bottom-0 opacity-20">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Chair"
                className="w-32 h-32 lg:w-48 lg:h-48 object-cover"
              />
            </div> */}
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#3B2F27] to-[#5A463A] rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
            Up To 10% Off For The First Buying!
          </h3>
          <p className="text-[#D9CBB3] mb-6 max-w-2xl mx-auto">
            Join our community and get exclusive discounts on your first
            purchase.
          </p>
          <button className="bg-white text-[#5A463A] px-8 py-3 hover:bg-[#F2F2F2] transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
