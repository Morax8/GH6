import Marquee from "react-fast-marquee";
import cardData from "./MarqueeData.js";

const MarqueeGallery = () => {
  const cards = Array.from({ length: 6 });

  return (
    <section className="py-12 text-center">
      <h2 className="text-4xl font-bold mb-8">Let’s explore...</h2>

      <Marquee gradient={false} speed={50} pauseOnHover>
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className="relative w-[395px] h-[550px] mx-4 flex-shrink-0 rounded-xl overflow-hidden shadow-lg  cursor-pointer "
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {card.hasOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-white/0 flex items-end justify-center text-white pb-4">
                <div className="w-2/3 text-left mb-4">
                  <h3
                    className="text-4xl font-semibold"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-md mt-1 leading-tight"
                    style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeGallery;
