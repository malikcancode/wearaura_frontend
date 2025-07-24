const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Interior Designer",
      content:
        "The quality of furniture from Furnish is exceptional. Every piece I've purchased has exceeded my expectations in both design and durability.",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      content:
        "Amazing customer service and fast delivery. The furniture arrived perfectly packaged and looks even better than in the photos.",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Architect",
      content:
        "I recommend Furnish to all my clients. Their modern designs and attention to detail make them stand out in the furniture industry.",
      avatar: "https://avatar.iran.liara.run/public/43",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3B2F27] mb-4">
            Furnish Family Feedback
          </h2>
          <p className="text-[#606060] max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience
            with our furniture and service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#F2F2F2] rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`bx bxs-star text-sm ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  ></i>
                ))}
              </div>

              <p className="text-[#606060] mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-[#3B2F27] font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#606060] text-sm">{testimonial.role}</p>
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
