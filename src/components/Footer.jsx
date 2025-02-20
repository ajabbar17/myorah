import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 place-items-center md:grid-cols-3 gap-8 px-6 items-start">
          {/* Logo & Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold uppercase text-black">Myorah</h2>
            <p className="text-sm mt-2">Find us on social media</p>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
              >
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-3">Collections</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link
                  href="/collections/bracelets"
                  className="hover:text-gray-500 transition-colors"
                >
                  Bracelets
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/pendants"
                  className="hover:text-gray-500 transition-colors"
                >
                  Pendants
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/rings"
                  className="hover:text-gray-500 transition-colors"
                >
                  Rings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-10">
        &copy; {new Date().getFullYear()} Myorah. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
