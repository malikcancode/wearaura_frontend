const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ava Thompson",
      role: "Fashion Enthusiast",
      content:
        "Absolutely love the quality of jackets from WearAura. The fit is perfect, and the craftsmanship is top-notch — I feel confident and stylish every time I wear it.",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
    {
      id: 2,
      name: "Liam Rodriguez",
      role: "Urban Stylist",
      content:
        "WearAura delivers elegance and comfort in one. Their shirts are my go-to for both casual and professional looks. Quick delivery and beautifully packed too!",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      role: "Creative Director",
      content:
        "The dresses from WearAura are pure sophistication. I wore one to a gala, and the compliments didn’t stop all night. They’ve mastered modern luxury.",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-[#effbdb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#10212b] mb-4">
            Family Feedback
          </h2>
          <p className="text-[#10212b]/70 max-w-2xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            libero distinctio deleniti accusantium consectetur.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bx bxs-star text-sm ${
                      i < testimonial.rating
                        ? "text-[#8fa464]"
                        : "text-gray-300"
                    }`}
                  ></i>
                ))}
              </div>

              <p className="text-[#10212b]/70 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[#10212b] font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#8fa464] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
