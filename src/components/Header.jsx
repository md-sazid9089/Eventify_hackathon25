import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Site Name Instead of Logo */}
        <h1
          className={`text-2xl font-extrabold tracking-wide transition-colors duration-300 ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
          EVENTIFY
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul
            className={`flex space-x-6 font-semibold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <li><a href="#home" className="hover:text-orange-500">Home</a></li>
            <li><a href="#about" className="hover:text-orange-500">About</a></li>
            <li><a href="#speakers" className="hover:text-orange-500">Speakers</a></li>
            <li><a href="#schedules" className="hover:text-orange-500">Schedules</a></li>
            <li><a href="#register" className="hover:text-orange-500">Login</a></li>
            <li><a href="#gallery" className="hover:text-orange-500">Gallery</a></li>
            <li><a href="#sponsors" className="hover:text-orange-500">Sponsors</a></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${scrolled ? "text-gray-800" : "text-white"}`}
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <ul className="flex flex-col p-6 space-y-6 font-semibold text-gray-700">
          <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#speakers" onClick={() => setIsOpen(false)}>Speakers</a></li>
          <li><a href="#schedules" onClick={() => setIsOpen(false)}>Schedules</a></li>
          <li><a href="#register" onClick={() => setIsOpen(false)}>Login</a></li>
          <li><a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a></li>
          <li><a href="#sponsors" onClick={() => setIsOpen(false)}>Sponsors</a></li>
        </ul>
      </div>
    </header>
  );
}
