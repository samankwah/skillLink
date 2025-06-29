import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Smartphone,
  Download,
} from "lucide-react";

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-500 to-gray-500">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="container mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8">
            {/* Logo and Vision */}
            <div className="mb-8 lg:mb-0 lg:max-w-2xl">
              {/* Logo */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-950 to-gray-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SL</span>
                  </div>
                </div>
              </div>

              {/* Vision Statement */}
              <p className="text-xl md:text-2xl text-gray-200 font-medium">
                Our vision is a world in which digital learning is inclusive,
                accessible, relevant, safe and secure for all
              </p>
            </div>

            {/* App Download Section */}
            <div className="lg:text-right text-gray-200">
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
                <div className="text-right">
                  <p className="text-lg font-medium mb-2">
                    Get the SkillLink eLearning app
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Smartphone className="w-5 h-5" />
                    <span className="text-sm font-medium">App Store</span>
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Download className="w-5 h-5" />
                    <span className="text-sm font-medium">Google Play</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media and Legal Links */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Social Media Icons */}
            <div className="flex gap-4 mb-6 sm:mb-0">
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-gray-700" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-gray-700" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 text-gray-700" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="XTwitter"
              >
                <Twitter className="w-6 h-6 text-gray-700" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-gray-700" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 text-xl">
              <Link
                to="/data-protection"
                className="text-gray-200 hover:text-gray-400"
              >
                Data Protection
              </Link>
              <Link to="/imprint" className="text-gray-200 hover:text-gray-400">
                Imprint
              </Link>
              <Link to="/legal" className="text-gray-200 hover:text-gray-400">
                Legal Information
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-gray-100 text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Ministry Logo and Text */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 text-black rounded flex items-center justify-center">
                  <div className="w-4 h-6 bg-gradient-to-b from-yellow-400 via-red-500 to-black"></div>
                </div>
                <div className="text-sm text-black">
                  <div className="font-semibold">Ghana Education</div>
                  <div className="text-xs">Service</div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center sm:text-right">
              <p className="text-sm">
                © {currentYear} SkillLink. All Rights Reserved.
              </p>
            </div>

            {/* Implementation Credit */}
            <div className="text-right text-xs mt-2 sm:mt-0">
              <div>Implemented by</div>
              <div className="font-semibold">FutureDev</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
