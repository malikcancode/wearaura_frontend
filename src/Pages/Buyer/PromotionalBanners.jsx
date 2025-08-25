const PromotionalBanners = () => {
  return (
    <section className="py-16 bg-[#effbdb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 bg-gradient-to-r from-[#10212b] to-[#8fa464] rounded-2xl p-8 lg:p-12 text-center shadow-lg">
          <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4">
            Up To 10% Off For The First Buying!
          </h3>
          <p className="text-[#effbdb]/90 mb-6 max-w-2xl mx-auto">
            Join our community and get exclusive discounts on your first
            purchase.
          </p>
          <button className="bg-white text-[#10212b] font-medium px-8 py-3 hover:bg-[#effbdb] hover:text-[#10212b] transition-colors shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
