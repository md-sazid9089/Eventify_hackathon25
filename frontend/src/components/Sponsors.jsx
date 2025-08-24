const sponsors = [
  "/images/sponsors/1.png",
  "/images/sponsors/2.png",
  "/images/sponsors/3.png",
  "/images/sponsors/4.png",
  "/images/sponsors/5.png",
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Sponsors</h2>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {sponsors.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
