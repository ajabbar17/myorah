"use client";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
      items = [],
    
    } = useCart() || {};

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="bg-white border-b border-[#0000002e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-center items-center">
          {/* Left Section */}
          <div className="absolute left-0 flex items-center space-x-6">
            <button
              className="block md:hidden font-normal text-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="relative font-normal text-lg hover:text-black transition-colors
                          after:content-[''] after:absolute after:w-full after:h-0.5 
                          after:bg-black after:left-0 after:bottom-0 
                          after:origin-left after:scale-x-0 
                          after:transition-transform after:duration-300
                          hover:after:scale-x-100"
              >
                Home
              </Link>

              {/* Collections Dropdown */}
              <div className="relative hidden md:block group">
                <button
                  className="relative font-normal text-lg hover:text-black transition-colors
                            after:content-[''] after:absolute after:w-full after:h-0.5 
                            after:bg-black after:left-0 after:bottom-0 
                            after:origin-left after:scale-x-0 
                            after:transition-transform after:duration-300
                            group-hover:after:scale-x-100 
                            flex items-center"
                >
                  Collections{" "}
                  <ChevronDown className="ml-1 transform transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div
                  className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10 
                               opacity-0 invisible transform -translate-y-2
                               transition-all duration-200 ease-in-out
                               group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                >
                  {["Bracelets", "Pendants", "Rings"].map((item) => (
                    <Link
                      key={item}
                      href={`/collections/${item.toLowerCase()}`}
                      className="block px-4 py-2 font-normal text-lg hover:bg-gray-100 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="relative font-normal text-lg hover:text-black transition-colors
                          after:content-[''] after:absolute after:w-full after:h-0.5 
                          after:bg-black after:left-0 after:bottom-0 
                          after:origin-left after:scale-x-0 
                          after:transition-transform after:duration-300
                          hover:after:scale-x-100"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Centered Logo */}
          <Link href="/" className="text-2xl font-bold z-10">
            <Image
              src="/logo.png"
              alt="Logo"
              className=""
              width={128}
              height={128}
            />
          </Link>

          {/* Right Section */}
          <div
          className="absolute right-0 flex items-center space-x-4">
            <Link href="/cart">
            <div className="relative">
              <ShoppingCart className="cursor-pointer w-6 h-6" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="/"
              className="relative font-normal text-lg inline-block
                        after:content-[''] after:absolute after:w-full after:h-0.5 
                        after:bg-black after:left-0 after:bottom-0 
                        after:origin-left after:scale-x-0 
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100"
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.currentTarget.nextElementSibling?.classList.toggle(
                    "hidden"
                  );
                  e.currentTarget
                    .querySelector("svg")
                    ?.classList.toggle("rotate-180");
                }}
                className="font-normal text-lg w-full text-left flex items-center justify-between"
              >
                Collections
                <ChevronDown className="transition-transform duration-200" />
              </button>
              <div className="hidden mt-2 bg-white rounded-md transition-all duration-200">
                {["Bracelets", "Pendants", "Rings"].map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block px-4 py-2 font-normal text-lg hover:bg-gray-100 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/contact"
              className="relative font-normal text-lg inline-block
                        after:content-[''] after:absolute after:w-full after:h-0.5 
                        after:bg-black after:left-0 after:bottom-0 
                        after:origin-left after:scale-x-0 
                        after:transition-transform after:duration-300
                        hover:after:scale-x-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
