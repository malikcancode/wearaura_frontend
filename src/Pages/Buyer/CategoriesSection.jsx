import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Shirts", image: "/Categories/shirt.jpeg" },
    { name: "Pants", image: "/Categories/pants.jpeg" },
    { name: "Jackets", image: "/Categories/jacket.jpeg" },
    { name: "Dresses", image: "/Categories/dresses.jpeg" },
  ];

  return (
    <section className="py-16 bg-[#EFFBDB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#10212B] mb-4">
            Explore Our Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/category/${category.name}`)}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />

                <div className="absolute bottom-0 w-full bg-[#8FA464]/100 text-[#EFFBDB] py-3 text-center font-medium text-lg group-hover:bg-[#8FA464] group-hover:text-[#10212B] transition-all">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
