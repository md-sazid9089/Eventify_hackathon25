import { useState } from "react";
import { motion } from "framer-motion";

// Speaker data
const speakers = [
  {
    name: "Jankar Mahbub",
    role: "Founder & CEO",
    photo: "/images/speakers/1.jpg",
    description:
      "Jankar is a visionary entrepreneur who founded multiple startups and is passionate about innovation and mentorship.",
    socials: {
      twitter: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Evan Stone",
    role: "Founder & CEO",
    photo: "/images/speakers/2.jpg",
    description:
      "Evan has over 15 years of leadership experience in technology and marketing, bringing disruptive ideas to life.",
    socials: {
      twitter: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Sarah Lee",
    role: "Product Manager",
    photo: "/images/speakers/3.jpg",
    description:
      "Sarah specializes in building digital products that connect communities and empower small businesses.",
    socials: {
      twitter: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "David Brown",
    role: "Marketing Head",
    photo: "/images/speakers/4.jpg",
    description:
      "David is a marketing expert with a focus on growth strategies, branding, and scaling new ventures.",
    socials: {
      twitter: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
];

export default function Speakers() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="speakers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-800">Our Speakers</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-4 mb-12"></div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {speakers.map((speaker, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
              onClick={() => setSelected(speaker)}
            >
              {/* Speaker Image */}
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-full h-72 object-cover"
              />

              {/* Overlay (default tinted → lighten on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-700/70 to-purple-700/40 opacity-80 group-hover:opacity-30 transition"></div>

              {/* Speaker Info */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white z-10">
                <h3 className="text-lg font-bold">{speaker.name}</h3>
                <p className="text-sm">{speaker.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <img
              src={selected.photo}
              alt={selected.name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-gray-800">{selected.name}</h3>
            <p className="text-orange-500 font-semibold">{selected.role}</p>
            <p className="mt-4 text-gray-600">{selected.description}</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 mt-6 text-xl">
              <a href={selected.socials.twitter} className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={selected.socials.linkedin} className="text-blue-600 hover:text-blue-800">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={selected.socials.facebook} className="text-blue-500 hover:text-blue-700">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
