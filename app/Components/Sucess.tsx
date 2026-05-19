export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h1 className="text-6xl md:text-8xl font-thin tracking-widest mb-12">
          WELCOME TO PEARL BAY
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90 mb-16 leading-relaxed">
          Your founding membership is confirmed.<br />
          You now have priority access to the world’s most exclusive addresses.
        </p>
        <p className="text-lg tracking-widest opacity-70 mb-8">
          Your private concierge will contact you within 24 hours to begin.
        </p>
        <a
          href="/"
          className="inline-block bg-white text-black px-16 py-8 text-xl tracking-widest hover:bg-gray-200 transition"
        >
          EXPLORE THE CIRCLE →
        </a>
        <p className="text-xs tracking-widest opacity-50 mt-12">
          Thank you for joining the 75 founding members.<br />
          The circle is now complete with you.
        </p>
      </div>
    </div>
  );
}