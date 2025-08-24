import { useState } from "react";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-4">Gallery</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mb-8"></div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(src)}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              {/* Image */}
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-105"
              />

              {/* Overlay (Dark by default → light on hover) */}
              <div
                className="absolute inset-0 
                           bg-gradient-to-tr from-pink-600/70 to-purple-600/70
                           group-hover:from-pink-600/20 group-hover:to-purple-600/20
                           transition-all duration-700"
              ></div>
            </div>
          ))}
        </div>

        {/* Modal (when image clicked) */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)} // Close when background clicked
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg transition-transform duration-500 scale-100"
            />
          </div>
        )}
      </div>
    </section>
  );
}
