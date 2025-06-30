import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Learn", href: "/learn" },
    { name: "Partners", href: "/partners" },
    { name: "News", href: "/news" },
    { name: "Stories", href: "/stories" },
  ];

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700 fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#191961] to-[#2d2b69] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SL</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-white">
                SkillLink
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-3 text-base font-bold transition-all duration-300 rounded-lg relative overflow-hidden group ${
                  isActive(item.href)
                    ? "text-yellow-400 bg-yellow-400/10 shadow-sm"
                    : "text-gray-200 hover:text-yellow-400 hover:bg-yellow-400/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-200 hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md hover:text-white"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-gradient-to-r from-[#191961] to-[#2d2b69] hover:from-[#2d2b69] hover:to-[#191961] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg text-gray-200 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="px-4 pt-4 pb-6 space-y-3 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-bold rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-yellow-400 bg-yellow-400/10 shadow-sm"
                      : "text-gray-200 hover:text-yellow-400 hover:bg-yellow-400/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-700">
                <Link
                  to="/auth/login"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full text-gray-200 hover:bg-white/10 font-semibold py-3 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-[#191961] to-[#2d2b69] hover:from-[#2d2b69] hover:to-[#191961] text-white font-semibold py-3 shadow-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicHeader;
