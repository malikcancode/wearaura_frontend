import React, { useEffect, useState } from "react";
import axios from "axios";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products?tag=latest"
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching latest arrivals:", err);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <>
      <section className="py-16 h-full bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3B2F27] mb-2">
                Discover Our Latest Arrivals
              </h2>
            </div>
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
                      src={`http://localhost:5000${product.image}`}
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
        </div>
      </section>
    </>
  );
}

export default NewArrivals;
