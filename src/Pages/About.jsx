import React from "react";

function About() {
  return (
    <section className="bg-[#effbdb] text-[#10212b] font-sans">
      {/* Hero / Story Section */}
      <div className="relative h-[90vh] overflow-hidden">
        <img
          src="/Sliders/slider1.webp"
          alt="Fashion lifestyle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#10212b]/40 flex flex-col justify-center px-6 md:px-20">
          <h1 className="text-[#effbdb] text-4xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Our Story
          </h1>
          <p className="text-[#effbdb] text-base md:text-lg max-w-xl leading-relaxed">
            Inspired by modern elegance, WearAura blends timeless fashion with
            purposeful design — where style meets identity.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-[#10212b]">
          Designed for Modern Elegance
        </h2>
        <p className="text-[#10212b]/80 text-lg leading-relaxed max-w-3xl mx-auto">
          WearAura is more than just fashion — it's a reflection of confidence,
          grace, and sustainability. From bold jackets to refined eyewear, we
          create fashion that speaks to your essence.
        </p>
      </div>

      {/* Section 3 - Image + Text */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 pb-20 items-center">
        <div>
          <img
            src="/Sliders/slider2.webp"
            alt="About fashion collection"
            className="w-full h-[400px] rounded-xl object-cover shadow-xl"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#8fa464]">
            Crafted with Purpose
          </h3>
          <p className="text-[#10212b]/80 mb-4 leading-relaxed">
            Every stitch tells a story. From tailored cuts to flowing fabrics,
            our collections merge comfort with confidence. Ethically sourced,
            consciously made.
          </p>
          <p className="text-[#10212b]/80 leading-relaxed">
            Our mission? To empower you to express your individuality with
            versatile, refined fashion — fit for every occasion.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white border-t border-[#8fa464]/30 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-6 text-[#10212b]">
            Our Mission
          </h3>
          <p className="text-[#10212b]/80 max-w-3xl mx-auto text-lg leading-relaxed">
            To redefine modern fashion with an inclusive, conscious vision —
            celebrating individuality through curated collections that exude
            effortless sophistication.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-[#effbdb] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold mb-6 text-[#8fa464]">
            Meet the Team Behind WearAura
          </h3>
          <p className="text-[#10212b]/80 mb-12 max-w-2xl mx-auto text-base leading-relaxed">
            Our team of passionate creatives, stylists, and strategists drive
            the vision behind every look — united by a love for timeless,
            wearable art.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Sophia Reed",
                role: "Creative Director",
                img: "https://avatar.iran.liara.run/public/75",
              },
              {
                name: "Elena Moore",
                role: "Lead Stylist",
                img: "https://avatar.iran.liara.run/public/91",
              },
              {
                name: "Marcus Lee",
                role: "Brand Strategist",
                img: "https://avatar.iran.liara.run/public/11",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white shadow-lg rounded-xl p-6"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg mb-4 border-4 border-[#8fa464]"
                />
                <h4 className="font-semibold text-lg text-[#10212b]">
                  {member.name}
                </h4>
                <p className="text-[#8fa464] text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
