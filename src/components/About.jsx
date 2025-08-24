import { motion } from "framer-motion";
// React Icons
import { FiUser } from "react-icons/fi";       // Outline user
import { FiBarChart2 } from "react-icons/fi";  // Chart outline
import { FiMonitor } from "react-icons/fi";    // Desktop outline

const features = [
  {
    icon: <FiUser className="text-orange-500 text-6xl mx-auto mb-6" />,
    title: "Ask The Experts",
    desc: "Large auditorium with capacity of fifty thousand participants is also equipped with advanced facilities for your pleasure.",
  },
  {
    icon: <FiBarChart2 className="text-pink-500 text-6xl mx-auto mb-6" />,
    title: "Latest Topics",
    desc: "The location of the seminar is located in the city center so it is easily reached by private or public vehicles which available for 24 hours.",
  },
  {
    icon: <FiMonitor className="text-purple-500 text-6xl mx-auto mb-6" />,
    title: "Workshops",
    desc: "There are many hotels available around the event location for temporary residence as long as you follow this event, from motels to 5 stars.",
  },
];

const stats = [
  { number: 5000, label: "Seats" },
  { number: 72, label: "Hours" },
  { number: 12, label: "Speakers" },
  { number: 5, label: "Doorprize" },
];

export default function About() {
  return (
    <section id="about">
      {/* Title */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold text-gray-800">
          How Invitex can help your startup to grow
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-4 mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta.
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background/stats-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/90 via-pink-700/80 to-purple-900/90"></div>

        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white/10 p-10 rounded-lg backdrop-blur-md"
              >
                <h3 className="text-4xl font-bold">{stat.number}</h3>
                <p className="uppercase mt-2 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
