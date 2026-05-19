export default function Text() {
  return (
    <section className="w-full flex justify-center md:justify-end py-20 md:py-28 bg-white">
      <div
        className="
          w-full
          max-w-3xl
          md:w-1/2
          text-[#8f847b]
          px-6 sm:px-10 md:pr-12
          leading-relaxed
          text-left md:text-left
        "
      >
        {/* Heading */}
        <h2
          className="
            text-2xl sm:text-3xl md:text-4xl
            font-semibold
            mb-8 md:mb-10
            font-serif
          "
        >
          Tastemakers of Understated Chic Luxury
        </h2>

        {/* Paragraph 1 */}
        <p
          className="
            mb-8 md:mb-12
            text-base sm:text-lg md:text-xl
            opacity-90
            font-serif
          "
        >
          Sitting atop the curvaceous cliffs of Italy’s Amalfi Coast, Casa Angelina
          offers a sublime slice of modern minimalism on the Mediterranean, with an
          emphasis on barefoot luxury and top-level gastronomy.
        </p>

        {/* Paragraph 2 */}
        <p
          className="
            mb-8 md:mb-12
            text-base sm:text-lg md:text-xl
            opacity-90
            font-serif
          "
        >
          Our 36-room hotel serves as a sanctuary, bearing a fresh, white-washed
          aesthetic that accentuates every space, from the azure sea and sky outside
          to the contemporary artworks on display inside.
        </p>

        {/* Paragraph 3 */}
        <p
          className="
            text-base sm:text-lg md:text-xl
            opacity-90
            font-serif
          "
        >
          We work to ensure everything about your stay is true perfection, from our
          welcome amenities and the thoughtful turndown services to the curated dishes
          from our chefs and activities organized by our concierge.
        </p>
      </div>
    </section>
  );
}
