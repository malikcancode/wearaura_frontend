const ProductShowcase = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-[#F2F2F2] rounded-2xl p-8">
              <img
                src="/featuredimage.jpg"
                className="w-full h-80 lg:h-96 object-cover rounded-lg"
              />
            </div>

            <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <span className="text-[#5A463A] font-bold text-lg">$299</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-[#5A463A] text-white text-xs px-3 py-1 rounded-full">
                Featured Product
              </span>

              <h2 className="text-3xl lg:text-4xl font-bold text-[#3B2F27] leading-tight">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </h2>

              <p className="text-[#606060] text-lg leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem non
                harum accusamus. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Dolorem iste repudiandae iusto?
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="bx bx-check-circle text-[#5A463A] text-xl"></i>
                <span className="text-[#606060]">Ergonomic design</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="bx bx-check-circle text-[#5A463A] text-xl"></i>
                <span className="text-[#606060]">Premium quality</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="bx bx-check-circle text-[#5A463A] text-xl"></i>
                <span className="text-[#606060]">Modern design</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#5A463A] text-white px-8 py-3 hover:bg-[#4a3a2e] transition-colors flex items-center justify-center space-x-2">
                <i className="bx bx-shopping-bag"></i>
                <span>Add to Cart</span>
              </button>
              <button className="border border-[#E0E0E0] text-[#606060] px-8 py-3 hover:border-[#5A463A] hover:text-[#5A463A] transition-colors flex items-center justify-center space-x-2">
                <i className="bx bx-heart"></i>
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
