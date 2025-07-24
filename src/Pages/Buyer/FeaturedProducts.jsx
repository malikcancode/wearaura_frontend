const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Men's Casual Denim Jacket",
      price: "$69",
      originalPrice: "$99",
      image: "/fashion/mens-denim-jacket.jpg",
      rating: 4.6,
      isNew: true,
    },
    {
      id: 2,
      name: "Women's Summer Floral Dress",
      price: "$49",
      originalPrice: "$79",
      image: "/fashion/womens-floral-dress.jpg",
      rating: 4.8,
      isNew: true,
    },
    {
      id: 3,
      name: "Men's Slim Fit Chinos",
      price: "$39",
      originalPrice: "$59",
      image: "/fashion/mens-chinos.jpg",
      rating: 4.5,
      isNew: false,
    },
    {
      id: 4,
      name: "Women's Oversized Blazer",
      price: "$89",
      originalPrice: "$119",
      image: "/fashion/womens-blazer.jpg",
      rating: 4.7,
      isNew: false,
    },
    {
      id: 5,
      name: "Men's Cotton Polo Shirt",
      price: "$29",
      originalPrice: "$49",
      image: "/fashion/mens-polo.jpg",
      rating: 4.4,
      isNew: true,
    },
    {
      id: 6,
      name: "Women's High-Waisted Jeans",
      price: "$59",
      originalPrice: "$89",
      image: "/fashion/womens-jeans.jpg",
      rating: 4.6,
      isNew: true,
    },
  ];

  return (
    <section className="py-16 h-full bg-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#3B2F27] mb-2">
              Discover Our Latest Arrivals
            </h2>
          </div>
          <button className="hidden md:block bg-[#5A463A] text-white px-6 py-3  hover:bg-[#4a3a2e] transition-colors">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 group h-full flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-6">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="bx bx-heart text-[#5A463A]"></i>
                  </button>
                </div>

                <div className="space-y-3 flex flex-col justify-between h-full">
                  <h4 className="text-[#3B2F27] font-semibold text-lg">
                    {product.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <span className="text-[#3B2F27] font-bold text-xl">
                    {product.price}
                  </span>
                  <span className="text-[#606060] line-through text-sm">
                    {product.originalPrice}
                  </span>
                </div>
                <button className="bg-[#5A463A] text-white p-2 rounded-lg hover:bg-[#4a3a2e] transition-colors">
                  <i className="bx bx-shopping-bag"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <button className="bg-[#5A463A] text-white px-8 py-3 rounded-lg hover:bg-[#4a3a2e] transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
