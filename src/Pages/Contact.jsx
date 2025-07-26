import React from "react";

function Contact() {
  return (
    <section className="bg-[#fdfaf7] text-[#5A463A] h-screen flex flex-col md:flex-row">
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="/cat.jpg"
          alt="Contact fashion model"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Contact Us
          </h2>
          <p className="text-[#6e5b50] mb-8 leading-relaxed">
            Have a question, a custom order, or just want to say hello? We'd
            love to hear from you.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-[#e0d8d2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A463A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-[#e0d8d2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A463A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-[#e0d8d2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A463A]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#5A463A] text-white px-6 py-2  hover:bg-[#4a3c34] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
