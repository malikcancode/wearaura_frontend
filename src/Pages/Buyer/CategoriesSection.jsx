const CategoriesSection = () => {
  const categories = [
    {
      name: "Shirts",
      image: "/Categories/shirt.jpeg",
    },
    {
      name: "Pants",
      image: "/Categories/pants.jpeg",
    },
    {
      name: "Jackets",
      image: "/Categories/jacket.jpeg",
    },
    {
      name: "Dresses",
      image: "/Categories/dresses.jpeg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3B2F27] mb-4">
            Explore Our Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer text-center">
              <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-all">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-3 text-[#3B2F27] font-medium text-lg group-hover:text-[#5A463A] transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
