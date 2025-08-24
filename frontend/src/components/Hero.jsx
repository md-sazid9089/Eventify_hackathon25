// src/components/Hero.jsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/slider/3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 via-pink-700/70 to-purple-900/80"></div>

      {/* Content */}
      <div className="relative text-center text-white z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold"
        >
          Biggest Startup Conference
        </motion.h1>

        <p className="mt-4 text-md sm:text-lg">
          <i className="fa fa-calendar text-orange-500"></i> March 3rd - 7th — Palo Alto, California
        </p>

        {/* ✅ Smooth Scroll to Login Section */}
       <a
  href="#login"
  onClick={(e) => {
    e.preventDefault();
    document.getElementById("login")?.scrollIntoView({ behavior: "smooth" });
  }}
  className="mt-6 inline-block px-6 py-3 bg-orange-500 rounded-lg text-white font-semibold hover:bg-orange-600 transition"
>
  Get Started
</a>

      </div>
    </section>
  );
}
